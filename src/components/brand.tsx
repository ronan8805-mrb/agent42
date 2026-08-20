import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Mark({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <span
      className={cn(
        "grid size-7 place-items-center rounded-md text-[11px] font-semibold tracking-tight",
        invert ? "bg-paper text-ink" : "bg-ink text-paper dark:bg-paper dark:text-ink",
        className,
      )}
    >
      42
    </span>
  );
}

export function Logo({
  className,
  to = "/",
  invert,
}: {
  className?: string;
  to?: "/app" | "/admin" | "/";
  invert?: boolean;
}) {
  return (
    <Link to={to} className={cn("inline-flex items-center gap-2.5 font-medium tracking-tight", className)}>
      <Mark invert={invert} />
      <span>Agent 42</span>
    </Link>
  );
}
