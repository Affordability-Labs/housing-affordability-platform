import MethodologySection from "@/components/MethodologySection";
import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";

export const metadata = {
  title: "Methodology",
  description:
    "How the Affordability Labs calculator estimates housing pressure, commute pressure, neighborhood tradeoffs, and affordability risk.",
};

const scoreTable = [
  { factor: "Housing cost / income ratio", weight: "Up to 32 pts", detail: "Penalty scales from 28% to 55% burden" },
  { factor: "Commute-adjusted cost ratio", weight: "Up to 20 pts", detail: "Penalty scales from 42% to 70% pressure" },
  { factor: "Essential cost ratio", weight: "Up to 22 pts", detail: "Penalty scales from 65% to 100% of income" },
  { factor: "Savings goal coverage", weight: "Up to 22 pts", detail: "Penalty when leftover after savings is negative" },
  { factor: "Commute time overage", weight: "Up to 8 pts",  detail: "Penalty when modeled commute exceeds preference" },
  { factor: "Positive cushion bonus", weight: "+3 to +6 pts",detail: "Bonus when leftover exceeds 8–15% of income" },
];

const riskBands = [
  { label: "Stable",    score: "74 – 100", color: "text-emerald-200 bg-emerald-500/10 border-emerald-400/30", bar: "bg-emerald-400", body: "Essential costs are manageable, the savings goal fits, and there is meaningful leftover income. This scenario has room to absorb a financial surprise." },
  { label: "Stretched", score: "50 – 73",  color: "text-amber-100 bg-amber-400/10 border-amber-300/30",    bar: "bg-amber-300",   body: "The budget works on paper but the margin is thin. A rent increase, unexpected repair, or reduced income could quickly tip the scenario into stress." },
  { label: "High Risk", score: "0 – 49",   color: "text-rose-100 bg-rose-400/10 border-rose-300/30",       bar: "bg-rose-300",    body: "Housing, transportation, or fixed costs leave insufficient margin for savings and unexpected expenses. This scenario warrants careful review before committing." },
];

