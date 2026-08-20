import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { formatEuro, formatDate } from "@/lib/utils";

export const Route = createFileRoute("/admin/revenue")({ component: Revenue });

function Revenue() {
  const invoices = useAppStore((s) => s.invoices);
  const users = useAppStore((s) => s.users);
  const total = invoices
    .filter((i) => i.status === "paid")
    .reduce((n, i) => n + i.total, 0);
  const open = invoices
    .filter((i) => i.status === "open")
    .reduce((n, i) => n + i.total, 0);

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Revenue</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Collected</p>
          <p className="mt-2 tabular text-2xl font-medium">{formatEuro(total)}</p>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Open</p>
          <p className="mt-2 tabular text-2xl font-medium">{formatEuro(open)}</p>
        </div>
      </div>
      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {invoices.map((inv) => {
          const client = users.find((u) => u.id === inv.clientId);
          return (
            <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm">
              <div>
                <p className="font-medium">{client?.company ?? inv.clientId}</p>
                <p className="text-xs text-muted">
                  {inv.period} · {formatDate(inv.issuedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular">{formatEuro(inv.total)}</span>
                <Badge
                  variant={
                    inv.status === "paid" ? "success" : inv.status === "failed" ? "danger" : "warning"
                  }
                >
                  {inv.status}
                </Badge>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
