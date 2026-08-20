import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MINUTE_RATE } from "@/lib/seed";
import { formatEuro } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/pricing")({ component: Pricing });

const FAQS = [
  {
    q: "How does the 24-hour trial work?",
    a: "No card. We launch a number, load a first brief, and put a receptionist on the line. After 24 hours the trial ends unless you choose Starter or Pro.",
  },
  {
    q: "What do minutes cost?",
    a: "€0.06 per minute, billed as a transparent pass-through on top of the monthly service fee. Most businesses use 200–700 minutes a month.",
  },
  {
    q: "Can I have more than one number?",
    a: "Starter and Pro include one dedicated number. Extra numbers are an Enterprise conversation — tell us what you need.",
  },
  {
    q: "Can it speak in my accent?",
    a: "Yes. We launch with a natural voice in the accent you choose. A custom clone is a €99 one-time extra.",
  },
  {
    q: "How do I cancel?",
    a: "From billing, at any time. The number can port if you ask. There is no annual lock-in.",
  },
  {
    q: "What happens to the recordings?",
    a: "Calls are stored on your dashboard (Pro and Enterprise). You can export or delete them. We do not train public models on your calls.",
  },
];

function Pricing() {
  const [minutes, setMinutes] = useState(400);
  const addToCart = useAppStore((s) => s.addToCart);

  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Pricing</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
          A service fee. Minutes on top.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Monthly only. No seat maths. The receptionist is the plan; the line is usage.
        </p>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <PlanCard
            name="Starter"
            price={99}
            items={[
              "1 dedicated number",
              "Basic SMS + email summaries",
              "No full dashboard",
              "Natural voice",
            ]}
            cta="Start trial"
            to="/trial"
          />
          <PlanCard
            name="Pro"
            price={149}
            featured
            items={[
              "1 dedicated number",
              "Full branded dashboard",
              "Recordings and transcripts",
              "Calendar booking",
              "Knowledge base + hand-off",
            ]}
            cta="Start trial"
            secondary="Checkout"
            onSecondary={() => {
              addToCart("plan-pro");
            }}
          />
          <div className="flex flex-col rounded-2xl border border-line p-6">
            <p className="text-sm font-medium">Enterprise</p>
            <p className="mt-4 text-3xl font-medium tracking-tight">Custom</p>
            <p className="mt-2 text-sm text-muted">
              Multiple numbers, multiple dashboards, priority support, advanced integrations.
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
              <li>More than one number</li>
              <li>Several locations</li>
              <li>Named onboarding</li>
            </ul>
            <Button variant="outline" className="mt-8 w-full" asChild>
              <Link to="/contact" search={{ plan: "enterprise" }}>
                Contact
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-mist/50 p-6 sm:p-8">
          <p className="font-medium">Minutes are extra at {formatEuro(MINUTE_RATE)}.</p>
          <p className="mt-1 text-sm text-muted">
            Most businesses use 200–700 min/month. Drag the slider to see a typical month.
          </p>
          <div className="mt-6">
            <div className="mb-3 flex items-baseline justify-between">
              <label htmlFor="minutes" className="text-sm">
                Estimated minutes
              </label>
              <span className="tabular text-sm font-medium">{minutes} min</span>
            </div>
            <Slider
              id="minutes"
              min={50}
              max={1200}
              step={10}
              value={[minutes]}
              onValueChange={(v) => setMinutes(v[0] ?? 400)}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Est name="Starter" fee={99} minutes={minutes} />
              <Est name="Pro" fee={149} minutes={minutes} />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-line p-6">
          <p className="font-medium">Need more than one number or multiple locations?</p>
          <p className="mt-1 text-sm text-muted">
            Tell us what you need. Extra numbers are not a cart add-on.
          </p>
          <Button variant="link" className="mt-2 px-0" asChild>
            <Link to="/contact" search={{ plan: "enterprise" }}>
              Talk to us about Enterprise
            </Link>
          </Button>
        </div>

        <h2 className="mt-20 text-2xl font-medium tracking-tight">Questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </MarketingShell>
  );
}

function PlanCard({
  name,
  price,
  items,
  cta,
  to,
  featured,
  secondary,
  onSecondary,
}: {
  name: string;
  price: number;
  items: string[];
  cta: string;
  to?: string;
  featured?: boolean;
  secondary?: string;
  onSecondary?: () => void;
}) {
  return (
    <div
      className={
        featured
          ? "relative flex flex-col rounded-2xl border-2 border-accent p-6"
          : "flex flex-col rounded-2xl border border-line p-6"
      }
    >
      {featured ? (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent-fg uppercase">
          Bestseller
        </span>
      ) : null}
      <p className="text-sm font-medium">{name}</p>
      <p className="mt-4 tabular text-3xl font-medium tracking-tight">
        {formatEuro(price)}
        <span className="text-base font-normal text-muted">/mo</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div className="mt-8 space-y-2">
        <Button className="w-full" asChild>
          <Link to={to ?? "/trial"}>{cta}</Link>
        </Button>
        {secondary ? (
          <Button variant="outline" className="w-full" asChild>
            <Link to="/checkout" onClick={onSecondary}>
              {secondary}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function Est({ name, fee, minutes }: { name: string; fee: number; minutes: number }) {
  const extra = minutes * MINUTE_RATE;
  return (
    <div className="rounded-xl bg-background p-4">
      <p className="text-sm text-muted">{name}</p>
      <p className="tabular text-2xl font-medium tracking-tight">
        {formatEuro(fee + extra)}
        <span className="text-sm font-normal text-muted"> /mo</span>
      </p>
      <p className="mt-1 text-xs text-muted">
        {formatEuro(fee)} service + {formatEuro(extra)} minutes
      </p>
    </div>
  );
}
