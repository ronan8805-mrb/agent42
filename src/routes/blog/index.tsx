import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { BLOG } from "@/lib/seed";

export const Route = createFileRoute("/blog/")({ component: BlogIndex });

function BlogIndex() {
  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Journal</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
          Notes from the desk.
        </h1>
        <div className="mt-14 grid gap-8">
          {BLOG.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group grid gap-6 border-b border-line pb-8 sm:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <p className="text-xs text-muted">
                  {p.date} · {p.read}
                </p>
                <h2 className="mt-2 text-2xl font-medium tracking-tight group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-2 text-muted">{p.dek}</p>
              </div>
              <img
                src={p.image}
                alt=""
                className="editorial aspect-16/9 w-full rounded-xl object-cover"
              />
            </Link>
          ))}
        </div>
      </main>
    </MarketingShell>
  );
}
