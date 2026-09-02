import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { FloatChips } from "@/components/marketing/float-chips";
import { INDUSTRIES } from "@/lib/seed";

export const Route = createFileRoute("/industries/")({ component: Industries });

const SIZES = [
  { id: "all", label: "All desks" },
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
] as const;

const SIZE_LABEL: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

function Industries() {
  const [size, setSize] = useState<(typeof SIZES)[number]["id"]>("all");
  const rows = INDUSTRIES.filter((i) => (size === "all" ? true : i.size === size));

  return (
    <MarketingShell>
      <main id="content">
        <section className="relative overflow-hidden bg-[#0F766E] px-6 pt-20 pb-16 text-paper">
          <FloatChips />
          <div className="relative mx-auto max-w-content">
            <p className="text-xs font-medium tracking-[0.2em] text-[#F5C518] uppercase">Industries</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-6xl">
              If the phone makes you money,
              <span className="block">this is for you.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-paper/80">
              One chair or twelve sites. Same receptionist. Different hours and manners.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-content px-6 py-12">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                className={
                  size === s.id
                    ? "rounded-full bg-ink px-4 py-2 text-xs text-[#F5C518]"
                    : "rounded-full bg-mist px-4 py-2 text-xs text-muted hover:bg-stone"
                }
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {rows.map((ind) => (
              <Link
                key={ind.slug}
                to="/industries/$slug"
                params={{ slug: ind.slug }}
                className="group overflow-hidden rounded-2xl bg-ink text-paper"
              >
                <img src={ind.image} alt="" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="p-5">
                  <p className="text-xs tracking-wide text-[#F5C518] uppercase">{SIZE_LABEL[ind.size]}</p>
                  <h2 className="mt-1 text-lg font-medium tracking-tight">{ind.title}</h2>
                  <p className="mt-1 text-sm text-paper/65">{ind.line}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-12 max-w-xl text-sm text-muted">
            Not listed? Fine. The brief is yours.{" "}
            <Link to="/contact" search={{ plan: "enterprise" }} className="text-foreground underline-offset-4 hover:underline">
              Talk Enterprise
            </Link>
            .
          </p>
        </div>
      </main>
    </MarketingShell>
  );
}
