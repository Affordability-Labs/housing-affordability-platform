import { formatCurrency } from "@/lib/affordabilityMath";

function ExpenseBreakdown({ items }) {
  const max = Math.max(...items.map((item) => item.amount), 1);

  return (
    <article className="official-card rounded-lg p-5">
      <h3 className="text-lg font-semibold text-slate-50">Expense breakdown</h3>
      <p className="mt-1 text-sm text-slate-400">
        Monthly costs in the selected scenario.
      </p>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-300">{item.label}</span>
              <span className="font-bold text-slate-100">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/10">
              <div
                className={`chart-fill h-3 rounded-full ${item.color}`}
                style={{ width: `${Math.max(6, (item.amount / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function RiskMeter({ selected }) {
  return (
    <article className="official-card rounded-lg p-5">
      <h3 className="text-lg font-semibold text-slate-50">Affordability risk meter</h3>
      <p className="mt-1 text-sm text-slate-400">
        A 0-100 score built from housing burden, essential costs, commute pressure,
        and leftover money.
      </p>
      <div className="mt-8">
        <div className="relative h-4 rounded-full bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300">
          <div
            className="meter-pin absolute top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-slate-50 shadow-lg shadow-black/40"
            style={{ left: `calc(${selected.score}% - 2px)` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span>High risk</span>
          <span>Stretched</span>
          <span>Stable</span>
        </div>
      </div>
      <div className="mt-7 rounded-md border border-white/10 bg-white/[0.04] p-4">
        <div className="text-4xl font-black text-slate-50">{selected.score}</div>
        <p className="mt-1 text-sm text-slate-400">{selected.risk.label} scenario</p>
      </div>
    </article>
  );
}

function NeighborhoodBars({ neighborhoods }) {
  return (
    <article className="official-card rounded-lg p-5 lg:col-span-2">
      <h3 className="text-lg font-semibold text-slate-50">
        Neighborhood comparison
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Top modeled fit scores using your budget and selected priority.
      </p>
      <div className="mt-5 grid gap-4">
        {neighborhoods.slice(0, 7).map((item) => (
          <div key={item.neighborhood.name} className="grid gap-2 sm:grid-cols-[180px_1fr_48px] sm:items-center">
            <span className="text-sm font-medium text-slate-300">
              {item.neighborhood.name}
            </span>
            <div className="h-3 rounded-full bg-white/10">
              <div
                className="chart-fill h-3 rounded-full bg-emerald-300"
                style={{ width: `${item.fitScore}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-100">{item.fitScore}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function AffordabilityCharts({ model }) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <ExpenseBreakdown items={model.expenseBreakdown} />
      <RiskMeter selected={model.selected} />
      <NeighborhoodBars neighborhoods={model.rankedNeighborhoods} />
    </section>
  );
}
