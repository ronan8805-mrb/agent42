import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Company</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          A desk that never asks for Monday off.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Agent 42 Ltd. Dublin. We run the voice, the number, and the brief. You run the work.
        </p>
        <img
          src="/images/city-dusk.jpg"
          alt="City rooftops at dusk"
          className="editorial mt-12 aspect-16/9 w-full rounded-2xl object-cover"
        />
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-medium tracking-tight">What we believe</h2>
            <p className="mt-3 text-muted">
              The front desk is a job. It was never a personality test. Callers deserve an answer. Owners deserve a calm record of what was said. Minutes should cost what they cost.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight">Where we sit</h2>
            <p className="mt-3 text-muted">
              Agent 42 Ltd, Dublin. The product is used in 18 countries. Support is human, during hours, and written when it isn’t.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <Button asChild>
            <Link to="/contact">Write to us</Link>
          </Button>
        </div>
      </main>
    </MarketingShell>
  );
}
