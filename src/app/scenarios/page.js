import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";
import { buildAffordabilityModel } from "@/lib/affordabilityMath";

export const metadata = {
  title: "Scenarios",
  description:
    "Side-by-side housing scenario comparison across income brackets, neighborhoods, and budget profiles.",
};

const scenarioDefs = [
  {
    id: "entry",
    name: "Entry-level budget",
    tag: "Lower income",
    tagStyle: "bg-rose-400/15 text-rose-200 border-rose-400/20",
    accentFrom: "from-rose-500/10",
    inputs: {
      monthlyIncome: 4200,
      housingCost: 2201,
      utilities: 160,
      transportationCost: 280,
      debtPayments: 150,
      savingsGoal: 200,
      neighborhoodName: "National City",
      workLocation: "downtown",
      preferredCommute: 35,
      roommates: "1",
      householdSize: 2,
      priority: "save",
      notes: "",
    },
    description: "One roommate, South Bay location, entry-level take-home with aggressive savings constraints.",
  },
  {
    id: "mid",
    name: "Mid-range household",
    tag: "Median income",
    tagStyle: "bg-emerald-400/15 text-emerald-200 border-emerald-400/20",
    accentFrom: "from-emerald-500/10",
    inputs: {
      monthlyIncome: 6000,
      housingCost: 2449,
      utilities: 210,
      transportationCost: 340,
      debtPayments: 220,
      savingsGoal: 500,
      neighborhoodName: "Clairemont",
      workLocation: "downtown",
      preferredCommute: 30,
      roommates: "0",
      householdSize: 1,
      priority: "balanced",
      notes: "",
    },
    description: "Solo professional, central-suburban location, balanced budget with moderate savings pressure.",
  },
  {
    id: "coastal",
    name: "Coastal lifestyle",
    tag: "Higher income",
    tagStyle: "bg-cyan-400/15 text-cyan-200 border-cyan-400/20",
    accentFrom: "from-cyan-500/10",
    inputs: {
      monthlyIncome: 8500,
      housingCost: 2854,
      utilities: 250,
      transportationCost: 400,
      debtPayments: 350,
      savingsGoal: 800,
      neighborhoodName: "Pacific Beach",
      workLocation: "ucsd",
      preferredCommute: 25,
      roommates: "0",
      householdSize: 1,
      priority: "lifestyle",
      notes: "",
    },
    description: "Coastal neighborhood, short campus commute, higher income with lifestyle priority.",
  },
  {
    id: "premium",
    name: "Premium urban",
    tag: "High income",
    tagStyle: "bg-amber-400/15 text-amber-200 border-amber-400/20",
    accentFrom: "from-amber-500/10",
    inputs: {
      monthlyIncome: 10500,
      housingCost: 3358,
      utilities: 300,
      transportationCost: 280,
      debtPayments: 450,
      savingsGoal: 1200,
      neighborhoodName: "Downtown San Diego",
      workLocation: "downtown",
      preferredCommute: 15,
      roommates: "0",
      householdSize: 1,
      priority: "convenience",
      notes: "",
    },
    description: "Downtown living with short commute, premium rent, high income, and high savings target.",
  },
];

const computed = scenarioDefs.map((s) => ({
  ...s,
  result: buildAffordabilityModel(s.inputs).selected,
}));

