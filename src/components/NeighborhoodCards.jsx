import { formatCurrency, formatPercent } from "@/lib/affordabilityMath";

function NeighborhoodCard({ item, compact = false }) {
  return (
    <article className="official-card rounded-lg p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-50">{item.neighborhood.name}</h3>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            {item.neighborhood.category} - {item.neighborhood.vibe}
          </p>
        </div>
        <span className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-bold ${item.risk.tone}`}>
          {item.risk.label}
        </span>
      </div>

      <div className={`mt-4 grid gap-2 ${compact ? "grid-cols-2" : "sm:grid-cols-4"}`}>
        <div>
          <span className="text-xs text-slate-500">Rent</span>
          <strong className="block text-sm text-slate-100">
            {formatCurrency(item.housingCost)}
          </strong>
        </div>
        <div>
          <span className="text-xs text-slate-500">Housing %</span>
          <strong className="block text-sm text-slate-100">
            {formatPercent(item.housingRatio)}
          </strong>
        </div>
        <div>
          <span className="text-xs text-slate-500">Leftover</span>
          <strong className="block text-sm text-slate-100">
            {formatCurrency(item.leftoverAfterSavings)}
          </strong>
        </div>
        <div>
          <span className="text-xs text-slate-500">Commute</span>
          <strong className="block text-sm text-slate-100">
            {item.commuteMinutes === null ? "N/A" : `${item.commuteMinutes} min`}
          </strong>
        </div>
      </div>
    </article>
  );
}

export default function NeighborhoodCards({ bestNeighborhoods, riskyNeighborhoods }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-lg p-0">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
              Best fit
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-50">
              Neighborhoods with stronger modeled fit.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Ranked using rent burden, leftover cash, commute fit, and the selected
            priority.
          </p>
        </div>
        <div className="grid gap-3">
          {bestNeighborhoods.map((item) => (
            <NeighborhoodCard key={item.neighborhood.name} item={item} />
          ))}
        </div>
      </div>

      <div className="rounded-lg p-0">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-100">
          Watch list
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-50">
          Riskier neighborhood scenarios.
        </h2>
        <div className="mt-4 grid gap-3">
          {riskyNeighborhoods.map((item) => (
            <NeighborhoodCard key={item.neighborhood.name} compact item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
