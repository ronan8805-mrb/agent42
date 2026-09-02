import { useEffect, useState } from "react";

const SCENES = [
  { id: "hello", line: "Hello — how can I help?", lang: "English" },
  { id: "gaeilge", line: "Dia dhuit — cén t-am atá saor?", lang: "Gaeilge" },
  { id: "feet", line: "Bonjour — je note ça.", lang: "Français" },
  { id: "five", line: "Hola — cinco líneas a la vez.", lang: "Español" },
  { id: "notes", line: "Guten Tag — steht im Kalender.", lang: "Deutsch" },
  { id: "mail", line: "Ciao — ti mando la mail ora.", lang: "Italiano" },
  { id: "spin", line: "Hej — det blir ett nöje.", lang: "Svenska" },
] as const;

export function ReceptionistLoop() {
  const [i, setI] = useState(0);
  const scene = SCENES[i];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SCENES.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-3xl border border-line bg-mist shadow-[var(--shadow-float)]">
        <div className="flex items-center justify-between px-5 pt-4">
          <p className="text-[10px] tracking-[0.2em] text-muted uppercase">Never sleeps</p>
          <p className="text-[10px] tracking-[0.16em] text-accent uppercase">{scene.lang}</p>
        </div>
        <svg
          viewBox="0 0 420 340"
          className={`desk-stage block w-full pose-${scene.id}`}
          role="img"
          aria-label={`Agent 42 answering in ${scene.lang}: ${scene.line}`}
        >
          <rect x="18" y="268" width="384" height="14" rx="3" fill="currentColor" className="text-stone" />
          <rect x="28" y="252" width="364" height="18" rx="4" fill="currentColor" className="text-line" />
          <g className="chair-spin" style={{ transformOrigin: "210px 230px" }}>
            <ellipse cx="210" cy="248" rx="42" ry="10" fill="currentColor" className="text-line" />
            <rect x="188" y="188" width="44" height="62" rx="10" fill="#141312" />
            <rect x="176" y="168" width="68" height="36" rx="12" fill="#1c1b19" />
            <path className="leg-l" d="M196 248 L176 268" stroke="#0a0a0b" strokeWidth="6" strokeLinecap="round" />
            <path className="leg-r" d="M224 248 L248 268" stroke="#0a0a0b" strokeWidth="6" strokeLinecap="round" />
            <path className="arm-l" d="M188 196 L150 214" stroke="#0a0a0b" strokeWidth="6" strokeLinecap="round" />
            <path className="arm-r" d="M232 196 L268 208" stroke="#0a0a0b" strokeWidth="6" strokeLinecap="round" />
            <g transform="translate(184 108)">
              <rect width="52" height="44" rx="8" fill="#0a0a0b" />
              <rect x="6" y="7" width="40" height="26" rx="4" fill="#f7f4ef" />
              <text x="26" y="26" textAnchor="middle" fontSize="13" fontFamily="Geist, Inter, sans-serif" fontWeight="600" fill="#0a0a0b">
                42
              </text>
              <rect x="20" y="44" width="12" height="10" fill="#0a0a0b" />
            </g>
            <g fill="#0f766e">
              <g transform="translate(262 196)">
                <rect width="22" height="36" rx="5" />
                <rect x="4" y="6" width="14" height="18" rx="2" fill="#f7f4ef" />
              </g>
              <g className="phone-extra" opacity="0">
                <rect x="128" y="188" width="16" height="26" rx="4" />
                <rect x="148" y="176" width="16" height="26" rx="4" />
                <rect x="274" y="176" width="16" height="26" rx="4" />
                <rect x="294" y="190" width="16" height="26" rx="4" />
              </g>
            </g>
            <g className="note" opacity="0" transform="translate(268 228)">
              <rect width="48" height="28" rx="3" fill="#f7f4ef" stroke="#0a0a0b" strokeWidth="1" />
              <path d="M8 10 H38 M8 16 H32 M8 22 H28" stroke="#0f766e" strokeWidth="1.4" />
            </g>
            <g className="keyboard" opacity="0" transform="translate(236 236)">
              <rect width="72" height="16" rx="3" fill="#0a0a0b" />
            </g>
          </g>
          <g transform="translate(286 72)">
            <rect width="118" height="52" rx="14" fill="#0a0a0b" />
            <polygon points="18,52 28,52 14,64" fill="#0a0a0b" />
            <text x="14" y="24" fill="#f7f4ef" fontSize="11" fontFamily="Geist, Inter, sans-serif">
              {scene.line.split(" — ")[0]}
            </text>
            <text x="14" y="40" fill="#b8b2a8" fontSize="10" fontFamily="Geist, Inter, sans-serif">
              {scene.line.split(" — ")[1] ?? ""}
            </text>
          </g>
        </svg>
        <p className="px-5 pb-4 text-sm text-muted-strong">{scene.line}</p>
      </div>
    </div>
  );
}
