import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { PhoneMock } from "@/components/marketing/phone-mock";

export const Route = createFileRoute("/how-it-works")({ component: HowItWorks });

const STEPS = [
  {
    n: "01",
    t: "Tell us the business",
    d: "A short brief: hours, services, voice, and the rules you actually enforce. We load a knowledge base, not a script you have to read.",
  },
  {
    n: "02",
    t: "We launch the number in minutes",
    d: "A dedicated virtual number, in your country, on your letterhead. The same line stays with you if you keep the service.",
  },
  {
    n: "03",
    t: "Calls get booked and written up",
    d: "Appointments land in the calendar. Confirmations go out by SMS and email. You get the recording, the transcript, and a one-line brief.",
  },
];

export default function HowItWorks() {
  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Product</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
          A receptionist, launched before lunch.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Three steps. No hardware. No new phone system. Your callers never know it wasn’t a person at the desk.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.9fr]">
          <ol className="relative space-y-0">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative grid grid-cols-[56px_1fr] gap-6 pb-14">
                {i < STEPS.length - 1 ? (
                  <span className="absolute top-8 bottom-0 left-[11px] w-px bg-line" />
                ) : null}
                <span className="relative z-10 tabular text-sm text-muted">{s.n}</span>
                <div>
                  <h2 className="text-xl font-medium tracking-tight">{s.t}</h2>
                  <p className="mt-2 text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <SampleCall />
        </div>

        <div className="mt-8 grid gap-8 rounded-2xl border border-line p-8 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-medium tracking-tight">What stays on</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Natural voice, with optional cloning</li>
              <li>Calendar booking and confirmations</li>
              <li>Recordings and transcripts</li>
              <li>Knowledge base you can edit</li>
              <li>Human hand-off</li>
              <li>25+ languages, any accent</li>
            </ul>
          </div>
          <img
            src="/images/calendar.jpg"
            alt="Open desk calendar"
            className="editorial aspect-4/3 w-full rounded-xl object-cover"
          />
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <Link to="/trial">Start 24-hour free trial</Link>
          </Button>
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
        <p className="text-sm font-medium">Sample call</p>
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          className="text-xs text-accent hover:underline"
        >
          {on ? "Pause replay" : "Replay"}
        </button>
      </div>
      {on ? <PhoneMock /> : (
        <div className="grid h-80 place-items-center rounded-2xl border border-line text-sm text-muted">
          Replay paused
        </div>
      )}
    </div>
  );
}
