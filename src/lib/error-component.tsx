import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message =
    typeof error?.message === "string"
      ? error.message
      : error
        ? String(error)
        : "An unexpected error occurred. Try reloading the page.";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <TriangleAlert className="size-8 text-danger" strokeWidth={1.5} />
      <h1 className="text-xl font-medium tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted">{message}</p>
      <Link
        to="/"
        className="mt-2 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg"
      >
        Back to Agent 42
      </Link>
    </main>
  );
}
