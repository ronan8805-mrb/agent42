import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/lib/seed";

export const Route = createFileRoute("/industries/$slug")({
  component: Industry,
  loader: ({ params }) => {
    const ind = INDUSTRIES.find((i) => i.slug === params.slug);
    if (!ind) throw notFound();
    return ind;
  },
});

const SIZE_LABEL = { small: "Small", medium: "Medium", large: "Large" } as const;

function Industry() {
  const ind = Route.useLoaderData();
  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug).slice(0, 3);
  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          <Link to="/industries" className="hover:text-foreground">
            Industries
          </Link>
          {" · "}
          {SIZE_LABEL[ind.size]}
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
          {ind.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{ind.line}</p>
        <img
          src={ind.image}
          alt=""
          className="editorial mt-10 aspect-video w-full rounded-2xl object-cover"
        />
        <section className="mt-14 max-w-2xl">
          <h2 className="text-xl font-medium tracking-tight">A day on the line</h2>
          <p className="mt-3 text-muted">{ind.story}</p>
        </section>
        <section className="mt-10 max-w-2xl">
          <h2 className="text-xl font-medium tracking-tight">Sample prompt excerpt</h2>
          <pre className="mt-3 overflow-x-auto rounded-2xl border border-line bg-mist p-5 font-sans text-sm leading-relaxed text-muted-strong whitespace-pre-wrap">
            {ind.prompt}
          </pre>
        </section>
        <div className="mt-12">
          <Button size="lg" asChild>
            <Link to="/trial">Start 24-hour free trial</Link>
          </Button>
        </div>
        <section className="mt-16">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Also on the board</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: o.slug }}
                  className="block rounded-2xl border border-line p-4 hover:border-foreground/20"
                >
                  <p className="text-xs text-muted">{SIZE_LABEL[o.size]}</p>
                  <p className="mt-1 font-medium">{o.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </MarketingShell>
  );
}
