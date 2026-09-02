import { useEffect, useState } from "react";

const SCENES = [
  { id: "hello", line: "Hello — Northlight, how can I help?", lang: "English", tag: "Picking up" },
  { id: "gaeilge", line: "Dia dhuit — tá Déardaoin saor.", lang: "Gaeilge", tag: "Booking" },
  { id: "feet", line: "Bonjour — je note ça tout de suite.", lang: "Français", tag: "Feet up. Still working." },
  { id: "five", line: "Hola — cinco líneas, ningún problema.", lang: "Español", tag: "Five calls at once" },
  { id: "notes", line: "Guten Tag — steht schon im Kalender.", lang: "Deutsch", tag: "Writing it down" },
  { id: "mail", line: "Ciao — ti mando la mail adesso.", lang: "Italiano", tag: "Emailing while talking" },
  { id: "spin", line: "Hej — det blir ett nöje.", lang: "Svenska", tag: "Enjoying the job" },
] as const;

export function ReceptionistLoop() {
  const [i, setI] = useState(0);
  const scene = SCENES[i];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SCENES.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-[28px] bg-[#F5C518] shadow-[0_24px_60px_-20px_rgba(245,197,24,0.55)]">
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-[#F5C518] uppercase">
            {scene.tag}
          </span>
          <span className="text-[11px] font-medium tracking-wide text-ink/70 uppercase">{scene.lang}</span>
        </div>
        <svg viewBox="0 0 420 300" className={`desk-stage block w-full pose-${scene.id}`} role="img" aria-label={scene.line}>
          <rect x="0" y="230" width="420" height="70" fill="#0F766E" />
          <rect x="24" y="214" width="372" height="22" rx="4" fill="#0A0A0B" />
          <g className="chair-spin" style={{ transformOrigin: "210px 200px" }}>
            <ellipse cx="210" cy="226" rx="48" ry="11" fill="#0A0A0B" opacity="0.35" />
            <rect x="186" y="168" width="48" height="58" rx="12" fill="#E85D4C" />
            <rect x="172" y="148" width="76" height="38" rx="14" fill="#C2473A" />
            <path className="leg-l" d="M198 224 L168 248" stroke="#0A0A0B" strokeWidth="8" strokeLinecap="round" />
            <path className="leg-r" d="M222 224 L262 248" stroke="#0A0A0B" strokeWidth="8" strokeLinecap="round" />
            <path d="M186 176 L148 196" stroke="#0A0A0B" strokeWidth="8" strokeLinecap="round" />
            <path d="M234 176 L278 188" stroke="#0A0A0B" strokeWidth="8" strokeLinecap="round" />
            <g transform="translate(176 86)">
              <rect width="68" height="58" rx="12" fill="#0A0A0B" />
              <rect x="7" y="8" width="54" height="34" rx="6" fill="#F7F4EF" />
              <circle cx="22" cy="24" r="4" fill="#0A0A0B" />
              <circle cx="46" cy="24" r="4" fill="#0A0A0B" />
              <rect x="24" y="32" width="20" height="3" rx="1.5" fill="#0F766E" />
              <text x="34" y="54" textAnchor="middle" fontSize="11" fontFamily="Geist, Inter, sans-serif" fontWeight="700" fill="#F5C518">42</text>
            </g>
            <g>
              <g transform="translate(268 174)">
                <rect width="26" height="40" rx="6" fill="#0A0A0B" />
                <rect x="4" y="6" width="18" height="20" rx="3" fill="#F7F4EF" />
                <rect x="9" y="28" width="8" height="6" rx="2" fill="#F5C518" />
              </g>
              <g className="phone-extra" opacity="0">
                <rect x="118" y="168" width="18" height="30" rx="5" fill="#E85D4C" />
                <rect x="140" y="156" width="18" height="30" rx="5" fill="#0F766E" />
                <rect x="298" y="156" width="18" height="30" rx="5" fill="#0A0A0B" />
                <rect x="320" y="170" width="18" height="30" rx="5" fill="#F7F4EF" stroke="#0A0A0B" />
              </g>
            </g>
            <g className="note" opacity="0" transform="translate(286 210)">
              <rect width="56" height="32" rx="4" fill="#F7F4EF" />
              <path d="M8 10 H44 M8 17 H38 M8 24 H30" stroke="#0F766E" strokeWidth="2" />
            </g>
            <g className="keyboard" opacity="0" transform="translate(248 218)">
              <rect width="86" height="18" rx="4" fill="#0A0A0B" />
              <rect x="8" y="6" width="70" height="6" rx="2" fill="#F5C518" />
            </g>
          </g>
        </svg>
        <div className="bg-ink px-5 py-4 text-paper">
          <p className="text-base font-medium tracking-tight">{scene.line}</p>
          <p className="mt-1 text-xs tracking-[0.16em] text-[#F5C518] uppercase">Live · never off the clock</p>
        </div>
      </div>
    </div>
  );
}
