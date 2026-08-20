import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Field } from "@/components/field";
import { useAppStore } from "@/lib/store";
import { RequireHydrated } from "@/components/require-hydrated";

type Search = { plan?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    plan: typeof s.plan === "string" ? s.plan : undefined,
  }),
  component: Contact,
});

function Contact() {
  const { plan } = Route.useSearch();
  const send = useAppStore((s) => s.sendMessage);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    send({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      plan: String(fd.get("plan") ?? plan ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    toast.success("Message received. We’ll write back.");
    setDone(true);
  }

  return (
    <MarketingShell>
      <RequireHydrated>
      <main id="content" className="mx-auto max-w-content px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Contact</p>
        <h1 className="mt-3 max-w-xl text-4xl font-medium tracking-tight">
          {plan === "enterprise" ? "Tell us what you need." : "Write to the desk."}
        </h1>
        <p className="mt-4 max-w-lg text-muted">
          {plan === "enterprise"
            ? "Multiple numbers, several locations, a named onboarding. Send a short note — we reply in a working day."
            : "Sales, support, or a quiet question. We read everything."}
        </p>
        {done ? (
          <p className="mt-10 max-w-md rounded-2xl border border-line bg-mist p-6 text-sm">
            Thank you. It’s on the board. If you asked about Enterprise, we’ll come back with a conversation, not a cart.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 max-w-lg space-y-4">
            <Field id="name" label="Name">
              <Input id="name" name="name" required autoComplete="name" />
            </Field>
            <Field id="email" label="Email">
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </Field>
            <Field id="company" label="Company">
              <Input id="company" name="company" autoComplete="organization" />
            </Field>
            <Field id="plan" label="About">
              <Input
                id="plan"
                name="plan"
                defaultValue={plan === "enterprise" ? "Enterprise" : ""}
                placeholder="Starter, Pro, Enterprise…"
              />
            </Field>
            <Field id="message" label="Message">
              <Textarea id="message" name="message" required rows={5} />
            </Field>
            <Button type="submit">Send</Button>
          </form>
        )}
      </main>
      </RequireHydrated>
    </MarketingShell>
  );
}
