import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { useAppStore, useSessionUser } from "@/lib/store";
import { cn } from "@/lib/utils";

const SHEET_LINKS = [
  ["/how-it-works", "Product"],
  ["/how-it-works", "How it works"],
  ["/pricing", "Pricing"],
  ["/industries", "Industries"],
  ["/about", "About"],
  ["/blog", "Journal"],
  ["/login", "Login"],
] as const;

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useSessionUser();
  const hydrated = useAppStore((s) => s.hydrated);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <Link to="/how-it-works" className={navCls(pathname === "/how-it-works")}>
              Product
            </Link>
            <Link to="/how-it-works" className={navCls(false)}>
              How it works
            </Link>
            <Link to="/pricing" className={navCls(pathname === "/pricing")}>
              Pricing
            </Link>
            <Link
              to="/industries"
              className={navCls(pathname.startsWith("/industries"))}
            >
              Industries
            </Link>
          </nav>
          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {hydrated && user ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/trial">Start free trial</Link>
                </Button>
              </>
            )}
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>
      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-paper text-ink md:hidden dark:bg-ink dark:text-paper"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
                <Logo />
                <button
                  type="button"
                  className="grid size-11 place-items-center rounded-full"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
                {SHEET_LINKS.map(([to, label]) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-3 py-3 text-2xl font-medium tracking-tight hover:bg-mist"
                  >
                    {label}
                  </Link>
                ))}
                <Button className="mt-6 h-12 w-full" asChild>
                  <Link to="/trial" onClick={() => setOpen(false)}>
                    Start free trial
                  </Link>
                </Button>
                <div className="mt-8 flex items-center gap-3 px-3 text-sm text-muted">
                  Theme
                  <ThemeToggle />
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function navCls(active: boolean) {
  return cn(
    "text-muted-strong transition-colors hover:text-foreground",
    active && "text-foreground",
  );
}
