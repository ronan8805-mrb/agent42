import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
import { INDUSTRIES } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { RequireHydrated } from "@/components/require-hydrated";

export const Route = createFileRoute("/trial")({ component: Trial });

function Trial() {
  const start = useAppStore((s) => s.startTrial);
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = start({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      country: String(fd.get("country") ?? "United Kingdom"),
      industry: String(fd.get("industry") ?? "salons"),
      password: String(fd.get("password") ?? ""),
    });
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Trial is live. Your number is on the board.");
    void navigate({ to: "/app" });
  }

  return (
    <MarketingShell>
      <RequireHydrated>
      <main id="content" className="mx-auto max-w-lg px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Trial</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">Twenty-four hours. No card.</h1>
        <p className="mt-3 text-muted">
          We’ll launch a number and put Aoife on the line. You can walk away when the clock runs out.
        </p>
        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <Field id="name" label="Name">
            <Input id="name" name="name" required autoComplete="name" />
          </Field>
          <Field id="email" label="Email">
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Field id="company" label="Company">
            <Input id="company" name="company" required autoComplete="organization" />
          </Field>
          <Field id="country" label="Country">
            <Input id="country" name="country" defaultValue="United Kingdom" required />
          </Field>
          <Field id="industry" label="Industry">
            <select
              id="industry"
              name="industry"
              required
              defaultValue=""
              className="flex h-11 w-full rounded-xl border border-line bg-elevated px-3.5 text-sm shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="" disabled>
                Choose one
              </option>
              {INDUSTRIES.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.title}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </Field>
          <Field id="password" label="Password">
            <Input id="password" name="password" type="password" required minLength={6} autoComplete="new-password" />
          </Field>
          <Button type="submit" className="w-full">
            Start trial
          </Button>
        </form>
      </main>
      </RequireHydrated>
    </MarketingShell>
  );
}
