import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";
import { neighborhoods } from "@/data/neighborhoods";

const costDimensions = [
  {
    label: "Housing",
    icon: "⬛",
    color: "emerald",
    body: "Rent or mortgage sets the floor. Most households anchor decisions here and under-count everything else.",
    stat: "30–40%",
    statLabel: "of income, on average",
  },
  {
    label: "Commute",
    icon: "⬛",
    color: "amber",
    body: "Transportation costs and commute time add invisible pressure. A longer commute can wipe out rent savings.",
    stat: "$300–600",
    statLabel: "per month, typical range",
  },
  {
    label: "Utilities",
    icon: "⬛",
    color: "cyan",
    body: "Electricity, water, gas, and internet — often overlooked until the first bill arrives.",
    stat: "$150–300",
    statLabel: "per month, estimated",
  },
  {
    label: "Debt payments",
    icon: "⬛",
    color: "rose",
    body: "Student loans, car notes, and credit cards compete directly with housing affordability.",
    stat: "Up to 20%",
    statLabel: "of income before housing",
  },
  {
    label: "Savings pressure",
    icon: "⬛",
    color: "teal",
    body: "A housing choice that leaves no room for savings is a financial risk, not just a budget inconvenience.",
    stat: "3–6 months",
    statLabel: "emergency fund target",
  },
];

const featureSections = [
  {
    href: "/calculator",
    tag: "Core tool",
    tagColor: "text-emerald-200",
    title: "Affordability Calculator",
    body: "Enter income, rent, utilities, debt, transportation, and savings goals. The model returns a risk score, leftover estimate, and neighborhood comparison — all in real time.",
    cta: "Run a scenario",
    ctaStyle: "bg-emerald-300 text-[#060e0c] hover:bg-amber-200",
    accent: "from-emerald-500/20 to-transparent",
  },
  {
    href: "/neighborhoods",
    tag: "Data explorer",
    tagColor: "text-amber-200",
    title: "Neighborhood Explorer",
    body: "Compare 42 San Diego-area neighborhoods by rent estimate, transportation profile, affordability category, and financial risk level under a shared baseline budget.",
    cta: "Explore neighborhoods",
    ctaStyle: "border border-white/15 bg-white/[0.07] text-slate-100 hover:bg-white/[0.11]",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    href: "/commute",
    tag: "Tradeoff analysis",
    tagColor: "text-cyan-200",
    title: "Commute Cost Analysis",
    body: "Lower rent far from work can cost more than higher rent nearby. See three concrete scenarios that quantify the hidden price of a longer commute.",
    cta: "See the tradeoffs",
    ctaStyle: "border border-white/15 bg-white/[0.07] text-slate-100 hover:bg-white/[0.11]",
    accent: "from-cyan-500/12 to-transparent",
  },
  {
    href: "/scenarios",
    tag: "Comparison view",
    tagColor: "text-rose-200",
    title: "Scenario Comparison",
    body: "Pre-built side-by-side scenarios across income brackets and neighborhood types. See how the numbers shift when one variable changes.",
    cta: "Compare scenarios",
    ctaStyle: "border border-white/15 bg-white/[0.07] text-slate-100 hover:bg-white/[0.11]",
    accent: "from-rose-500/12 to-transparent",
  },
  {
    href: "/methodology",
    tag: "Transparency",
    tagColor: "text-slate-300",
    title: "Model Methodology",
    body: "Every assumption is documented: how the risk score is calculated, what HUD Fair Market Rent data means, and where the model still needs real-world verification.",
    cta: "Review methodology",
    ctaStyle: "border border-white/15 bg-white/[0.07] text-slate-100 hover:bg-white/[0.11]",
    accent: "from-slate-500/10 to-transparent",
  },
];

