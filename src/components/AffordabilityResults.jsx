import { formatCurrency, formatPercent } from "@/lib/affordabilityMath";

function Stat({ label, value, subcopy }) {
  return (
    <div className="border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-slate-50">{value}</dd>
      {subcopy ? <p className="mt-1 text-xs leading-5 text-slate-500">{subcopy}</p> : null}
    </div>
  );
}

export default function AffordabilityResults({ selected }) {
  return (
    <aside aria-live="polite" className="official-card sticky top-20 rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
            Result
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">
            {selected.neighborhood.name}
          </h2>
        </div>
        <span className={`rounded-md border px-3 py-1 text-sm font-bold transition-colors duration-300 ${selected.risk.tone}`}>
          {selected.risk.label}
        </span>
      </div>

      <div className="mt-5">
        <div className="h-3 rounded-full bg-white/10">
          <div
            className={`meter-fill h-3 rounded-full ${selected.risk.meter}`}
            style={{ width: `${selected.score}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>High Risk</span>
          <span>Stretched</span>
          <span>Stable</span>
        </div>
      </div>

      <dl
        key={`${selected.neighborhood.name}-${selected.score}-${selected.leftoverAfterSavings}`}
        className="result-refresh mt-6"
      >
        <Stat
          label="Estimated monthly leftover"
          subcopy="After essential costs and the savings goal."
          value={formatCurrency(selected.leftoverAfterSavings)}
        />
        <Stat
          label="Housing-cost-to-income"
          subcopy="Monthly housing divided by monthly income."
          value={formatPercent(selected.housingRatio)}
        />
        <Stat
          label="Total essential monthly cost"
          subcopy="Housing, utilities, transportation, and debt."
          value={formatCurrency(selected.totalEssentialCost)}
        />
        <Stat
          label="Commute-adjusted affordability"
          subcopy="Housing plus transportation pressure as a share of income."
          value={formatPercent(selected.commuteAdjustedRatio)}
        />
      </dl>

      <div className="mt-6 rounded-md border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:border-emerald-300/20">
        <h3 className="text-sm font-bold text-slate-100">Plain-English read</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{selected.explanation}</p>
      </div>

      {selected.warnings.length ? (
        <div className="mt-4 rounded-md border border-amber-300/25 bg-amber-300/10 p-4">
          <h3 className="text-sm font-bold text-amber-100">Warnings</h3>
          <ul className="mt-2 grid gap-2 text-sm leading-5 text-amber-50/[0.85]">
            {selected.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
