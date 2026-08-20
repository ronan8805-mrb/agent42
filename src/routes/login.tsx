import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
import { DEMO_LOGINS } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { RequireHydrated } from "@/components/require-hydrated";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = login(String(fd.get("email") ?? ""), String(fd.get("password") ?? ""));
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    const user = useAppStore.getState().sessionUser();
    toast.success("Signed in");
    void navigate({ to: user?.role === "admin" ? "/admin" : "/app" });
  }

  function fill(email: string, password: string) {
    const form = document.getElementById("login-form") as HTMLFormElement | null;
    if (!form) return;
    (form.elements.namedItem("email") as HTMLInputElement).value = email;
    (form.elements.namedItem("password") as HTMLInputElement).value = password;
  }

  return (
    <MarketingShell>
      <RequireHydrated>
      <main id="content" className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-medium tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Demo accounts below. This is a local session — nothing leaves the browser.
        </p>
        <form id="login-form" onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field id="email" label="Email">
            <Input id="email" name="email" type="email" required autoComplete="username" />
          </Field>
          <Field id="password" label="Password">
            <Input id="password" name="password" type="password" required autoComplete="current-password" />
          </Field>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted">
          <Link to="/forgot" className="hover:text-foreground">
            Forgot password
          </Link>
          {" · "}
          <Link to="/signup" className="hover:text-foreground">
            Create an account
          </Link>
        </p>
        <div className="mt-10 rounded-2xl border border-line p-4">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Demo accounts</p>
          <ul className="mt-3 space-y-2">
            {DEMO_LOGINS.map((d) => (
              <li key={d.email}>
                <button
                  type="button"
                  onClick={() => fill(d.email, d.password)}
                  className="w-full rounded-xl px-2 py-2 text-left text-sm hover:bg-mist"
                >
                  <span className="block font-medium">{d.label}</span>
                  <span className="text-muted">
                    {d.email} · {d.password}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      </RequireHydrated>
    </MarketingShell>
  );
}
