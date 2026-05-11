import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";

export const metadata = {
  title: "About",
  description:
    "About the Affordability Labs housing affordability platform — mission, approach, and the people it is designed to help.",
};

const pillars = [
  {
    title: "Housing costs are public infrastructure",
    body: "Where people can afford to live shapes where they work, how long they commute, which schools their children attend, and how much of their income gets recycled into local economies. Housing affordability is not a personal finance problem — it is a systems problem with public consequences.",
    accent: "border-l-emerald-400/50",
  },
  {
    title: "The rent number is not enough information",
    body: "A two-bedroom apartment at $2,400 per month can be stable or financially catastrophic depending on income, transportation costs, debt load, utility burden, and savings pressure. The same rent number produces radically different outcomes for different households. Any meaningful affordability analysis has to include all five dimensions.",
    accent: "border-l-amber-400/50",
  },
  {
    title: "Commute costs are systematically invisible",
    body: "A household that saves $400 per month in rent by moving further from work and then spends $350 more on transportation and an hour more per day commuting has not improved their situation. They have obscured it. This platform makes the commute cost visible alongside housing cost.",
    accent: "border-l-cyan-400/50",
  },
  {
    title: "Transparency builds trust in planning tools",
    body: "The model surfaces its assumptions, scores its confidence, and clearly labels where real-world verification is still needed. Every result comes with the calculation method, the data source, and the limitations. The goal is for users to understand the estimate, not just accept it.",
    accent: "border-l-rose-400/50",
  },
];

const platformPrinciples = [
  { label: "Open methodology", body: "Every formula is documented and available. The model is not a black box." },
  { label: "Conservative estimates", body: "When uncertain, the model errs toward showing more pressure, not less." },
  { label: "No financial advice", body: "This is a planning tool. Users should verify numbers against real listings, lease terms, and a household budget." },
  { label: "Static data, labeled clearly", body: "Neighborhood rent estimates are prototype assumptions. HUD data is county-level. Both are labeled as such throughout the platform." },
  { label: "Designed for real decisions", body: "The inputs mirror the actual costs households face, not idealized textbook scenarios." },
  { label: "Civic-tech orientation", body: "The platform is built as a public-interest research and planning tool, not as a real estate marketing product." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060e0c] text-slate-100">
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="motion-section relative border-b border-white/[0.07] px-5 pb-16 pt-32 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(16,185,129,0.15),transparent_32%),radial-gradient(circle_at_75%_15%,rgba(251,191,36,0.1),transparent_28%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
            About Affordability Labs
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            Housing affordability is a systems problem.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Affordability Labs is a civic-tech research platform that models
            the full monthly cost of housing — rent, transportation, utilities,
            debt, and savings pressure — in a single transparent tool built for
            public use.
          </p>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="motion-section motion-delay-1 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
              Mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Make the full cost visible before the decision gets made.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Millions of households choose where to live based on the rent or
              mortgage number alone. That number almost never tells the full
              story. Transportation to work costs money and time. Utilities
              arrive every month. Debt payments do not pause for a new lease.
              Savings pressure is real and often ignored until it is not.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              This platform puts those five dimensions into one model so
              families, urban planners, policy researchers, and housing
              advocates can see what a housing decision actually costs — not
              just what the rent line says.
            </p>
          </div>

          <div className="grid gap-4 content-start">
            {pillars.slice(0, 2).map((pillar) => (
              <div
                key={pillar.title}
                className={`official-card rounded-xl border-l-4 ${pillar.accent} p-5`}
              >
                <h3 className="text-base font-semibold text-slate-50">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why sections ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] bg-[rgba(8,18,16,0.5)] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
            What we believe
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Four things we keep coming back to.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`official-card rounded-xl border-l-4 ${pillar.accent} p-6`}
              >
                <h3 className="text-lg font-semibold text-slate-50">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Platform principles ─── */}
      <section className="motion-section motion-delay-2 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
          How we build
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Platform principles.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platformPrinciples.map((p) => (
            <div key={p.label} className="official-card rounded-xl p-5">
              <h3 className="text-base font-semibold text-slate-50">{p.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Who it is for ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07] bg-[rgba(8,18,16,0.5)] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
                Who this is for
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Any household making a housing decision with incomplete information.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { group: "Renters", body: "Who want to understand what a lease actually costs each month before signing." },
                { group: "First-time movers", body: "Building a budget for the first time and trying to understand what is realistic." },
                { group: "Urban policy researchers", body: "Studying housing burden, displacement pressure, and neighborhood-level financial stress." },
                { group: "Housing advocates", body: "Making the case for affordable housing development with data-backed pressure analysis." },
                { group: "Planning students", body: "Learning how transportation infrastructure decisions interact with housing affordability." },
                { group: "Employers and HR teams", body: "Understanding the affordability environment their employees navigate when choosing where to live." },
              ].map((item) => (
                <div key={item.group} className="official-card rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-50">{item.group}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Limitations ─── */}
      <section className="motion-section motion-delay-3 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="official-card rounded-xl p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.08),transparent_45%)]" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
              Honest limitations
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
              What this model does not do.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              A planning tool is most trustworthy when it is specific about its
              boundaries. This is what Affordability Labs does not model:
            </p>
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-400 sm:grid-cols-2">
              {[
                "Taxes, insurance, or HOA fees",
                "Childcare or medical costs",
                "Irregular income or seasonal employment",
                "Live traffic or real-time transit data",
                "Individual credit scores or lease qualification",
                "Move-in fees, security deposits, or parking costs",
                "Inflation or rent escalation over time",
                "Neighborhood-level current listing prices",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 shrink-0 text-amber-400">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              These are real costs. Any household making a final housing decision should verify
              current listings, lease terms, and all personal obligations before committing.
              This tool is a starting point, not a substitute for that process.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Start with the calculator.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            Enter your income, rent, commute, and costs. Get a risk score,
            leftover estimate, and neighborhood comparison in real time.
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
              Read the methodology
            </SmoothLink>
          </div>
        </div>
      </section>
    </main>
  );
}
