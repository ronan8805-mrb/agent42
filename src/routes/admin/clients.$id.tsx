import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import type { Plan } from "@/lib/types";
import { formatDate, planLabel } from "@/lib/utils";

export const Route = createFileRoute("/admin/clients/$id")({
  component: ClientDetail,
});

function ClientDetail() {
  const { id } = Route.useParams();
  const user = useAppStore((s) => s.users.find((u) => u.id === id));
  const agent = useAppStore((s) => s.agents.find((a) => a.clientId === id));
  const allNumbers = useAppStore((s) => s.numbers);
  const numbers = allNumbers.filter((n) => n.clientId === id);
  const pause = useAppStore((s) => s.pauseClient);
  const changePlan = useAppStore((s) => s.changePlan);
  const addNote = useAppStore((s) => s.addClientNote);

  if (!user || user.role !== "customer") throw notFound();

  return (
    <div className="space-y-8">
      <p className="text-xs text-muted">
        <Link to="/admin/clients" className="hover:text-foreground">
          Clients
        </Link>
      </p>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">{user.company}</h1>
          <p className="text-sm text-muted">
            {user.name} · {user.email} · since {formatDate(user.createdAt)}
          </p>
        </div>
        <Badge variant="accent">{planLabel(user.plan)}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Agent</p>
          <p className="mt-2 font-medium">{agent?.name ?? "—"}</p>
          <p className="text-sm text-muted">
            {user.paused ? "Paused" : agent?.status} · {user.agentOn ? "On" : "Off"}
          </p>
          <Button
            className="mt-4"
            variant={user.paused ? "default" : "outline"}
            size="sm"
            onClick={() => {
              pause(user.id, !user.paused);
              toast.success(user.paused ? "Agent resumed" : "Agent paused");
            }}
          >
            {user.paused ? "Resume agent" : "Pause agent"}
          </Button>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Plan</p>
          <div className="mt-3">
            <Select
              value={user.plan}
              onValueChange={(v) => {
                changePlan(user.id, v as Plan);
                toast.success("Plan updated");
              }}
            >
              <SelectTrigger aria-label="Change plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="mt-3 text-sm text-muted">
            {numbers[0]?.e164 ?? "No number"}
          </p>
        </div>
      </div>

      <form
        className="max-w-xl space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          addNote(user.id, String(fd.get("notes") ?? ""));
          toast.success("Notes saved");
        }}
      >
        <label htmlFor="notes" className="text-sm font-medium">
          Notes
        </label>
        <Textarea id="notes" name="notes" defaultValue={user.notes ?? ""} rows={5} />
        <Button type="submit" size="sm">
          Save notes
        </Button>
      </form>
    </div>
  );
}
