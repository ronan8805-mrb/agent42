import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RequireHydrated } from "@/components/require-hydrated";
import { useAppStore } from "@/lib/store";
import { formatEuro, formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/checkout/success")({ component: Success });

function Success() {
  const receipt = useAppStore((s) => s.lastReceipt);
  return (
    <RequireHydrated>
      <main id="content" className="mx-auto max-w-lg px-6 py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-success uppercase">Paid</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">Receipt</h1>
        {receipt ? (
          <div className="mt-8 rounded-2xl border border-line p-6 text-sm">
            <p className="text-muted">{formatDateTime(receipt.createdAt)}</p>
            <p className="mt-1 tabular text-muted">•••• {receipt.cardLast4}</p>
            <ul className="mt-4 space-y-2">
              {receipt.items.map((i) => (
                <li key={i.sku} className="flex justify-between">
                  <span>{i.name}</span>
                  <span className="tabular">{formatEuro(i.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-line pt-3 font-medium">
              <span>Total</span>
              <span className="tabular">{formatEuro(receipt.total)}</span>
            </div>
            <p className="mt-4 text-xs text-muted">Ref {receipt.id}</p>
          </div>
        ) : (
          <p className="mt-6 text-muted">No receipt on this session.</p>
        )}
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link to="/app/billing">Billing</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app">Dashboard</Link>
          </Button>
        </div>
      </main>
    </RequireHydrated>
  );
}
