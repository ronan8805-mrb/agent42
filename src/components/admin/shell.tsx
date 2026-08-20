import { useState } from "react";
import { Link, Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Banknote,
  Inbox,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { useAppStore, useSessionUser } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/usage", label: "Usage", icon: BarChart3 },
  { to: "/admin/revenue", label: "Revenue", icon: Banknote },
  { to: "/admin/tickets", label: "Tickets", icon: Inbox },
] as const;

export function AdminShell() {
  const user = useSessionUser();
  const hydrated = useAppStore((s) => s.hydrated);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted">
        Opening admin…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/app" />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-line bg-card md:flex">
        <div className="flex h-16 items-center px-5">
          <Logo to="/admin" />
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
      </aside>
      <div className="md:pl-56">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-line bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <p className="text-sm text-muted">Admin</p>
          <div className="ml-auto flex items-center">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        {open ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <Logo to="/admin" />
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
            </nav>
          </div>
        ) : null}
        <div id="content" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
