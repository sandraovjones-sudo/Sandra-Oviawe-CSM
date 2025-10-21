export default function AccountsTable({ rows }) {
  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm">
      {/* Scrollable area */}
      <div className="max-h-[520px] overflow-y-auto rounded-2xl">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-3 w-[28%]">Account</th>
              <th className="px-4 py-3 w-[12%]">ARR</th>
              <th className="px-4 py-3 w-[14%]">Usage Δ30D</th>
              <th className="px-4 py-3 w-[14%]">Features Δ</th>
              <th className="px-4 py-3 w-[12%]">Support</th>
              <th className="px-4 py-3 w-[10%]">Churn %</th>
              <th className="px-4 py-3 w-[10%]">Tier</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rows.map((r, i) => (
              <tr
                key={r.account_name}
                className={`border-t hover:bg-gray-50 ${
                  i % 2 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                {/* Account name: truncate but show full on hover */}
                <td className="px-4 py-3">
                  <div
                    className="max-w-[220px] truncate font-medium text-gray-900"
                    title={r.account_name}
                  >
                    {r.account_name}
                  </div>
                  {/* sublabels if you have them */}
                  {r.labels && (
                    <div className="mt-0.5 text-[11px] text-gray-500 truncate">
                      {r.labels}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 tabular-nums">£{Math.round(r.arr/1000)}k</td>
                <td className="px-4 py-3 tabular-nums">{r.usageDelta}%</td>
                <td className="px-4 py-3 tabular-nums">{r.featuresDelta}%</td>
                <td className="px-4 py-3 tabular-nums">{r.supportScore}</td>
                <td className="px-4 py-3 font-semibold tabular-nums">{r.churnPct}%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-700">
                    {r.tier || "HIGH RISK"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
