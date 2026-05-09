import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "Calculator",
  description:
    "Run a housing affordability scenario across rent, commute costs, debt, savings pressure, and San Diego neighborhood tradeoffs.",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-[#081210]">
      <SiteNav />
      <AffordabilityCalculator />
    </main>
  );
}
