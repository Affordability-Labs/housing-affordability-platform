import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";
import { buildAffordabilityModel } from "@/lib/affordabilityMath";

export const metadata = {
  title: "Commute Cost Analysis",
  description:
    "How commute costs change housing affordability. Three concrete San Diego scenarios comparing rent savings versus commute pressure.",
};

const baseInputs = {
  monthlyIncome: 6000,
  utilities: 200,
  transportationCost: 320,
  debtPayments: 180,
  savingsGoal: 500,
  workLocation: "downtown",
  preferredCommute: 30,
  roommates: "0",
  householdSize: 1,
  priority: "balanced",
  notes: "",
};

const scenarios = [
  {
    neighborhoodName: "Escondido",
    housingCost: 2238,
    label: "Budget rent, long commute",
    tagColor: "text-amber-200",
    tagBg: "bg-amber-300/10 border-amber-300/20",
    accentFrom: "from-amber-500/10",
    takeaway: "The cheapest rent in the region. But the 80-minute round trip to downtown adds significant time cost and practical friction that the financial model only partially captures.",
  },
  {
    neighborhoodName: "Clairemont",
    housingCost: 2449,
    label: "Mid-range rent, moderate commute",
    tagColor: "text-emerald-200",
    tagBg: "bg-emerald-300/10 border-emerald-300/20",
    accentFrom: "from-emerald-500/10",
    takeaway: "A practical middle ground — moderate rent with a manageable commute. The model scores this as the most balanced scenario for most budget profiles.",
  },
  {
    neighborhoodName: "North Park",
    housingCost: 2770,
    label: "Higher rent, short commute",
    tagColor: "text-cyan-200",
    tagBg: "bg-cyan-300/10 border-cyan-300/20",
    accentFrom: "from-cyan-500/10",
    takeaway: "Higher rent leaves less leftover monthly, but the commute is well under the 30-minute preference. Time value and quality of life are not captured in this model.",
  },
];

const computedScenarios = scenarios.map((s) => {
  const model = buildAffordabilityModel({ ...baseInputs, ...s });
  return { ...s, result: model.selected };
});

function StatPill({ label, value, highlight }) {
  return (
    <div className={`rounded-lg p-4 ${highlight ? "border border-emerald-300/20 bg-emerald-300/[0.06]" : "border border-white/[0.07] bg-white/[0.04]"}`}>
      <span className="block text-xs text-slate-500">{label}</span>
      <strong className={`mt-1 block text-xl font-black ${highlight ? "text-emerald-100" : "text-slate-50"}`}>
        {value}
      </strong>
    </div>
  );
}

function fmt(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function pct(n) {
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 0 }).format(n);
}

