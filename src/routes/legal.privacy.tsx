import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/legal/privacy")({ component: Privacy });

function Privacy() {
  return (
    <MarketingShell>
      <main id="content" className="mx-auto max-w-2xl px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Legal</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">Privacy</h1>
        <p className="mt-2 text-sm text-muted">Agent 42 Ltd · Last updated 1 August 2026</p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-strong">
          <p>
            We collect what we need to run the receptionist: your account, the numbers we assign, call metadata, recordings, transcripts, and the messages you send us. We do not sell this.
          </p>
          <p>
            Recordings and transcripts live on your dashboard for the life of the account, unless you delete them. Staff at Agent 42 Ltd may access them only to fix a fault or at your written request.
          </p>
          <p>
            Call audio is stored in the region we launch your number. Backups are encrypted. Payment details are handled by the processor — we keep last four digits and a status, not the full card.
          </p>
          <p>
            You may export or delete your data from Settings, or write to privacy@agent42.com. We will answer in 30 days. This notice is a dummy for the product demo and is not legal advice.
          </p>
          <p>Controller: Agent 42 Ltd, Dublin, Ireland.</p>
        </div>
      </main>
    </MarketingShell>
  );
}
