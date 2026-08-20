import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsageRing } from "@/components/app/usage-ring";
import { CATALOG, MINUTE_RATE, PLAN_PRICES } from "@/lib/seed";
import { useAppStore, useSessionUser } from "@/lib/store";
import { formatEuro, formatDate, planLabel } from "@/lib/utils";

export const Route = createFileRoute("/app/billing")({ component: Billing });

function Billing() {
  const user = useSessionUser()!;
  const allInvoices = useAppStore((s) => s.invoices);
  const allCalls = useAppStore((s) => s.calls);
  const invoices = allInvoices.filter((i) => i.clientId === user.id);
  const calls = allCalls.filter((c) => c.clientId === user.id);
  const addToCart = useAppStore((s) => s.addToCart);
  const payWithCard = useAppStore((s) => s.payWithCard);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const minutes = Math.round(
    calls
      .filter((c) => new Date(c.startedAt) >= startOfMonth)
      .reduce((n, c) => n + c.durationSec, 0) / 60,
  );
  const fee = user.plan === "pro" ? PLAN_PRICES.pro : user.plan === "starter" ? PLAN_PRICES.starter : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium tracking-tight">Billing</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Plan</p>
          <p className="mt-2 text-lg font-medium">{planLabel(user.plan)}</p>
          <p className="text-sm text-muted">
            {fee ? `${formatEuro(fee)}/mo` : "Trial — no fee yet"}
          </p>
          {user.plan !== "pro" && user.plan !== "enterprise" ? (
            <Button size="sm" className="mt-4" asChild>
              <Link to="/checkout" onClick={() => addToCart("plan-pro")}>
                Upgrade to Pro
              </Link>
            </Button>
          ) : null}
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-line p-5">
          <UsageRing used={minutes} />
          <div>
            <p className="text-xs text-muted">Usage this month</p>
            <p className="tabular text-sm">
              {minutes} min · {formatEuro(minutes * MINUTE_RATE)}
            </p>
            <p className="text-xs text-muted">{formatEuro(MINUTE_RATE)} / min</p>
          </div>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Extras</p>
          <div className="mt-3 space-y-2">
            {CATALOG.filter((c) => c.sku !== "plan-pro").map((c) => (
              <Button
                key={c.sku}
                size="sm"
                variant="outline"
                className="w-full justify-between"
                asChild
              >
                <Link to="/checkout" onClick={() => addToCart(c.sku)}>
                  {c.name}
                  <span className="tabular">{formatEuro(c.price)}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-sm font-medium">Invoices</h2>
        <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {invoices.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted">No invoices yet.</li>
          ) : (
            invoices.map((inv) => (
              <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm">
                <div>
                  <p className="font-medium">{inv.period}</p>
                  <p className="text-xs text-muted">
                    {formatEuro(inv.serviceFee)} service · {inv.minutes} min · issued{" "}
                    {formatDate(inv.issuedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tabular font-medium">{formatEuro(inv.total)}</span>
                  <Badge
                    variant={
                      inv.status === "paid" ? "success" : inv.status === "failed" ? "danger" : "warning"
                    }
                  >
                    {inv.status}
                  </Badge>
                  {inv.status === "open" ? (
                    <Button
                      size="sm"
                      asChild
                    >
                      <Link to="/checkout" search={{ invoice: inv.id }}>
                        Pay now
                      </Link>
                    </Button>
                  ) : null}
                  {inv.status === "open" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const r = payWithCard("4242424242424242", inv.id);
                        if (r.ok) toast.success("Invoice paid");
                      }}
                    >
                      Quick pay
                    </Button>
                  ) : null}
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
