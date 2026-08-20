import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { OutcomePill } from "@/components/app/outcome";
import { UpgradeGate } from "@/components/app/upgrade-gate";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore, useSessionUser } from "@/lib/store";
import type { CallOutcome } from "@/lib/types";
import { formatDateTime, formatDuration } from "@/lib/utils";

export const Route = createFileRoute("/app/calls/")({ component: Calls });

const FILTERS: Array<{ id: "all" | CallOutcome; label: string }> = [
  { id: "all", label: "All" },
  { id: "booked", label: "Booked" },
  { id: "message", label: "Message" },
  { id: "transferred", label: "Transferred" },
  { id: "missed", label: "Missed" },
];

function Calls() {
  const user = useSessionUser()!;
  const allCalls = useAppStore((s) => s.calls);
  const all = allCalls.filter((c) => c.clientId === user.id);
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  const rows = useMemo(() => {
    return [...all]
      .sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt))
      .filter((c) => (f === "all" ? true : c.outcome === f))
      .filter((c) => {
        const s = q.trim().toLowerCase();
        if (!s) return true;
        return (
          c.callerName.toLowerCase().includes(s) ||
          c.from.includes(s) ||
          c.summary.toLowerCase().includes(s)
        );
      });
  }, [all, q, f]);

  if (user.plan === "starter") return <UpgradeGate feature="Call history" />;

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Calls</h1>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, number, summary"
          aria-label="Search calls"
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setF(x.id)}
              className={
                f === x.id
                  ? "rounded-full bg-foreground px-3 py-1.5 text-xs text-background"
                  : "rounded-full px-3 py-1.5 text-xs text-muted hover:bg-mist"
              }
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        {!ready ? (
          <div className="space-y-2 p-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted">
            No calls match.{" "}
            <button type="button" className="text-accent" onClick={() => { setQ(""); setF("all"); }}>
              Clear
            </button>
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Caller</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">When</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Length</th>
                <th className="px-4 py-3 font-medium">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0 hover:bg-mist">
                  <td className="px-4 py-3">
                    <Link to="/app/calls/$id" params={{ id: c.id }} className="font-medium hover:text-accent">
                      {c.callerName}
                    </Link>
                    <p className="text-xs text-muted">{c.from}</p>
                  </td>
                  <td className="hidden px-4 py-3 tabular text-muted sm:table-cell">
                    {formatDateTime(c.startedAt)}
                  </td>
                  <td className="hidden px-4 py-3 tabular md:table-cell">
                    {formatDuration(c.durationSec)}
                  </td>
                  <td className="px-4 py-3">
                    <OutcomePill outcome={c.outcome} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
