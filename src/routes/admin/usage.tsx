import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { formatMinutes } from "@/lib/utils";

export const Route = createFileRoute("/admin/usage")({ component: Usage });

function Usage() {
  const allUsers = useAppStore((s) => s.users);
  const users = allUsers.filter((u) => u.role === "customer");
  const calls = useAppStore((s) => s.calls);
  const rows = users
    .map((u) => ({
      id: u.id,
      company: u.company,
      minutes: Math.round(
        calls.filter((c) => c.clientId === u.id).reduce((n, c) => n + c.durationSec, 0) / 60,
      ),
    }))
    .sort((a, b) => b.minutes - a.minutes);
  const max = Math.max(1, ...rows.map((r) => r.minutes));

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Usage</h1>
      <p className="mt-1 text-sm text-muted">Minutes by client in the seeded window.</p>
      <ul className="mt-8 space-y-4">
        {rows.map((r) => (
          <li key={r.id}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{r.company}</span>
              <span className="tabular text-muted">{formatMinutes(r.minutes)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-stone">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${(r.minutes / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
