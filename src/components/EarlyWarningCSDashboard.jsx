import realData from "@/data/customerHealth.json";
<Slider label={`Support (${weights.support}%)`} value={weights.support} onChange={(v)=>setWeights({...weights, support:v})} />
<Slider label={`Engagement (${weights.engagement}%)`} value={weights.engagement} onChange={(v)=>setWeights({...weights, engagement:v})} />
<Slider label={`Financial (${weights.financial}%)`} value={weights.financial} onChange={(v)=>setWeights({...weights, financial:v})} />
<Slider label={`Sentiment (${weights.sentiment}%)`} value={weights.sentiment} onChange={(v)=>setWeights({...weights, sentiment:v})} />
</div>
<div className="p-4 rounded-2xl shadow bg-white">
<h3 className="font-semibold mb-2">Assumptions</h3>
<Slider label="Assumed Financial Health" value={assumedFinancial} onChange={setAssumedFinancial} />
<label className="inline-flex items-center gap-2 mt-2"><input type="checkbox" checked={showAtRiskOnly} onChange={(e)=>setShowAtRiskOnly(e.target.checked)} /> Show only at-risk</label>
</div>
<div className="p-4 rounded-2xl shadow bg-white">
<h3 className="font-semibold mb-2">At‑a‑glance</h3>
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
<div className="rounded-2xl overflow-hidden shadow">
<table className="min-w-full bg-white">
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
<div className="text-[11px] text-gray-500">U:{r.usageFlag} • F:{r.featureFlag} • S:{r.supportFlag}</div>
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


<div className="text-xs text-gray-500 mt-4">
<p>Model maths: Usage risk uses 30‑day DAU% decline; Feature risk uses share of features dropped; Support score = 100 − (Tickets*0.4 + ResolutionHrs*0.3 + (100−CSAT*20)*0.3). Churn % is a weighted blend of all risks + engagement/financial/sentiment assumptions.</p>
</div>
</div>
);
}