const colorMap = {
  emerald: "bg-emerald-300/20 text-emerald-200 border-emerald-300/20",
  amber: "bg-amber-300/15 text-amber-200 border-amber-300/20",
  cyan: "bg-cyan-300/15 text-cyan-200 border-cyan-300/20",
  rose: "bg-rose-300/15 text-rose-200 border-rose-300/20",
  teal: "bg-teal-300/15 text-teal-200 border-teal-300/20",
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060e0c] text-slate-100">
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="motion-section relative isolate flex min-h-[92vh] items-end px-5 pb-16 pt-28 sm:px-8">
        {/* Layered background — parallax depth */}
        <div className="absolute inset-0 -z-20 bg-[#060e0c]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />

        {/* Orbs */}
        <div
          className="hero-orb hero-orb-1 absolute -z-10"
          style={{
            width: "56vw",
            height: "56vw",
            top: "-18%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb hero-orb-2 absolute -z-10"
          style={{
            width: "44vw",
            height: "44vw",
            top: "5%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(251,191,36,0.04) 45%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb hero-orb-3 absolute -z-10"
          style={{
            width: "32vw",
            height: "32vw",
            bottom: "10%",
            left: "30%",
            background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)",
          }}
        />

        {/* Neighborhood dots map — decorative */}
        <div className="absolute inset-0 -z-10 opacity-40">
          {neighborhoods.slice(0, 32).map((item) => (
            <span
              key={item.name}
              className="absolute h-1.5 w-1.5 rounded-full bg-emerald-300/70 shadow-[0_0_16px_rgba(110,231,183,0.5)]"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              title={item.name}
            />
          ))}
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                Civic-tech housing affordability platform
              </span>
            </div>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-50 sm:text-7xl lg:text-8xl">
              Housing affordability{" "}
              <span className="bg-gradient-to-r from-emerald-200 to-amber-200 bg-clip-text text-transparent">
                is more than rent.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Affordability Labs models rent, commute costs, utilities, debt
              payments, and savings pressure together — so you can see the real
              monthly cost before choosing a neighborhood.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <SmoothLink
                href="/calculator"
                className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-6 text-sm font-black text-[#060e0c] shadow-[0_0_36px_rgba(110,231,183,0.3)] hover:bg-amber-200"
              >
                Start calculator
              </SmoothLink>
              <SmoothLink
                href="/neighborhoods"
                className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.16] bg-white/[0.07] px-6 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
              >
                Compare neighborhoods
              </SmoothLink>
              <SmoothLink
                href="/methodology"
                className="official-button inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-bold text-slate-400 hover:text-slate-200"
              >
                View methodology →
              </SmoothLink>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
            {[
              { value: "42", label: "areas modeled" },
              { value: "3", label: "risk bands" },
              { value: "5+", label: "cost dimensions" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl p-4 sm:p-5"
              >
                <strong className="block text-2xl font-black text-slate-50 sm:text-3xl">
                  {stat.value}
                </strong>
                <span className="text-xs text-slate-500 sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission strip ─── */}
      <section className="motion-section motion-delay-1 border-y border-white/[0.07] bg-[rgba(10,22,19,0.8)] px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
              Why this exists
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              The rent number is only the beginning.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            A household can look affordable on paper — $2,400 rent on $6,000
            income — and still become financially unstable after transportation,
            utilities, debt payments, and savings goals are added. Affordability
            Labs makes those five dimensions visible together so the tradeoffs
            are clear before you sign a lease.
          </p>
        </div>
      </section>

      {/* ─── Cost dimensions ─── */}
      <section className="motion-section motion-delay-2 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
            The full cost picture
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Five dimensions of monthly pressure.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            The calculator tracks all five so you can see their combined weight
            against monthly income.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {costDimensions.map((dim) => (
            <article key={dim.label} className="official-card rounded-xl p-5">
              <div className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${colorMap[dim.color]}`}>
                {dim.label}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{dim.body}</p>
              <div className="mt-4 border-t border-white/[0.07] pt-4">
                <strong className="block text-lg font-black text-slate-50">{dim.stat}</strong>
                <span className="text-xs text-slate-500">{dim.statLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Feature sections ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] bg-[rgba(8,18,16,0.6)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
              Platform tools
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Everything built around one question.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
              Can you actually afford to live here — after all of it?
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureSections.map((feature) => (
              <article key={feature.href} className="official-card group relative overflow-hidden rounded-xl p-6">
                {/* Accent gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${feature.tagColor}`}>
                    {feature.tag}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-50">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{feature.body}</p>
                  <div className="mt-5">
                    <SmoothLink
                      href={feature.href}
                      className={`official-button inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-bold ${feature.ctaStyle}`}
                    >
                      {feature.cta}
                    </SmoothLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="motion-section motion-delay-3 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="official-card relative overflow-hidden rounded-2xl p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.16),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1),transparent_40%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
                Ready to model your scenario?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Enter your numbers. See the full picture.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                The calculator takes under two minutes and shows housing burden,
                commute pressure, leftover income, and risk level across all 42
                modeled San Diego neighborhoods.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <SmoothLink
                href="/calculator"
                className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-6 text-sm font-black text-[#060e0c] shadow-[0_0_32px_rgba(110,231,183,0.25)] hover:bg-amber-200"
              >
                Start the calculator
              </SmoothLink>
              <SmoothLink
                href="/about"
                className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.07] px-6 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
              >
                About the project
              </SmoothLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
