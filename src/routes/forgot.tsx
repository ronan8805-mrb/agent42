import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";

export const Route = createFileRoute("/forgot")({ component: Forgot });

function Forgot() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Check your inbox — a reset link is on its way.");
  }

  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-medium tracking-tight">Reset password</h1>
        <p className="mt-2 text-sm text-muted">
          Enter the email on the account. We’ll pretend to send a link.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field id="email" label="Email">
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Button type="submit" className="w-full">
            Send reset
          </Button>
        </form>
        <p className="mt-4 text-sm">
          <Link to="/login" className="text-muted hover:text-foreground">
            Back to sign in
          </Link>
        </p>
      </main>
    </MarketingShell>
  );
}
