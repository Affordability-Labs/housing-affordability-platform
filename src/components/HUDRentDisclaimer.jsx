const hudMappedNeighborhoods = [
  "Mira Mesa",
  "North Park",
  "Clairemont",
  "Chula Vista",
  "UTC",
  "La Mesa",
  "Escondido",
  "Carmel Valley",
  "Hillcrest",
  "Downtown San Diego",
];

export default function HUDRentDisclaimer({ isFallback }) {
  return (
    <aside className="official-card rounded-lg p-5">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
        HUD county baseline
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-50">
        HUD Fair Market Rents are county-level estimates.
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        These values are mapped to selected neighborhoods only as a San Diego
        County baseline. They are not neighborhood-specific listing prices and
        may not reflect current rents in Mira Mesa, North Park, Clairemont,
        Chula Vista, UTC, La Mesa, Escondido, Carmel Valley, Hillcrest, or
        Downtown San Diego.
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Always verify current listings, lease terms, utilities, insurance,
        taxes, and personal expenses before making housing decisions.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {hudMappedNeighborhoods.map((name) => (
          <span
            className="rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-semibold text-slate-300"
            key={name}
          >
            {name}
          </span>
        ))}
      </div>
      {isFallback ? (
        <p className="mt-4 text-xs font-semibold text-amber-100">
          Showing fallback FY 2024 values because live HUD data is unavailable.
        </p>
      ) : null}
    </aside>
  );
}
