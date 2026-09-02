import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MarketingShell } from "@/components/marketing/shell";
import { ReceptionistLoop } from "@/components/marketing/receptionist-loop";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/lib/seed";

export const Route = createFileRoute("/")({ component: Home });

const TICKER = ["Hello", "Dia dhuit", "Bonjour", "Hola", "Ciao", "Guten Tag", "Hej", "Olá", "Cześć", "Namaste"];

function Home() {
  return (
    <MarketingShell>
      <main id="content">
        <section className="bg-ink text-paper">
          <div className="overflow-hidden border-b border-paper/10">
            <div className="flex animate-[ticker_22s_linear_infinite] gap-10 whitespace-nowrap py-3 text-xs font-medium tracking-[0.18em] text-[#F5C518] uppercase">
              {[...TICKER, ...TICKER, ...TICKER].map((w, i) => (
                <span key={i}>{w} · never sleeps</span>
              ))}
            </div>
          </div>
          <div className="mx-auto grid max-w-content items-center gap-12 px-6 pt-14 pb-16 lg:grid-cols-2 lg:pt-20">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#F5C518] uppercase">Agent 42</p>
              <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
                Missed calls leave.
                <span className="block text-[#2DD4BF]">We don’t.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-paper/70">
                It answers in 25 languages, books the job, and texts you the brief.
                Open at 3am. No sick days. No “sorry I was on the roof.”
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="bg-[#F5C518] text-ink hover:bg-[#e0b40f]" asChild>
                  <Link to="/trial">Put it on the phone tonight</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-paper/30 text-paper hover:bg-paper/10" asChild>
                  <Link to="/how-it-works">See a call</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-paper/50">24-hour trial. No card.</p>
            </div>
            <ReceptionistLoop />
          </div>
          <div className="grid md:grid-cols-3">
            <Punch c="#F5C518" k="01" t="They rang. You were on a roof." d="Voicemail doesn’t book work. We pick up." />
            <Punch c="#2DD4BF" k="02" t="Thursday at two. Done." d="Calendar, SMS, email. While you’re still on the tools." />
            <Punch c="#E85D4C" k="03" t="You get the brief. Keep working." d="Every call written up. Read it walking to the van." />
          </div>
        </section>

        <section className="mx-auto max-w-content px-6 py-20">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">The deal</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight">
            A person on the phone costs a salary. This costs a night out.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Deal k="€99" t="Starter" d="One number. SMS and email summaries." />
            <Deal k="€149" t="Pro" d="The dashboard. Most desks pick this." hot />
            <Deal k="Custom" t="Bigger" d="More lines, more sites, your rules." />
          </div>
          <p className="mt-6 text-sm text-muted">
            Minutes extra. From about 9–10c once we pick up.{" "}
            <Link to="/pricing" className="text-foreground underline-offset-4 hover:underline">
              Full prices
            </Link>
          </p>
        </section>

        <section className="bg-[#0F766E] text-paper">
          <div className="mx-auto max-w-content px-6 py-16">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Built for desks that actually ring.
            </h2>
            <p className="mt-3 max-w-lg text-paper/75">
              Salons. Trades. Clinics. Garages. Restaurants. Gyms. If the phone makes you money and you can’t sit next to it — that’s us.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {INDUSTRIES.map((ind) => (
                <Link
                  key={ind.slug}
                  to="/industries/$slug"
                  params={{ slug: ind.slug }}
                  className="rounded-2xl bg-ink/25 p-4 text-paper hover:bg-ink/40"
                >
                  <p className="text-[11px] tracking-wide text-[#F5C518] uppercase">{ind.size}</p>
                  <p className="mt-1 font-medium">{ind.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-content px-6 py-20 text-center">
          <h2 className="text-4xl font-medium tracking-tight">
            Stop letting the phone ring out.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Twenty-four hours. If it’s not right, walk away. If it is, keep the number.
          </p>
          <Button size="lg" className="mt-8 bg-[#E85D4C] text-paper hover:bg-[#c2473a]" asChild>
            <Link to="/trial">Start the free night shift</Link>
          </Button>
        </section>
      </main>
    </MarketingShell>
  );
}

function Punch({ c, k, t, d }: { c: string; k: string; t: string; d: string }) {
  return (
    <div className="px-6 py-8 text-ink" style={{ background: c }}>
      <p className="text-xs font-medium tracking-[0.16em] uppercase">{k}</p>
      <h3 className="mt-4 text-2xl font-medium tracking-tight">{t}</h3>
      <p className="mt-2 text-sm text-ink/70">{d}</p>
    </div>
  );
}

function Deal({ k, t, d, hot }: { k: string; t: string; d: string; hot?: boolean }) {
  return (
    <div className={hot ? "rounded-2xl bg-ink p-6 text-paper" : "rounded-2xl border border-line p-6"}>
      <p className="text-xs tracking-[0.16em] uppercase text-muted">{t}</p>
      <p className="mt-3 tabular text-3xl font-medium tracking-tight">{k}</p>
      <p className="mt-2 text-sm opacity-75">{d}</p>
    </div>
  );
}
