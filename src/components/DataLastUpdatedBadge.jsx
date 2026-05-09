function formatUpdated(value) {
  if (!value) return "Checking data";
  if (String(value).startsWith("FY")) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DataLastUpdatedBadge({
  lastUpdated,
  loading,
  isFallback,
}) {
  const label = loading
    ? "HUD data loading"
    : isFallback
    ? "Fallback data"
    : "HUD data live";

  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-semibold text-slate-300">
      <span className={isFallback ? "text-amber-200" : "text-emerald-200"}>
        {label}
      </span>
      <span className="text-slate-500">Updated:</span>
      <span className="text-slate-200">{formatUpdated(lastUpdated)}</span>
    </div>
  );
}
