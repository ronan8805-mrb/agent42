import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore, useSessionUser } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/numbers")({ component: Numbers });

function Numbers() {
  const user = useSessionUser()!;
  const allNumbers = useAppStore((s) => s.numbers);
  const numbers = allNumbers.filter((n) => n.clientId === user.id);
  const assigned = numbers[0];

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tight">Numbers</h1>
      <p className="mt-1 text-sm text-muted">Starter and Pro include one dedicated line.</p>
      {assigned ? (
        <div className="mt-8 max-w-lg rounded-2xl border border-line p-6">
          <p className="text-xs text-muted">{assigned.label}</p>
          <p className="mt-2 tabular text-2xl font-medium tracking-tight">{assigned.e164}</p>
          <p className="mt-1 text-sm text-muted">{assigned.country}</p>
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted">No number assigned yet.</p>
      )}
      <div className="mt-8 max-w-lg rounded-2xl border border-line p-6">
        <p className="font-medium">Need another number?</p>
        <p className="mt-1 text-sm text-muted">
          Extra numbers are available on Enterprise — not as a monthly add-on.
        </p>
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link to="/contact" search={{ plan: "enterprise" }}>
            Available on Enterprise
          </Link>
        </Button>
      </div>
    </div>
  );
}
