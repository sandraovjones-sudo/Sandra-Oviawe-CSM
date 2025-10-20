import React, { useMemo, useState } from "react";
// import { motion } from "framer-motion"; // 🔧 Optional: remove if unused
import rawData from "@/data/customerHealth.json";

// 1) Adapt MySQL-style keys → compact keys the dashboard uses
const realData = (Array.isArray(rawData) ? rawData : []).map(r => ({
  d: r.snapshot_date,
  a: r.account_name,
  arr: Number(r.arr),
  dau: Number(r.dau_percent),
  feat: Number(r.features_used),
  tix: Number(r.tickets_30d),
  res: Number(r.avg_resolution_hrs),
  csat: Number(r.csat_score),
  qbr: r.qbr_status
}));

// 2) Utilities
function groupByAccount(snaps) {
  const by = new Map();
  snaps.forEach(r => {
    if (!by.has(r.a)) by.set(r.a, []);
    by.get(r.a).push(r);
  });
  for (const arr of by.values()) arr.sort((x, y) => x.d.localeCompare(y.d));
  return by;
}

function pctChange(oldV, newV) {
  if (oldV === 0 || oldV == null || newV == null) return 0;
  return ((newV - oldV) / oldV) * 100; // + increase, - decline
}

function badgeClass(tier) {
  const base = "rounded-full px-2 py-1 text-xs font-semibold";
  if (tier === "CRITICAL") return base + " bg-red-100 text-red-700";
  if (tier === "HIGH RISK") return base + " bg-orange-100 text-orange-700";
  if (tier === "MEDIUM RISK") return base + " bg-yellow-100 text-yellow-700";
  if (tier === "LOW RISK") return base + " bg-green-100 text-green-700";
  return base + " bg-emerald-100 text-emerald-700";
}

function actionForTier(tier) {
  if (tier === "CRITICAL") return "EXEC save play: exec call + plan";
  if (tier === "HIGH RISK") return "Intervention: training + RCA + cadence";
  if (tier === "MEDIUM RISK") return "Monitor closely; schedule check-in";
  return "Healthy – explore expansion";
}

