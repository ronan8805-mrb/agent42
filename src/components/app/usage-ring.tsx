export function UsageRing({ used, guide = 600 }: { used: number; guide?: number }) {
  const pct = Math.min(100, (used / guide) * 100);
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - pct / 100);
  return (
    <div className="relative size-24">
      <svg viewBox="0 0 88 88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" className="stroke-stone" strokeWidth="6" />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          className="stroke-accent"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dash}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="tabular text-sm font-medium">{used}</span>
      </div>
    </div>
  );
}
