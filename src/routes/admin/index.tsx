import { createFileRoute } from "@tanstack/react-router";
import { PLAN_PRICES } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { formatEuro, formatMinutes } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const allUsers = useAppStore((s) => s.users);
  const users = allUsers.filter((u) => u.role === "customer");
  const agents = useAppStore((s) => s.agents);
  const calls = useAppStore((s) => s.calls);
  const invoices = useAppStore((s) => s.invoices);

  const mrr = users.reduce((n, u) => {
    if (u.plan === "starter") return n + PLAN_PRICES.starter;
    if (u.plan === "pro") return n + PLAN_PRICES.pro;
    if (u.plan === "enterprise") {
      const inv = invoices.find((i) => i.clientId === u.id && i.status === "paid");
      return n + (inv?.serviceFee ?? 490);
    }
    return n;
  }, 0);
  const live = agents.filter((a) => a.status === "live").length;
  const minutes = Math.round(calls.reduce((n, c) => n + c.durationSec, 0) / 60);
  const trials = users.filter((u) => u.plan === "trial").length;
  const converted = users.filter((u) => u.plan !== "trial").length;
  const conv = users.length ? Math.round((converted / users.length) * 100) : 0;

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="MRR" value={formatEuro(mrr)} />
        <Kpi label="Active agents" value={String(live)} />
        <Kpi label="Minutes (seed window)" value={formatMinutes(minutes)} />
        <Kpi label="Trial conversions" value={`${conv}%`} sub={`${trials} open trials`} />
      </div>
      <p className="mt-10 text-sm text-muted">
        {users.length} clients on the board. Pause, plan changes, and notes live on each record.
      </p>
    </div>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-3 tabular text-2xl font-medium tracking-tight">{value}</p>
      {sub ? <p className="text-xs text-muted">{sub}</p> : null}
    </div>
  );
}
