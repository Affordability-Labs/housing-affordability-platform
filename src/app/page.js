import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";
import { neighborhoods } from "@/data/neighborhoods";

const featureCards = [
  {
    title: "Housing pressure",
    body: "Compare rent or mortgage costs against take-home income and monthly savings goals.",
  },
  {
    title: "Commute tradeoffs",
    body: "Layer transportation costs and commute estimates into the affordability picture.",
  },
  {
    title: "Neighborhood fit",
    body: "Rank San Diego-area neighborhoods by modeled financial stability and risk.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#081210] text-slate-100">
      <SiteNav />

      <section className="motion-section relative isolate flex min-h-[88vh] items-end px-5 pb-14 pt-28 sm:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_20%,rgba(52,211,153,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(251,191,36,0.13),transparent_26%),linear-gradient(135deg,#081210,#10201d_56%,#202719)]" />
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
          {neighborhoods.slice(0, 30).map((item) => (
            <span
              key={item.name}
              className="absolute h-2 w-2 rounded-full bg-emerald-200/70 shadow-[0_0_22px_rgba(110,231,183,0.45)]"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              title={item.name}
            />
          ))}
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
              Civic-tech housing affordability platform
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-50 sm:text-7xl">
              Understand the real cost of where you live.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Affordability Labs models housing costs, commute costs,
              neighborhood tradeoffs, savings pressure, and affordability risk
              in one public-facing tool.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SmoothLink
                href="/calculator"
                className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-5 text-sm font-black text-[#081210] hover:bg-amber-200"
              >
                Run a housing scenario
              </SmoothLink>
              <SmoothLink
                href="/methodology"
                className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.08] px-5 text-sm font-bold text-slate-100 hover:bg-white/[0.12]"
              >
                Review methodology
              </SmoothLink>
            </div>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <strong className="block text-2xl text-slate-50">42</strong>
              <span className="text-sm text-slate-400">areas modeled</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <strong className="block text-2xl text-slate-50">3</strong>
              <span className="text-sm text-slate-400">risk bands</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <strong className="block text-2xl text-slate-50">1</strong>
              <span className="text-sm text-slate-400">monthly model</span>
            </div>
          </div>
        </div>
      </section>

      <section className="motion-section motion-delay-1 border-y border-white/10 bg-[#0b1715] px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
              Mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Affordability is more than rent.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            Many households choose housing based on rent or mortgage alone, but
            real affordability also depends on transportation, debt, utilities,
            savings goals, commute time, and neighborhood access. This platform
            makes those tradeoffs easier to see.
          </p>
        </div>
      </section>

      <section className="motion-section motion-delay-2 mx-auto grid w-full max-w-7xl gap-5 px-5 py-16 sm:px-8 md:grid-cols-3">
        {featureCards.map((card) => (
          <article key={card.title} className="official-card rounded-lg p-5">
            <h2 className="text-xl font-semibold text-slate-50">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.body}</p>
          </article>
        ))}
      </section>

      <section className="motion-section motion-delay-3 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <div className="official-card rounded-lg border-emerald-300/20 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
            Calculator
          </p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
                The working calculator is now a dedicated route.
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
                Use it to enter monthly income, housing cost, utilities,
                transportation, debt, savings goals, and neighborhood assumptions.
              </p>
            </div>
            <SmoothLink
              href="/calculator"
              className="official-button inline-flex h-12 items-center justify-center rounded-md bg-slate-100 px-5 text-sm font-black text-[#081210] hover:bg-amber-200"
            >
              Try the calculator
            </SmoothLink>
          </div>
        </div>
      </section>
    </main>
  );
}
