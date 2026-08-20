import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/legal/terms")({ component: Terms });

function Terms() {
  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-2xl px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Legal</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">Terms</h1>
        <p className="mt-2 text-sm text-muted">Agent 42 Ltd · Last updated 1 August 2026</p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-strong">
          <p>
            These terms cover the Agent 42 receptionist service. The 24-hour trial needs no card. After that, Starter and Pro are monthly. Minutes are billed at the published rate. Enterprise is a written quote.
          </p>
          <p>
            You are responsible for the knowledge you load and the bookings the agent makes under your rules. We are responsible for keeping the number live and the recordings available.
          </p>
          <p>
            You may cancel at any time. Fees already incurred for minutes are due. We may suspend an agent for unpaid invoices; the customer dashboard will say so.
          </p>
          <p>
            The service is not a replacement for emergency numbers. We do not give clinical, legal, or financial advice. This page is a dummy for the product demo and is not a live contract.
          </p>
        </div>
      </main>
    </MarketingShell>
  );
}
