import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { BLOG } from "@/lib/seed";

export const Route = createFileRoute("/blog/$slug")({
  component: Post,
  loader: ({ params }) => {
    const post = BLOG.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
});

function Post() {
  const post = Route.useLoaderData();
  return (
    <MarketingShell>
      <article id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          <Link to="/blog" className="hover:text-foreground">
            Journal
          </Link>
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {post.date} · {post.read}
        </p>
        <img
          src={post.image}
          alt=""
          className="editorial mt-10 aspect-16/9 w-full rounded-2xl object-cover"
        />
        <div className="mt-12 max-w-2xl space-y-5 text-muted-strong">
          {post.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
