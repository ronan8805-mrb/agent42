import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OutcomePill } from "@/components/app/outcome";
import { UsageRing } from "@/components/app/usage-ring";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAppStore, useSessionUser } from "@/lib/store";
import { formatDateTime, formatDuration, planLabel } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app/")({ component: Overview });

function Overview() {
  const user = useSessionUser()!;
  const allCalls = useAppStore((s) => s.calls);
  const allBookings = useAppStore((s) => s.bookings);
  const calls = allCalls.filter((c) => c.clientId === user.id);
  const bookings = allBookings.filter(
    (b) => b.clientId === user.id && b.status !== "cancelled",
  );
  const agent = useAppStore((s) => s.agents.find((a) => a.clientId === user.id));
  const toggleAgent = useAppStore((s) => s.toggleAgent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const minutesMonth = Math.round(
    calls
      .filter((c) => new Date(c.startedAt) >= startOfMonth)
      .reduce((n, c) => n + c.durationSec, 0) / 60,
  );
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const callsToday = calls.filter((c) => new Date(c.startedAt) >= startOfDay).length;
  const next = [...bookings].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )[0];
  const recent = [...calls]
    .sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Overview</h1>
          <p className="text-sm text-muted">{user.company}</p>
        </div>
        <Badge variant="accent">{planLabel(user.plan)}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl border border-line p-5">
          <UsageRing used={minutesMonth} />
          <div>
            <p className="text-xs text-muted">Minutes this month</p>
            <p className="tabular text-lg font-medium">vs 600 guide</p>
          </div>
        </div>
        <Stat label="Calls today" value={String(callsToday)} />
        <Stat
          label="Next booking"
          value={next ? formatDateTime(next.startsAt) : "None"}
          sub={next?.customerName}
        />
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Agent</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="font-medium">{agent?.name ?? "—"}</p>
            <Switch
              checked={user.agentOn && !user.paused}
              disabled={user.paused}
              onCheckedChange={(v) => {
                toggleAgent(user.id, v);
                toast.success(v ? "Agent is on" : "Agent is off");
              }}
              aria-label="Toggle agent"
            />
          </div>
          <p className="mt-1 text-xs text-muted">
            {user.paused ? "Paused" : user.agentOn ? "Live" : "Off"}
          </p>
        </div>
      </div>

      {user.plan === "starter" ? (
        <p className="rounded-2xl border border-line bg-mist px-4 py-3 text-sm">
          Starter sends SMS and email summaries.{" "}
          <Link to="/pricing" className="font-medium text-accent">
            Upgrade to Pro
          </Link>{" "}
          for the full desk.
        </p>
      ) : null}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">Recent calls</h2>
          <Link to="/app/calls" className="text-xs text-accent hover:underline">
            All calls
          </Link>
        </div>
        {!ready ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <p className="rounded-2xl border border-line px-4 py-8 text-center text-sm text-muted">
            No calls yet. The number is live.
          </p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {recent.map((c) => (
              <li key={c.id}>
                <Link
                  to="/app/calls/$id"
                  params={{ id: c.id }}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-mist"
                >
                  <div>
                    <p className="font-medium">{c.callerName}</p>
                    <p className="text-xs text-muted">{c.summary}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden tabular text-xs text-muted sm:inline">
                      {formatDuration(c.durationSec)}
                    </span>
                    <OutcomePill outcome={c.outcome} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-3 tabular text-lg font-medium tracking-tight">{value}</p>
      {sub ? <p className="text-xs text-muted">{sub}</p> : null}
    </div>
  );
}
