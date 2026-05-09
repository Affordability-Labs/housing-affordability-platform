import MethodologySection from "@/components/MethodologySection";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Methodology",
  description:
    "How the housing affordability calculator estimates housing pressure, commute pressure, neighborhood tradeoffs, and affordability risk.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#081210] text-slate-100">
      <SiteNav />
      <section className="motion-section border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_30%),linear-gradient(135deg,#081210,#10201d_55%,#1f2418)] px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">
            Methodology
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
            A transparent estimate for housing, commute, and savings risk.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            The model keeps assumptions visible so users can understand where the
            result comes from and where real-world verification is still needed.
          </p>
        </div>
      </section>
      <MethodologySection />
    </main>
  );
}
