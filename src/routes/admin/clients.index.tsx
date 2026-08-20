import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { planLabel } from "@/lib/utils";
import type { Plan } from "@/lib/types";

export const Route = createFileRoute("/admin/clients/")({ component: Clients });

function Clients() {
  const allUsers = useAppStore((s) => s.users);
  const users = allUsers.filter((u) => u.role === "customer");
  const agents = useAppStore((s) => s.agents);
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState<"all" | Plan>("all");

  const rows = useMemo(() => {
    return users.filter((u) => {
      if (plan !== "all" && u.plan !== plan) return false;
      const s = q.trim().toLowerCase();
      if (!s) return true;
      return (
        u.company.toLowerCase().includes(s) ||
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s)
      );
    });
  }, [users, q, plan]);

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Clients</h1>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search company, name, email"
          aria-label="Search clients"
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1">
          {(["all", "trial", "starter", "pro", "enterprise"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={
                plan === p
                  ? "rounded-full bg-foreground px-3 py-1.5 text-xs text-background"
                  : "rounded-full px-3 py-1.5 text-xs text-muted hover:bg-mist"
              }
            >
              {p === "all" ? "All" : planLabel(p)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Plan</th>
              <th className="px-4 py-3 font-medium">Agent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => {
              const ag = agents.find((a) => a.clientId === u.id);
              return (
                <tr key={u.id} className="border-b border-line last:border-0 hover:bg-mist">
                  <td className="px-4 py-3">
                    <Link
                      to="/admin/clients/$id"
                      params={{ id: u.id }}
                      className="font-medium hover:text-accent"
                    >
                      {u.company}
                    </Link>
                    <p className="text-xs text-muted">{u.name}</p>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <Badge variant="accent">{planLabel(u.plan)}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {u.paused ? "Paused" : ag?.status ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted">No clients match.</p>
        ) : null}
      </div>
    </div>
  );
}
