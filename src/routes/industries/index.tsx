import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { INDUSTRIES } from "@/lib/seed";

export const Route = createFileRoute("/industries/")({ component: Industries });

const SIZES = [
  { id: "all", label: "All sizes" },
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
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Industries</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
          Any desk. Any size.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          A one-chair shop, a three-partner firm, a group with twelve sites. Same receptionist.
          Different hours, manners, and knowledge.
        </p>
        <div className="mt-8 flex flex-wrap gap-1">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSize(s.id)}
              className={
                size === s.id
                  ? "rounded-full bg-foreground px-3 py-1.5 text-xs text-background"
                  : "rounded-full px-3 py-1.5 text-xs text-muted hover:bg-mist"
              }
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {rows.map((ind) => (
            <Link
              key={ind.slug}
              to="/industries/$slug"
              params={{ slug: ind.slug }}
              className="group overflow-hidden rounded-2xl border border-line hover:border-foreground/20"
            >
              <img
                src={ind.image}
                alt=""
                className="editorial aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="p-5">
                <p className="text-xs tracking-wide text-muted uppercase">{SIZE_LABEL[ind.size]}</p>
                <h2 className="mt-1 text-lg font-medium tracking-tight">{ind.title}</h2>
                <p className="mt-1 text-sm text-muted">{ind.line}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-12 max-w-xl text-sm text-muted">
          Not listed? The brief is yours — hours, services, voice, and the odd rule you enforce.
          Extra numbers and several dashboards are an{" "}
          <Link to="/contact" search={{ plan: "enterprise" }} className="text-foreground underline-offset-4 hover:underline">
            Enterprise conversation
          </Link>
          .
        </p>
      </main>
    </MarketingShell>
  );
}
