import { Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";

export function NotFoundPage() {
  return (
    <MarketingShell>
      <main
        id="content"
        className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-6 py-24 text-center"
      >
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">404</p>
        <h1 className="mt-4 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
          That page isn’t on the board.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The number you dialled doesn’t exist. Try the homepage, or start a trial and we’ll pick up.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg hover:bg-accent-hover"
          >
            Home
          </Link>
          <Link
            to="/trial"
            className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium hover:bg-mist"
          >
            Start free trial
          </Link>
        </div>
      </main>
    </MarketingShell>
  );
}