export default function CommutePage() {
  return (
    <main className="min-h-screen bg-[#060e0c] text-slate-100">
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="motion-section relative border-b border-white/[0.07] px-5 pb-16 pt-32 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(251,191,36,0.13),transparent_35%),radial-gradient(circle_at_75%_10%,rgba(16,185,129,0.1),transparent_30%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
            Commute cost analysis
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            Cheaper rent further out can cost more than you save.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            This analysis holds income, utilities, debt, and transportation
            costs constant. Only the neighborhood rent and modeled commute
            time change — so you can see the isolated impact of each tradeoff.
          </p>
        </div>
      </section>

      {/* ─── Methodology callout ─── */}
      <div className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-emerald-300">Income</span>
            <span className="text-slate-600">→</span>
            <span className="font-bold text-slate-200">{fmt(baseInputs.monthlyIncome)}/mo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-cyan-300">Utilities</span>
            <span className="text-slate-600">→</span>
            <span className="font-bold text-slate-200">{fmt(baseInputs.utilities)}/mo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-amber-300">Transport</span>
            <span className="text-slate-600">→</span>
            <span className="font-bold text-slate-200">{fmt(baseInputs.transportationCost)}/mo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-rose-300">Debt</span>
            <span className="text-slate-600">→</span>
            <span className="font-bold text-slate-200">{fmt(baseInputs.debtPayments)}/mo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-teal-300">Savings goal</span>
            <span className="text-slate-600">→</span>
            <span className="font-bold text-slate-200">{fmt(baseInputs.savingsGoal)}/mo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-300">Work location</span>
            <span className="text-slate-600">→</span>
            <span className="font-bold text-slate-200">Downtown SD</span>
          </div>
        </div>
      </div>

      {/* ─── Scenario cards ─── */}
      <section className="motion-section motion-delay-1 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {computedScenarios.map((s) => {
            const r = s.result;
            return (
              <article key={s.neighborhoodName} className={`official-card relative overflow-hidden rounded-xl p-6`}>
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.accentFrom} to-transparent opacity-50`} />
                <div className="relative">
                  <div className={`inline-flex rounded-md border px-3 py-1 text-xs font-bold ${s.tagBg} ${s.tagColor}`}>
                    {s.label}
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-slate-50">
                    {s.neighborhoodName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Work location: Downtown San Diego
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <StatPill label="Monthly rent" value={fmt(s.housingCost)} />
                    <StatPill
                      label="Commute time"
                      value={r.commuteMinutes !== null ? `${r.commuteMinutes} min` : "N/A"}
                    />
                    <StatPill label="Housing / income" value={pct(r.housingRatio)} />
                    <StatPill label="Essential total" value={fmt(r.totalEssentialCost)} />
                    <StatPill
                      label="Leftover after savings"
                      value={fmt(r.leftoverAfterSavings)}
                      highlight
                    />
                    <StatPill label="Risk" value={r.risk.label} />
                  </div>

                  {/* Score bar */}
                  <div className="mt-5">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                      <span>Affordability score</span>
                      <span className="font-bold text-slate-200">{r.score} / 100</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className={`chart-fill h-2 rounded-full ${r.risk.meter}`}
                        style={{ width: `${r.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Commute pressure callout */}
                  {r.commutePressureDollars > 0 && (
                    <div className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/[0.07] p-3">
                      <p className="text-xs leading-5 text-amber-100">
                        <strong>+{fmt(r.commutePressureDollars)}/mo commute pressure</strong> — the model
                        adds a planning proxy for time lost when your commute exceeds your preferred limit.
                      </p>
                    </div>
                  )}

                  {/* Takeaway */}
                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    {s.takeaway}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── Key insight ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="official-card rounded-xl p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(16,185,129,0.12),transparent_45%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                  Key takeaway
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
                  Rent savings can evaporate in the commute.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-400">
                  In this comparison, Escondido saves $532/month in rent versus
                  North Park — but the 80-minute commute adds friction and
                  opportunity cost the model partially captures through a
                  planning-proxy pressure dollar amount.
                </p>
                <p className="mt-3 text-base leading-7 text-slate-400">
                  The financial leftover gap between the three scenarios is
                  narrower than the rent difference suggests. Time, energy,
                  vehicle wear, and quality of life are not in the model —
                  they tip the tradeoff further toward the shorter commute.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5">
                  <h3 className="text-sm font-semibold text-slate-300">What this model captures</h3>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-400">
                    {["Rent as share of income", "Essential monthly cost burden", "Commute-time planning pressure", "Savings goal fit", "Leftover after all modeled costs"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-400">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-5">
                  <h3 className="text-sm font-semibold text-amber-100">What this model does not capture</h3>
                  <ul className="mt-3 grid gap-2 text-sm text-amber-100/70">
                    {["Vehicle wear and maintenance increase", "Time value of commute hours", "Live traffic or transit accuracy", "Quality of life impact", "Health and stress factors"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-amber-400">—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Apply this to your actual commute.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            The calculator lets you set your exact income, preferred commute,
            and work location — so the estimates reflect your situation.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <SmoothLink
              href="/calculator"
              className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-6 text-sm font-black text-[#060e0c] hover:bg-amber-200"
            >
              Open the calculator
            </SmoothLink>
            <SmoothLink
              href="/methodology"
              className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.07] px-6 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
            >
              How commute pressure works
            </SmoothLink>
          </div>
        </div>
      </section>
    </main>
  );
}
