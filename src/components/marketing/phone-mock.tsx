import { useEffect, useState } from "react";

const LINES = [
  { who: "Aoife", text: "Northlight Salon, Aoife speaking. How can I help?" },
  { who: "Siobhan", text: "I need a colour refresh before Friday." },
  { who: "Aoife", text: "Clara has Thursday at two. Shall I book you in?" },
  { who: "Siobhan", text: "Yes — Siobhan Murphy, same as last time." },
  { who: "Aoife", text: "That’s in. I’ll text a confirmation now." },
];

export function PhoneMock() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => (c >= LINES.length ? 1 : c + 1));
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-line bg-card p-3 shadow-[var(--shadow-float)]">
        <div className="overflow-hidden rounded-xl bg-ink text-paper">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <span className="text-[10px] tracking-[0.18em] text-paper/50 uppercase">Incoming</span>
            <span className="size-1.5 rounded-full bg-success" />
          </div>
          <div className="px-4 pb-3">
            <p className="text-xs text-paper/60">Answered by</p>
            <p className="text-lg font-medium tracking-tight">Aoife, Agent 42</p>
            <p className="text-xs text-paper/50">Northlight Salon · +44 20 3918 4242</p>
          </div>
          <div className="min-h-56 space-y-3 bg-ink px-4 pt-2 pb-5">
            {LINES.slice(0, count).map((line, i) => (
              <div key={i} className="rise-in">
                <p className="text-[10px] tracking-wide text-paper/40 uppercase">{line.who}</p>
                <p className="text-sm leading-snug text-paper/90">
                  {line.text}
                  {i === count - 1 ? (
                    <span className="ml-0.5 inline-block h-3 w-px translate-y-px bg-accent [animation:caret_1s_steps(1)_infinite]" />
                  ) : null}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-paper/10 px-4 py-3 text-[11px] text-paper/50">
            <span>Live · 02:14</span>
            <span className="text-success">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
