import { useState } from "react";
import { Link, Navigate, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Phone,
  Calendar,
  Bot,
  Hash,
  Receipt,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { TrialBanner } from "@/components/app/trial-banner";
import { useAppStore, useSessionUser } from "@/lib/store";
import { cn, planLabel } from "@/lib/utils";
import { toast } from "sonner";

const NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/calls", label: "Calls", icon: Phone },
  { to: "/app/bookings", label: "Bookings", icon: Calendar },
  { to: "/app/agent", label: "Agent", icon: Bot },
  { to: "/app/numbers", label: "Numbers", icon: Hash },
  { to: "/app/billing", label: "Billing", icon: Receipt },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const user = useSessionUser();
  const hydrated = useAppStore((s) => s.hydrated);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted">
        Opening the desk…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" />;
  if (user.role === "admin") return <Navigate to="/admin" />;

  const paused = user.paused;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-line bg-card md:flex">
        <div className="flex h-16 items-center px-5">
          <Logo to="/app" />
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {NAV.map((item) => {
            const exact = "exact" in item && item.exact;
            const active = exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-strong hover:bg-mist hover:text-foreground",
                  active && "bg-mist text-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-4 text-xs text-muted">
          <p className="truncate font-medium text-foreground">{user.company}</p>
          <p className="mt-0.5">{planLabel(user.plan)}</p>
        </div>
      </aside>

      <div className="md:pl-56">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <p className="hidden text-sm text-muted md:block">{user.company}</p>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        {open ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <Logo to="/app" />
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-4 pt-6">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-xl font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="mt-6 flex items-center gap-2 px-3 py-3 text-left text-muted"
                onClick={() => {
                  logout();
                  toast.success("Signed out");
                  void navigate({ to: "/" });
                }}
              >
                <LogOut className="size-4" /> Log out
              </button>
            </nav>
          </div>
        ) : null}

        <div id="content" className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
          {paused ? (
            <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm">
              Agent paused — update billing.
            </div>
          ) : null}
          <TrialBanner user={user} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
