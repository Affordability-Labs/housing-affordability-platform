import { formatCurrency, formatPercent } from "@/lib/affordabilityMath";

export default function ScenarioComparison({ scenarios }) {
  const [first, second] = scenarios;
  const monthlyDifference =
    first && second ? first.leftoverAfterSavings - second.leftoverAfterSavings : 0;

  return (
    <section className="official-card rounded-lg p-5">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
          Scenario comparison
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-50">
          Compare the same budget across neighborhoods.
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="border-b border-white/10 py-3 pr-5">Neighborhood</th>
              <th className="border-b border-white/10 px-5 py-3">Rent</th>
              <th className="border-b border-white/10 px-5 py-3">Leftover</th>
              <th className="border-b border-white/10 px-5 py-3">Housing %</th>
              <th className="border-b border-white/10 px-5 py-3">Commute</th>
              <th className="border-b border-white/10 py-3 pl-5">Risk</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <tr key={scenario.neighborhood.name} className="text-slate-200">
                <td className="border-b border-white/10 py-4 pr-5 font-semibold">
                  {scenario.neighborhood.name}
                </td>
                <td className="border-b border-white/10 px-5 py-4">
                  {formatCurrency(scenario.housingCost)}
                </td>
                <td className="border-b border-white/10 px-5 py-4">
                  {formatCurrency(scenario.leftoverAfterSavings)}
                </td>
                <td className="border-b border-white/10 px-5 py-4">
                  {formatPercent(scenario.housingRatio)}
                </td>
                <td className="border-b border-white/10 px-5 py-4">
                  {scenario.commuteMinutes === null
                    ? "N/A"
                    : `${scenario.commuteMinutes} min`}
                </td>
                <td className="border-b border-white/10 py-4 pl-5">
                  {scenario.risk.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {first && second ? (
        <div className="mt-5 rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
          <strong className="text-slate-100">
            {monthlyDifference >= 0
              ? `${first.neighborhood.name} keeps ${formatCurrency(
                  Math.abs(monthlyDifference)
                )} more per month than ${second.neighborhood.name}.`
              : `${second.neighborhood.name} keeps ${formatCurrency(
                  Math.abs(monthlyDifference)
                )} more per month than ${first.neighborhood.name}.`}
          </strong>{" "}
          This comparison uses the same non-housing expenses and changes only the
          modeled neighborhood rent and commute pressure.
        </div>
      ) : null}
    </section>
  );
}