function fmt(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function pct(n) {
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 0 }).format(n);
}

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-[#060e0c] text-slate-100">
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="motion-section relative border-b border-white/[0.07] px-5 pb-16 pt-32 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.14),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(251,191,36,0.1),transparent_30%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
            Scenario comparison
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            Four households. Four different affordability pictures.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Pre-built scenarios across income brackets and neighborhood types.
            Each uses realistic assumptions — see how the risk score, leftover,
            and housing burden shift as income and rent change.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            All figures computed by the same affordability model as the
            calculator. Adjust any inputs in the{" "}
            <SmoothLink href="/calculator" className="text-emerald-300 hover:text-emerald-200 underline">
              live calculator
            </SmoothLink>
            .
          </p>
        </div>
      </section>

      {/* ─── Cards ─── */}
      <section className="motion-section motion-delay-1 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {computed.map((s) => {
            const r = s.result;
            return (
              <article key={s.id} className="official-card relative overflow-hidden rounded-xl p-6">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.accentFrom} to-transparent opacity-60`} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${s.tagStyle}`}>
                        {s.tag}
                      </span>
                      <h2 className="mt-3 text-xl font-semibold text-slate-50">{s.name}</h2>
                      <p className="mt-1 text-sm text-slate-500">{s.description}</p>
                    </div>
                    <span className={`shrink-0 rounded-md border px-3 py-1 text-sm font-bold ${r.risk.tone}`}>
                      {r.risk.label}
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="mt-5">
                    <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                      <span>Affordability score</span>
                      <span className="font-bold text-slate-200">{r.score} / 100</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/10">
                      <div
                        className={`chart-fill h-2.5 rounded-full ${r.risk.meter}`}
                        style={{ width: `${r.score}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                      <span>High Risk</span>
                      <span>Stretched</span>
                      <span>Stable</span>
                    </div>
                  </div>

                  {/* Key metrics */}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                      { label: "Income",       value: fmt(s.inputs.monthlyIncome) },
                      { label: "Housing cost", value: fmt(s.inputs.housingCost) },
                      { label: "Housing %",    value: pct(r.housingRatio) },
                      { label: "Essential total", value: fmt(r.totalEssentialCost) },
                      { label: "Leftover",     value: fmt(r.leftoverAfterSavings), highlight: true },
                      { label: "Commute",      value: r.commuteMinutes !== null ? `${r.commuteMinutes} min` : "Remote" },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className={`rounded-lg p-3 ${metric.highlight ? "border border-emerald-300/20 bg-emerald-300/[0.06]" : "border border-white/[0.07] bg-white/[0.03]"}`}
                      >
                        <span className="block text-[10px] uppercase tracking-wide text-slate-500">{metric.label}</span>
                        <strong className={`mt-1 block text-base font-black ${metric.highlight ? "text-emerald-100" : "text-slate-100"}`}>
                          {metric.value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  {/* Neighborhood */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                    <span className="text-xs text-slate-500">Neighborhood</span>
                    <span className="text-sm font-semibold text-slate-200">{r.neighborhood.name}</span>
                    <span className="ml-auto text-xs text-slate-600">{r.neighborhood.category}</span>
                  </div>

                  {/* Plain-English result */}
                  {r.explanation ? (
                    <p className="mt-3 text-xs leading-5 text-slate-400 italic">
                      &ldquo;{r.explanation}&rdquo;
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
              Side-by-side
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-50">
              All four scenarios in one view.
            </h2>
          </div>

          <div className="official-card overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    {["Scenario", "Income", "Rent", "Essential total", "Leftover", "Housing %", "Commute", "Risk"].map((h) => (
                      <th key={h} className="px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {computed.map((s, i) => {
                    const r = s.result;
                    return (
                      <tr key={s.id} className={`border-b border-white/[0.06] transition-colors hover:bg-white/[0.02] ${i === computed.length - 1 ? "border-b-0" : ""}`}>
                        <td className="px-5 py-4 font-semibold text-slate-200 whitespace-nowrap">{s.name}</td>
                        <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{fmt(s.inputs.monthlyIncome)}</td>
                        <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{fmt(s.inputs.housingCost)}</td>
                        <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{fmt(r.totalEssentialCost)}</td>
                        <td className={`px-5 py-4 font-bold whitespace-nowrap ${r.leftoverAfterSavings >= 0 ? "text-emerald-200" : "text-rose-300"}`}>
                          {fmt(r.leftoverAfterSavings)}
                        </td>
                        <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{pct(r.housingRatio)}</td>
                        <td className="px-5 py-4 text-slate-300 whitespace-nowrap">
                          {r.commuteMinutes !== null ? `${r.commuteMinutes} min` : "Remote"}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${r.risk.tone}`}>
                            {r.risk.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-600">
            All results computed by the same model as the live calculator. Neighborhood rents are static
            prototype assumptions. HUD Fair Market Rent is used as a county-level baseline reference.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Run it with your actual numbers.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            These scenarios are illustrative. The calculator lets you enter
            your exact income, rent, commute, and cost profile.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <SmoothLink
              href="/calculator"
              className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-6 text-sm font-black text-[#060e0c] hover:bg-amber-200"
            >
              Open the calculator
            </SmoothLink>
            <SmoothLink
              href="/neighborhoods"
              className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.07] px-6 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
            >
              Browse neighborhoods
            </SmoothLink>
          </div>
        </div>
      </section>
    </main>
  );
}
