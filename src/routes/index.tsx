import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MarketingShell } from "@/components/marketing/shell";
import { ReceptionistLoop } from "@/components/marketing/receptionist-loop";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/lib/seed";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <MarketingShell>
      <main id="content">
        <section className="mx-auto grid max-w-content items-center gap-16 px-6 pt-16 pb-20 lg:grid-cols-2 lg:pt-24">
          <div className="rise-in">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Agent 42
            </p>
            <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              The receptionist that never sleeps.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              A managed AI on your line. It picks up in twenty-five languages,
              books the work, and writes it down — even with both feet on the desk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/trial">Start 24-hour free trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">See how it works</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">No card. Live in minutes.</p>
          </div>
          <div className="rise-in stagger-2">
            <ReceptionistLoop />
          </div>
        </section>

        <section className="border-y border-line bg-mist/60">
          <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm text-muted-strong">
              From a one-chair shop to a group with twelve sites.
            </p>
            <div className="grid grid-cols-3 gap-8 text-left">
              <Metric n="24/7" l="Coverage" />
              <Metric n="25+" l="Languages" />
              <Metric n="€0.06" l="Per minute" />
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-content px-6 py-24">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            What it does
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
            Answers. Books. Briefs you.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <Feature
              k="01"
              t="Answers"
              d="A natural voice on your dedicated number. Any accent. Any hour. Human hand-off when you want it."
            />
            <Feature
              k="02"
              t="Books"
              d="Calendar, SMS, and email confirmations. The diary fills while you stay on the tools."
            />
            <Feature
              k="03"
              t="Briefs you"
              d="Every call is recorded, transcribed, and summarised. Read it on the walk to the kettle."
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-content items-center gap-12 px-6 pb-24 lg:grid-cols-2">
          <img
            src="/images/alcove.jpg"
            alt="A quiet telephone alcove in warm dusk light"
            className="editorial aspect-4/3 w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              How it works
            </p>
            <ol className="mt-6 space-y-6">
              {[
                ["Tell us the business", "Hours, services, voice, and the odd rule you care about."],
                ["We launch the number", "A dedicated line, live in minutes. Yours to keep."],
                ["Calls get booked and written up", "Confirmations go out. You get the brief."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="tabular text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium">{t}</p>
                    <p className="text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Button variant="link" className="mt-6 px-0" asChild>
              <Link to="/how-it-works">
                The full story <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-content px-6 pb-8 pt-4">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Who it’s for</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight">Small, medium, and large.</h2>
            </div>
            <Link to="/industries" className="hidden text-sm text-accent hover:underline sm:inline">
              All examples
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                to="/industries/$slug"
                params={{ slug: ind.slug }}
                className="rounded-2xl border border-line bg-background p-4 hover:border-foreground/20"
              >
                <p className="text-[11px] tracking-wide text-muted uppercase">{ind.size}</p>
                <p className="mt-1 font-medium">{ind.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-mist/40">
          <div className="mx-auto max-w-content px-6 py-20">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl font-medium tracking-tight">Two plans. Minutes extra.</h2>
              <Link to="/pricing" className="hidden text-sm text-accent hover:underline sm:inline">
                See pricing
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <PlanTeaser
                name="Starter"
                price="€99"
                line="One number. SMS and email summaries. No full dashboard."
              />
              <PlanTeaser
                name="Pro"
                price="€149"
                line="One number plus the branded dashboard. The one most desks choose."
                featured
              />
            </div>
            <p className="mt-6 text-sm text-muted">
              Need more than one number or multiple locations?{" "}
              <Link
                to="/contact"
                search={{ plan: "enterprise" }}
                className="text-foreground underline-offset-4 hover:underline"
              >
                Tell us what you need.
              </Link>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-content px-6 py-24 text-center">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Put someone on the line tonight.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Twenty-four hours. No card. If it isn’t right, you walk away.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link to="/trial">Start 24-hour free trial</Link>
          </Button>
        </section>
      </main>
    </MarketingShell>
  );
}

function Metric({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="tabular text-xl font-medium tracking-tight">{n}</div>
      <div className="text-xs text-muted">{l}</div>
    </div>
  );
}

function Feature({ k, t, d }: { k: string; t: string; d: string }) {
  return (
    <div className="bg-background p-8">
      <p className="tabular text-xs text-muted">{k}</p>
      <h3 className="mt-6 text-xl font-medium tracking-tight">{t}</h3>
      <p className="mt-2 text-sm text-muted">{d}</p>
    </div>
  );
}

function PlanTeaser({
  name,
  price,
  line,
  featured,
}: {
  name: string;
  price: string;
  line: string;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "rounded-2xl border border-accent/40 bg-background p-6"
          : "rounded-2xl border border-line bg-background p-6"
      }
    >
      <div className="flex items-baseline justify-between">
        <p className="font-medium">{name}</p>
        {featured ? (
          <span className="text-xs tracking-wide text-accent uppercase">Bestseller</span>
        ) : null}
      </div>
      <p className="mt-4 tabular text-3xl font-medium tracking-tight">
        {price}
        <span className="text-base font-normal text-muted">/mo</span>
      </p>
      <p className="mt-2 text-sm text-muted">{line}</p>
    </div>
  );
}
