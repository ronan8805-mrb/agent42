import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
import { useAppStore } from "@/lib/store";
import { RequireHydrated } from "@/components/require-hydrated";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const start = useAppStore((s) => s.startTrial);
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = start({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      country: "United Kingdom",
      industry: "other",
      password: String(fd.get("password") ?? ""),
    });
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Account created. Your 24-hour trial is on.");
    void navigate({ to: "/app" });
  }

  return (
    <MarketingShell>
      <RequireHydrated>
      <main id="content" className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-medium tracking-tight">Create an account</h1>
        <p className="mt-2 text-sm text-muted">
          New accounts start on a 24-hour trial. No card.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field id="name" label="Name">
            <Input id="name" name="name" required autoComplete="name" />
          </Field>
          <Field id="email" label="Email">
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Field id="company" label="Company">
            <Input id="company" name="company" required />
          </Field>
          <Field id="password" label="Password">
            <Input id="password" name="password" type="password" required minLength={6} autoComplete="new-password" />
          </Field>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted">
          Already have one?{" "}
          <Link to="/login" className="text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </main>
      </RequireHydrated>
    </MarketingShell>
  );
}
