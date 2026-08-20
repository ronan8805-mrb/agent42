import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, LayoutDashboard, Shield } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAppStore, useSessionUser } from "@/lib/store";
import { planLabel } from "@/lib/utils";

export function UserMenu() {
  const user = useSessionUser();
  const hydrated = useAppStore((s) => s.hydrated);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();

  if (!hydrated) {
    return <div className="size-9 animate-pulse rounded-full bg-stone" />;
  }
  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-mist"
          aria-label="Account menu"
        >
          <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-medium text-accent-fg">
            {initials}
          </span>
          <span className="hidden max-w-32 truncate text-sm sm:inline">{user.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="text-foreground">{user.name}</div>
          <div className="font-normal">{user.email}</div>
          <Badge variant="accent" className="mt-2">
            {planLabel(user.plan)}
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link to="/admin">
              <Shield className="size-4" />
              Admin
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/app">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onSelect={() => {
            logout();
            toast.success("Signed out");
            void navigate({ to: "/" });
          }}
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