// 3) Component
export default function EarlyWarningCSDashboard({ snapshots = realData }) {
  // --- State / controls
  const engagementFromQBR = (qbr) =>
    qbr === "On track" ? 90 : qbr === "Delayed" ? 55 : 25;

  const [usageBands, setUsageBands] = useState({ critical: 50, high: 30, watch: 15 });
  const [featureBands, setFeatureBands] = useState({ critical: 50, high: 33, watch: 20 });
  const [supportBands, setSupportBands] = useState({ critical: 40, high: 60, watch: 75 });
  const [weights, setWeights] = useState({
    usage: 25, feature: 20, support: 20, engagement: 15, financial: 15, sentiment: 5
  });
  const [assumedFinancial, setAssumedFinancial] = useState(60);
  const [showAtRiskOnly, setShowAtRiskOnly] = useState(false);

  // Local Slider helper
  const Slider = ({ label, value, min=0, max=100, step=1, onChange }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span><span>{value}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e)=>onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );

  // --- Data shaping
  const accounts = useMemo(() => groupByAccount(snapshots), [snapshots]);

  const rows = useMemo(() => {
    const out = [];
    accounts.forEach((hist, name) => {
      const latest = hist[hist.length - 1];
      const idxAgo = Math.max(0, hist.length - 4); // ~4 snapshots ≈ 30 days
      const prior = hist[idxAgo];

      const usageDecline = -pctChange(prior.dau, latest.dau); // positive = decline
      const featureDropPct = prior.feat ? Math.max(0, (prior.feat - latest.feat) / prior.feat * 100) : 0;

      // Support composite (100=great)
      const ticketsNorm = Math.min(100, latest.tix * 5);
      const resNorm = Math.min(100, latest.res);
      const csatGood = Math.max(0, Math.min(100, latest.csat * 20));
      const supportHealth = Math.max(0, 100 - (ticketsNorm*0.4 + resNorm*0.3 + (100 - csatGood)*0.3));

      // Risks (0 best → 100 worst)
      const usageRisk = Math.max(0, Math.min(100, usageDecline));
      const featRisk = Math.max(0, Math.min(100, featureDropPct));
      const supportRisk = 100 - supportHealth;
      const engagementRisk = 100 - engagementFromQBR(latest.qbr);
      const financialRisk = 100 - assumedFinancial;
      const sentimentRisk = 100 - csatGood;

      const totalWeight = Object.values(weights).reduce((a,b)=>a+b,0);
      const churnProb =
        usageRisk   * (weights.usage / totalWeight) +
        featRisk    * (weights.feature / totalWeight) +
        supportRisk * (weights.support / totalWeight) +
        engagementRisk * (weights.engagement / totalWeight) +
        financialRisk  * (weights.financial / totalWeight) +
        sentimentRisk  * (weights.sentiment / totalWeight);

      let tier = "HEALTHY";
      if (churnProb >= 70) tier = "CRITICAL";
      else if (churnProb >= 50) tier = "HIGH RISK";
      else if (churnProb >= 30) tier = "MEDIUM RISK";
      else if (churnProb >= 15) tier = "LOW RISK";

      const usageFlag =
        usageDecline >= usageBands.critical ? "CRITICAL" :
        usageDecline >= usageBands.high ? "HIGH RISK" :
        usageDecline >= usageBands.watch ? "WATCH" : "OK";

      const featureFlag =
        featureDropPct >= featureBands.critical ? "CRITICAL" :
        featureDropPct >= featureBands.high ? "HIGH RISK" :
        featureDropPct >= featureBands.watch ? "WATCH" : "OK";

      const supportFlag =
        supportHealth < supportBands.critical ? "CRITICAL" :
        supportHealth < supportBands.high ? "HIGH RISK" :
        supportHealth < supportBands.watch ? "WATCH" : "OK";

      out.push({
        account: name,
        arr: latest.arr,
        usageDecline: Math.round(usageDecline),
        featureDropPct: Math.round(featureDropPct),
        supportHealth: Math.round(supportHealth),
        churnProb: Math.round(churnProb),
        tier, usageFlag, featureFlag, supportFlag,
        action: actionForTier(tier),
      });
    });
    return out
      .filter(r => !showAtRiskOnly || ["CRITICAL","HIGH RISK"].includes(r.tier))
      .sort((a,b)=> b.churnProb - a.churnProb);
  }, [accounts, usageBands, featureBands, supportBands, weights, assumedFinancial, showAtRiskOnly]);

  const totals = useMemo(() => ({
    critical: rows.filter(r => r.tier === "CRITICAL").length,
    high: rows.filter(r => r.tier === "HIGH RISK").length,
    arrAtRisk: rows
      .filter(r => ["CRITICAL","HIGH RISK"].includes(r.tier))
      .reduce((s, r) => s + r.arr, 0),
  }), [rows]);

  // --- Render (everything inside one container)
  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl shadow bg-white">
          <h3 className="font-semibold mb-2">Weights</h3>
          <Slider label={`Support (${weights.support}%)`} value={weights.support} onChange={(v)=>setWeights({...weights, support:v})} />
          <Slider label={`Engagement (${weights.engagement}%)`} value={weights.engagement} onChange={(v)=>setWeights({...weights, engagement:v})} />
          <Slider label={`Financial (${weights.financial}%)`} value={weights.financial} onChange={(v)=>setWeights({...weights, financial:v})} />
          <Slider label={`Sentiment (${weights.sentiment}%)`} value={weights.sentiment} onChange={(v)=>setWeights({...weights, sentiment:v})} />
        </div>

        <div className="p-4 rounded-2xl shadow bg-white">
          <h3 className="font-semibold mb-2">Assumptions</h3>
          <Slider label="Assumed Financial Health" value={assumedFinancial} onChange={setAssumedFinancial} />
          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={showAtRiskOnly}
              onChange={(e)=>setShowAtRiskOnly(e.target.checked)}
            />
            Show only at-risk
          </label>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white md:col-span-2">
          <h3 className="font-semibold mb-2">At-a-glance</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-red-50 p-3">
              <div className="text-2xl font-bold">{totals.critical}</div>
              <div className="text-xs">Critical</div>
            </div>
            <div className="rounded-xl bg-orange-50 p-3">
              <div className="text-2xl font-bold">{totals.high}</div>
              <div className="text-xs">High Risk</div>
            </div>
            <div className="rounded-xl bg-indigo-50 p-3">
              <div className="text-2xl font-bold">£{(totals.arrAtRisk/1000).toFixed(0)}k</div>
              <div className="text-xs">ARR at risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden shadow bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Account</th>
              <th className="px-4 py-3 text-right">ARR</th>
              <th className="px-4 py-3 text-center">Usage Δ30d</th>
              <th className="px-4 py-3 text-center">Features Δ</th>
              <th className="px-4 py-3 text-center">Support Score</th>
              <th className="px-4 py-3 text-center">Churn %</th>
              <th className="px-4 py-3 text-center">Tier</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((r) => (
              <tr key={r.account} className="border-t">
                <td className="px-4 py-3">
                  <div className="font-semibold">{r.account}</div>
                  <div className="text-[11px] text-gray-500">
                    U:{r.usageFlag} • F:{r.featureFlag} • S:{r.supportFlag}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">£{(r.arr/1000).toFixed(0)}k</td>
                <td className="px-4 py-3 text-center">-{r.usageDecline}%</td>
                <td className="px-4 py-3 text-center">-{r.featureDropPct}%</td>
                <td className="px-4 py-3 text-center">{r.supportHealth}</td>
                <td className="px-4 py-3 text-center font-semibold">{r.churnProb}%</td>
                <td className="px-4 py-3 text-center"><span className={badgeClass(r.tier)}>{r.tier}</span></td>
                <td className="px-4 py-3">{r.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 mt-4">
        <p>
          Model maths: Usage risk uses 30-day DAU% decline; Feature risk uses share of features dropped;
          Support score = 100 − (Tickets*0.4 + ResolutionHrs*0.3 + (100−CSAT*20)*0.3).
          Churn % is a weighted blend of all risks + engagement/financial/sentiment assumptions.
        </p>
      </div>
    </div>
  );
}

