const methodologyCards = [
  {
    title: "Educational estimate",
    body: "This tool is for planning and comparison. It is not financial advice, lending guidance, or a substitute for a household budget review.",
  },
  {
    title: "Inputs used",
    body: "The model uses monthly income, housing cost, utilities, transportation or commute cost, debt payments, savings pressure, work location, and neighborhood selection.",
  },
  {
    title: "Affordability logic",
    body: "Risk is estimated from housing-cost-to-income, essential-cost-to-income, commute-adjusted pressure, savings goal fit, and remaining monthly cash.",
  },
  {
    title: "Neighborhood data",
    body: "Neighborhood rents and commute estimates are static planning assumptions from the prototype. They should be refreshed before publication or formal use.",
  },
  {
    title: "Commute adjustment",
    body: "Modeled commute time adds pressure when it exceeds the user's preferred commute. This is directional, not a live traffic or transit estimate.",
  },
  {
    title: "What to verify",
    body: "Before making a housing decision, verify current rents, taxes, insurance, lease fees, parking, utilities, transportation, childcare, medical costs, and personal obligations.",
  },
];

export default function MethodologySection({ compact = false }) {
  return (
    <section className={compact ? "" : "mx-auto w-full max-w-6xl px-5 py-16 sm:px-8"}>
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
          Methodology
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          How the affordability model thinks about risk.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-400">
          The calculator is intentionally transparent: it turns common monthly
          budget inputs into a conservative estimate of housing pressure,
          commute pressure, and savings flexibility.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {methodologyCards.map((card) => (
          <article key={card.title} className="official-card rounded-lg p-5">
            <h3 className="text-lg font-semibold text-slate-50">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