const dataSection = [
  {
    label: "HUD Fair Market Rent",
    body: "The platform integrates with the HUD User API to fetch Fair Market Rent (FMR) data for San Diego County. FMR is a county-level HUD estimate — it reflects a reasonable rent for the area, not a neighborhood-specific listing price. It is used as a baseline reference in the platform's HUD rent panel, not as input to the calculator model.",
  },
  {
    label: "Fallback values",
    body: "When the HUD API is unavailable or the token is not configured, the platform automatically falls back to bundled FY 2024 HUD FMR values for San Diego County. The data badge in the calculator indicates whether live or fallback data is shown.",
  },
  {
    label: "Neighborhood rent estimates",
    body: "The 42 neighborhood rent estimates in the calculator are static planning assumptions built into the prototype. They are not live listing prices. They should be refreshed against current market data before formal research or publication use.",
  },
  {
    label: "Commute estimates",
    body: "Commute times are modeled from each neighborhood's spatial position relative to work center coordinates. They are directional planning proxies — not live traffic, transit timetable, or route-optimized estimates.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#060e0c] text-slate-100">
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="motion-section relative border-b border-white/[0.07] px-5 pb-16 pt-32 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_32%),linear-gradient(135deg,#060e0c,#0d1e1a_55%,#1a2318)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
            Methodology
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            A transparent estimate for housing, commute, and savings risk.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            The model keeps every assumption visible so users can understand
            where a result comes from and where real-world verification is
            still needed. This is an educational planning estimate — not
            financial advice.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-amber-300/20 bg-amber-300/[0.07] px-4 py-2 text-sm text-amber-100">
            <span className="font-bold">Important:</span>
            <span>This tool does not replace a household budget, a financial advisor, or due diligence on real listings.</span>
          </div>
        </div>
      </section>

      {/* ─── Core logic ─── */}
      <section className="motion-section motion-delay-1 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Model inputs</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">What you enter — and what happens to it.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Monthly take-home income",    role: "The denominator for all ratio calculations. After-tax income only." },
            { label: "Rent or mortgage",            role: "The primary housing cost. Drives the housing-to-income ratio." },
            { label: "Utilities",                   role: "Added to the essential cost total alongside rent and transportation." },
            { label: "Transportation or commute",   role: "Your actual transportation spend, separate from commute-time pressure." },
            { label: "Debt payments",               role: "Student loans, car notes, credit cards — any recurring fixed obligations." },
            { label: "Monthly savings goal",        role: "Subtracted from leftover income. If leftover goes negative, a warning fires." },
            { label: "Neighborhood",                role: "Sets the estimated commute time and the neighborhood rent estimate." },
            { label: "Work or school location",     role: "Used with the neighborhood position to model commute time." },
            { label: "Preferred commute",           role: "Minutes you consider acceptable. Commute pressure activates above this threshold." },
            { label: "Roommates",                   role: "Applies a cost-sharing factor to the neighborhood rent estimate." },
            { label: "Household size",              role: "Contextual — does not change the score directly but affects interpretation." },
            { label: "Main priority",               role: "Save money, balanced, short commute, or lifestyle. Adjusts neighborhood fit ranking." },
          ].map((item) => (
            <div key={item.label} className="official-card rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-50">{item.label}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{item.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Score table ─── */}
      <section className="motion-section motion-delay-1 border-t border-white/[0.07] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Scoring</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
            The affordability score: 0 to 100.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
            Every scenario starts at 100. Points are deducted when the model
            detects financial pressure. Bonuses apply when the leftover cushion
            is meaningful.
          </p>

          <div className="official-card mt-8 overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    {["Factor", "Max impact", "Detail"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scoreTable.map((row, i) => (
                    <tr key={row.factor} className={`border-b border-white/[0.06] hover:bg-white/[0.02] ${i === scoreTable.length - 1 ? "border-0" : ""}`}>
                      <td className="px-6 py-4 font-medium text-slate-200">{row.factor}</td>
                      <td className="px-6 py-4 text-emerald-200 font-bold whitespace-nowrap">{row.weight}</td>
                      <td className="px-6 py-4 text-slate-400">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Risk bands ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">Risk bands</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
            Three labels. Clear thresholds.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {riskBands.map((band) => (
              <div key={band.label} className="official-card rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <span className={`rounded-md border px-3 py-1 text-sm font-bold ${band.color}`}>
                    {band.label}
                  </span>
                  <span className="text-sm font-bold text-slate-300">{band.score}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className={`h-2 rounded-full ${band.bar}`} style={{ width: band.label === "Stable" ? "88%" : band.label === "Stretched" ? "62%" : "32%" }} />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">{band.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Commute pressure ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] bg-[rgba(8,18,16,0.5)] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Commute pressure</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
              How commute time becomes financial pressure.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              When a modeled commute exceeds the user&apos;s preferred commute,
              the model adds a planning proxy — a dollar amount representing
              the hidden cost of the extra time. This is <em>not</em> a literal
              transportation bill. It is a pressure indicator.
            </p>
            <div className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
              <p className="text-sm font-bold text-cyan-100">Formula</p>
              <code className="mt-2 block text-sm text-cyan-200/80">
                Pressure = (commute minutes − preferred minutes) × $8/min
              </code>
              <p className="mt-3 text-xs text-slate-400">
                The $8/minute figure is a planning proxy, not a market rate.
                Real-world commute cost depends on mode, vehicle type, transit
                access, and individual time value.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Neighborhood ranking</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
              How neighborhoods are ranked for fit.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Every neighborhood is scored on the same financial model, then
              adjusted by a fit bonus based on the user&apos;s stated priority
              and by a market flexibility factor. The rankings reflect
              modeled financial stability and priority alignment — not
              desirability or market quality.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-400">
              {["Save money: rewards lower housing ratios and save-tagged areas", "Balanced: penalizes commute overage and high housing ratios equally", "Short commute: heavily penalizes commute overage", "Lifestyle: rewards coastal/lifestyle tags, penalizes extreme housing burden"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-400">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Data sources ─── */}
      <section className="motion-section motion-delay-2 border-t border-white/[0.07] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">Data sources</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
            Where the numbers come from.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {dataSection.map((item) => (
              <div key={item.label} className="official-card rounded-xl p-5">
                <h3 className="text-base font-semibold text-slate-50">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Existing methodology section ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07]">
        <MethodologySection />
      </section>

      {/* ─── CTA ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Ready to run the model?
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            The calculator applies this methodology to your actual numbers in real time.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <SmoothLink
              href="/calculator"
              className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-6 text-sm font-black text-[#060e0c] hover:bg-amber-200"
            >
              Open the calculator
            </SmoothLink>
            <SmoothLink
              href="/about"
              className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.07] px-6 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
            >
              About the project
            </SmoothLink>
          </div>
        </div>
      </section>
    </main>
  );
}
