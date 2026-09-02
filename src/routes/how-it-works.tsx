import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { PhoneMock } from "@/components/marketing/phone-mock";
import { FloatChips } from "@/components/marketing/float-chips";

export const Route = createFileRoute("/how-it-works")({ component: HowItWorks });

const STEPS = [
  { n: "01", c: "#F5C518", t: "Tell us the shop.", d: "Hours, services, the voice, the one rule you actually enforce. We load a brain, not a script you have to read." },
  { n: "02", c: "#2DD4BF", t: "We switch the line on.", d: "Dedicated number. Your country. Live in minutes. Keep it if you stay." },
  { n: "03", c: "#E85D4C", t: "It books. You get the note.", d: "Calendar, SMS, email. Recording, transcript, one-line brief. You stay on the tools." },
];

export default function HowItWorks() {
  return (
    <MarketingShell>
      <main id="content">
        <section className="relative overflow-hidden bg-ink px-6 pt-20 pb-16 text-paper">
          <FloatChips />
          <div className="relative mx-auto max-w-content">
            <p className="text-xs font-medium tracking-[0.2em] text-[#F5C518] uppercase">Product</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-6xl">
              Live before lunch.
              <span className="block text-[#2DD4BF]">No new phone system.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-paper/70">
              Three steps. Callers think it’s a person at the desk. You know it never clocks out.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr]">
            <ol>
              {STEPS.map((s) => (
                <li key={s.n} className="mb-6 rounded-2xl p-6 text-ink" style={{ background: s.c }}>
                  <span className="text-xs font-medium tracking-[0.16em] uppercase">{s.n}</span>
                  <h2 className="mt-2 text-2xl font-medium tracking-tight">{s.t}</h2>
                  <p className="mt-2 text-ink/70">{s.d}</p>
                </li>
              ))}
            </ol>
            <SampleCall />
          </div>
          <div className="mt-8 rounded-2xl bg-ink p-8 text-paper sm:grid sm:grid-cols-2 sm:gap-8">
            <div>
              <h2 className="text-2xl font-medium tracking-tight">What stays on</h2>
              <ul className="mt-4 space-y-2 text-sm text-paper/70">
                <li>Natural voice. Clone if you want.</li>
                <li>Calendar, SMS, email — actually sent.</li>
                <li>Recordings and transcripts.</li>
                <li>A knowledge base you can edit.</li>
                <li>A human when you say so.</li>
                <li>25+ languages. Any accent.</li>
              </ul>
            </div>
            <img src="/images/calendar.jpg" alt="Open desk calendar" className="editorial mt-6 aspect-4/3 w-full rounded-xl object-cover sm:mt-0" />
          </div>
          <div className="mt-16 text-center">
            <Button size="lg" className="bg-[#F5C518] text-ink hover:bg-[#e0b40f]" asChild>
              <Link to="/trial">Put it on the phone tonight</Link>
            </Button>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}

function SampleCall() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium">A real-shaped call</p>
        <button type="button" onClick={() => setOn((v) => !v)} className="text-xs text-accent hover:underline">
          {on ? "Pause" : "Play"}
        </button>
      </div>
      {on ? <PhoneMock /> : (
        <div className="grid h-80 place-items-center rounded-2xl bg-ink text-sm text-paper/60">Paused. The real one doesn’t.</div>
      )}
    </div>
  );
}
