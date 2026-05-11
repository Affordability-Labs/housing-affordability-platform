import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";
import { neighborhoods } from "@/data/neighborhoods";

export const metadata = {
  title: "Neighborhoods",
  description:
    "Compare 42 San Diego-area neighborhoods by rent estimate, category, transportation profile, and affordability tags.",
};

const tagColors = {
  urban:       "bg-violet-400/15 text-violet-200 border-violet-400/20",
  coastal:     "bg-cyan-400/15 text-cyan-200 border-cyan-400/20",
  suburban:    "bg-slate-400/15 text-slate-300 border-slate-400/20",
  balanced:    "bg-emerald-400/15 text-emerald-200 border-emerald-400/20",
  save:        "bg-teal-400/15 text-teal-200 border-teal-400/20",
  convenience: "bg-amber-400/15 text-amber-200 border-amber-400/20",
  lifestyle:   "bg-rose-400/15 text-rose-200 border-rose-400/20",
  student:     "bg-blue-400/15 text-blue-200 border-blue-400/20",
};

function rentBand(rent) {
  if (rent < 2400) return { label: "Budget",   style: "bg-teal-400/15 text-teal-200 border-teal-400/20" };
  if (rent < 2900) return { label: "Moderate", style: "bg-emerald-400/15 text-emerald-200 border-emerald-400/20" };
  if (rent < 3400) return { label: "Premium",  style: "bg-amber-400/15 text-amber-200 border-amber-400/20" };
  return                  { label: "Luxury",   style: "bg-rose-400/15 text-rose-200 border-rose-400/20" };
}

const sorted = [...neighborhoods].sort((a, b) => a.rent - b.rent);

const avgRent = Math.round(neighborhoods.reduce((s, n) => s + n.rent, 0) / neighborhoods.length);
const minRent = Math.min(...neighborhoods.map((n) => n.rent));
const maxRent = Math.max(...neighborhoods.map((n) => n.rent));

export default function NeighborhoodsPage() {
  return (
    <main className="min-h-screen bg-[#060e0c] text-slate-100">
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="motion-section relative border-b border-white/[0.07] px-5 pb-16 pt-32 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.1),transparent_30%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
            Neighborhood explorer
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            42 San Diego neighborhoods. One shared baseline.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            Every neighborhood is shown with its modeled rent estimate,
            category, transportation profile, and affordability tags. Use the
            calculator to apply your actual budget.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <SmoothLink
              href="/calculator"
              className="official-button inline-flex h-11 items-center justify-center rounded-md bg-emerald-300 px-5 text-sm font-black text-[#060e0c] hover:bg-amber-200"
            >
              Run a scenario with my budget
            </SmoothLink>
            <SmoothLink
              href="/commute"
              className="official-button inline-flex h-11 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.07] px-5 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
            >
              Analyze commute tradeoffs
            </SmoothLink>
          </div>

          {/* Summary stats */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              { value: `$${minRent.toLocaleString()}`, label: "Lowest rent" },
              { value: `$${avgRent.toLocaleString()}`, label: "County average" },
              { value: `$${maxRent.toLocaleString()}`, label: "Highest rent" },
            ].map((s) => (
              <div key={s.label} className="glass-panel rounded-xl p-4">
                <strong className="block text-xl font-black text-slate-50">{s.value}</strong>
                <span className="text-xs text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Disclaimer ─── */}
      <div className="border-b border-white/[0.06] bg-amber-300/[0.05] px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs leading-5 text-amber-200/80">
            <strong className="text-amber-100">Data note:</strong> Rent estimates are static planning
            assumptions built into the prototype. They are not live listings. HUD Fair Market Rent
            county-level baselines are used as a reference point — see the{" "}
            <SmoothLink href="/methodology" className="underline hover:text-amber-100">
              methodology
            </SmoothLink>{" "}
            for details.
          </p>
        </div>
      </div>

      {/* ─── Cards grid ─── */}
      <section className="motion-section motion-delay-1 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-50">
            All neighborhoods — sorted by rent (low to high)
          </h2>
          <span className="text-sm text-slate-500">{neighborhoods.length} areas</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((n) => {
            const band = rentBand(n.rent);
            return (
              <article key={n.name} className="official-card rounded-xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-slate-50">
                      {n.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">{n.category}</p>
                  </div>
                  <span className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-bold ${band.style}`}>
                    {band.label}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-5 text-slate-400 line-clamp-2">{n.vibe}</p>

                <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/[0.07] pt-4">
                  <div>
                    <span className="text-xs text-slate-600">Est. rent</span>
                    <strong className="block text-xl font-black text-slate-50">
                      ${n.rent.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {n.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          tagColors[tag] || "bg-slate-400/15 text-slate-300 border-slate-400/20"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="motion-section motion-delay-3 border-t border-white/[0.07] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Found a neighborhood that looks promising?
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-400">
            Use the calculator to run your actual budget against it — including
            commute costs, debt, utilities, and savings pressure.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <SmoothLink
              href="/calculator"
              className="official-button inline-flex h-12 items-center justify-center rounded-md bg-emerald-300 px-6 text-sm font-black text-[#060e0c] hover:bg-amber-200"
            >
              Open the calculator
            </SmoothLink>
            <SmoothLink
              href="/scenarios"
              className="official-button inline-flex h-12 items-center justify-center rounded-md border border-white/[0.15] bg-white/[0.07] px-6 text-sm font-bold text-slate-100 hover:bg-white/[0.11]"
            >
              Compare pre-built scenarios
            </SmoothLink>
          </div>
        </div>
      </section>
    </main>
  );
}
