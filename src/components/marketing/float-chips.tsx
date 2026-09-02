export function FloatChips() {
  const chips = [
    { t: "Hello", c: "bg-[#F5C518] text-ink", s: "left-[6%] top-6" },
    { t: "Dia dhuit", c: "bg-[#2DD4BF] text-ink", s: "right-[8%] top-10" },
    { t: "Hola", c: "bg-[#E85D4C] text-paper", s: "left-[12%] bottom-8" },
    { t: "Ciao", c: "bg-ink text-[#F5C518]", s: "right-[14%] bottom-6" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {chips.map((ch, i) => (
        <span
          key={ch.t}
          className={`absolute ${ch.s} ${ch.c} rounded-full px-3 py-1 text-[11px] font-medium tracking-wide float-chip`}
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          {ch.t}
        </span>
      ))}
    </div>
  );
}
