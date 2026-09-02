const BITS = [
  { t: "Hello", x: "6%", y: "12%", d: "0s" },
  { t: "Booked", x: "78%", y: "18%", d: "0.6s" },
  { t: "24/7", x: "88%", y: "62%", d: "1.1s" },
  { t: "Dia dhuit", x: "8%", y: "70%", d: "1.8s" },
  { t: "No hold music", x: "42%", y: "8%", d: "2.2s" },
];

export function FloatBits({ dark = false }: { dark?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {BITS.map((b) => (
        <span
          key={b.t}
          className={`desk-bubble absolute rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${
            dark ? "bg-[#F5C518] text-ink" : "bg-ink text-[#F5C518]"
          }`}
          style={{ left: b.x, top: b.y, animationDelay: b.d }}
        >
          {b.t}
        </span>
      ))}
    </div>
  );
}
