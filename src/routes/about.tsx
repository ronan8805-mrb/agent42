import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { FloatChips } from "@/components/marketing/float-chips";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <MarketingShell>
      <main id="content">
        <section className="relative overflow-hidden bg-ink px-6 pt-20 pb-16 text-paper">
          <FloatChips />
          <div className="relative mx-auto max-w-content">
            <p className="text-xs font-medium tracking-[0.2em] text-[#F5C518] uppercase">Company</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-6xl">
              A desk that shows up.
              <span className="block text-[#2DD4BF]">Not a gadget you babysit.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-paper/70">
              Agent 42 Ltd. Dublin. We answer phones for people who make money with their hands, not their hold music.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-content px-6 py-16">
          <img src="/images/city-dusk.jpg" alt="City rooftops at dusk" className="editorial aspect-16/9 w-full rounded-2xl object-cover" />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#F5C518] p-8 text-ink">
              <h2 className="text-2xl font-medium tracking-tight">What we believe</h2>
              <p className="mt-3 text-ink/75">
                The front desk is a job. Callers deserve an answer. You deserve a brief, not a voicemail graveyard. Minutes should cost what they cost.
              </p>
            </div>
            <div className="rounded-2xl bg-[#E85D4C] p-8 text-ink">
              <h2 className="text-2xl font-medium tracking-tight">Where we sit</h2>
              <p className="mt-3 text-ink/80">
                Dublin company. Product used far beyond it. Support is a person during hours — and written when it isn’t.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Button className="bg-ink text-paper hover:bg-ink/90" asChild>
              <Link to="/contact">Write to the desk</Link>
            </Button>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}
