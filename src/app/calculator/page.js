import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import SiteNav from "@/components/SiteNav";
import SmoothLink from "@/components/SmoothLink";

export const metadata = {
  title: "Calculator",
  description:
    "Run a housing affordability scenario across rent, commute costs, debt, savings pressure, and San Diego neighborhood tradeoffs.",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-[#060e0c]">
      <SiteNav />
      {/* Breadcrumb / context strip */}
      <div className="fixed inset-x-0 top-16 z-30 hidden border-b border-white/[0.06] bg-[rgba(6,14,12,0.92)] backdrop-blur-xl sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center gap-3 px-8 text-xs text-slate-500">
          <SmoothLink href="/" className="hover:text-slate-300 transition-colors">Home</SmoothLink>
          <span>/</span>
          <span className="text-slate-400">Calculator</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-300/80">Affordability model active</span>
          </span>
        </div>
      </div>
      <AffordabilityCalculator />
    </main>
  );
}
