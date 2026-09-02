import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { PhoneMock } from "@/components/marketing/phone-mock";
import { FloatBits } from "@/components/marketing/float-bits";

export const Route = createFileRoute("/how-it-works")({ component: HowItWorks });

const STEPS = [
  {
    n: "01",
    c: "#F5C518",
    t: "Tell us the shop",
    d: "Hours, prices, the odd rule. We load a brain, not a script you have to read out.",
  },
  {
    n: "02",
    c: "#2DD4BF",
    t: "We switch the number on",
    d: "Dedicated line. Your country. Live the same day. You keep it if you stay.",
  },
  {
    n: "03",
    c: "#E85D4C",
    t: "Work comes in. You get the brief.",
    d: "Booked. Confirmed. Written down. Read it when your hands are free.",
  },
];

export default function HowItWorks() {
  return (
    <MarketingShell>
      <main id="content">
        <section className="relative overflow-hidden bg-ink px-6 pt-16 pb-20 text-paper">
          <FloatBits dark />
          <div className="relative mx-auto max-w-content">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#F5C518] uppercase">How it works</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Three moves. Then the phone earns.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-paper/70">
              No hardware. No new switchboard. Callers hear a person. You hear a summary.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-content px-6 py-16">
          <div className="grid gap-4 lg:grid-cols-3">
            {STEPS.map((s) => (
              <article key={s.n} className="rounded-3xl p-6 text-ink" style={{ background: s.c }}>
                <p className="text-xs font-semibold tracking-widest uppercase">{s.n}</p>
                <h2 className="mt-8 text-2xl font-semibold tracking-tight">{s.t}</h2>
                <p className="mt-3 text-sm text-ink/75">{s.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
            <SampleCall />
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">What stays on</h2>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "A voice. Optional clone.",
                  "Calendar, SMS, email.",
                  "Recordings and a one-line brief.",
                  "A knowledge base you can edit.",
                  "A human if it needs a human.",
                  "25+ languages. Any accent.",
                ].map((x) => (
                  <li key={x} className="rounded-2xl bg-stone px-4 py-3 font-medium">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-[#E85D4C] px-6 py-12 text-center text-paper">
            <h2 className="text-3xl font-semibold tracking-tight">Try it for a night.</h2>
            <p className="mx-auto mt-3 max-w-md text-paper/85">No card. If it’s rubbish, walk.</p>
            <Button size="lg" className="mt-6 bg-ink text-paper hover:bg-ink/90" asChild>
              <Link to="/trial">Start the free trial</Link>
            </Button>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

function SampleCall() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold">A real call, looping</p>
        <button type="button" onClick={() => setOn((v) => !v)} className="text-sm font-medium text-accent hover:underline">
          {on ? "Pause" : "Play"}
        </button>
      </div>
      {on ? (
        <PhoneMock />
      ) : (
        <div className="grid h-80 place-items-center rounded-2xl bg-ink text-sm text-paper/70">Paused. The line isn’t.</div>
      )}
    </div>
  );
}
