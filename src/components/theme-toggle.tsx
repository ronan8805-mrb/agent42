import { Moon, Sun } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { applyTheme } from "@/components/providers";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const dark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const isDark = theme === "dark" || (theme === "system" && dark);

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={
        className ??
        "grid size-11 place-items-center rounded-full text-foreground hover:bg-mist"
      }
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
      }}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
