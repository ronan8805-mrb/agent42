import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useAppStore } from "@/lib/store";

export function applyTheme(theme: "light" | "dark" | "system") {
  if (typeof document === "undefined") return;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("agent42.theme");
  } catch {
    /* ignore */
  }
  const effective = stored === "light" || stored === "dark" ? stored : theme;
  const path = window.location.pathname;
  const prefersApp = path.startsWith("/app") || path.startsWith("/admin");
  const dark = effective === "dark" || (effective === "system" && prefersApp);
  document.documentElement.classList.toggle("dark", dark);
}

export function AppProviders({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void Promise.resolve(useAppStore.persist.rehydrate()).then(() => {
      const s = useAppStore.getState();
      s.setHydrated();
      applyTheme(s.theme);
    });
  }, []);

  useEffect(() => {
    applyTheme(useAppStore.getState().theme);
  }, [pathname]);

  return (
    <>
      {children}
      <Toaster
        theme="system"
        position="bottom-right"
        toastOptions={{
          className:
            "!bg-card !text-card-fg !border-line !shadow-[var(--shadow-float)] !rounded-xl",
        }}
      />
    </>
  );
}
