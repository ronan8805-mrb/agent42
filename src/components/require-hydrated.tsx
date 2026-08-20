import type { ReactNode } from "react";
import { useAppStore } from "@/lib/store";

export function RequireHydrated({ children }: { children: ReactNode }) {
  const hydrated = useAppStore((s) => s.hydrated);
  if (!hydrated) {
    return (
      <div className="grid min-h-64 place-items-center text-sm text-muted">
        Loading…
      </div>
    );
  }
  return children;
}
