import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { UpgradeGate } from "@/components/app/upgrade-gate";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Field } from "@/components/field";
import { useAppStore, useSessionUser } from "@/lib/store";

export const Route = createFileRoute("/app/agent")({ component: AgentPage });

function AgentPage() {
  const user = useSessionUser()!;
  const agent = useAppStore((s) => s.agents.find((a) => a.clientId === user.id));
  const toggle = useAppStore((s) => s.toggleAgent);
  const update = useAppStore((s) => s.updateAgent);
  const addToCart = useAppStore((s) => s.addToCart);

  if (user.plan === "starter") return <UpgradeGate feature="Agent settings" />;
  if (!agent) return <p className="text-sm text-muted">No agent on this account.</p>;

  const current = agent;

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    update(current.id, {
      name: String(fd.get("name") ?? current.name),
      voice: String(fd.get("voice") ?? current.voice),
      accent: String(fd.get("accent") ?? current.accent),
      greeting: String(fd.get("greeting") ?? current.greeting),
      hours: String(fd.get("hours") ?? current.hours),
      knowledgeSummary: String(fd.get("knowledge") ?? current.knowledgeSummary),
    });
    toast.success("Agent saved");
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-medium tracking-tight">Agent</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">{user.agentOn && !user.paused ? "On" : "Off"}</span>
          <Switch
            checked={user.agentOn && !user.paused}
            disabled={user.paused}
            onCheckedChange={(v) => {
              toggle(user.id, v);
              toast.success(v ? "Agent is on" : "Agent is off");
            }}
            aria-label="Toggle agent"
          />
        </div>
      </div>
      <form onSubmit={save} className="mt-8 max-w-xl space-y-4">
        <Field id="name" label="Name">
          <Input id="name" name="name" defaultValue={agent.name} />
        </Field>
        <Field id="voice" label="Voice">
          <Input id="voice" name="voice" defaultValue={agent.voice} />
        </Field>
        <Field id="accent" label="Accent">
          <Input id="accent" name="accent" defaultValue={agent.accent} />
        </Field>
        <Field id="hours" label="Hours">
          <Input id="hours" name="hours" defaultValue={agent.hours} />
        </Field>
        <Field id="greeting" label="Greeting">
          <Textarea id="greeting" name="greeting" defaultValue={agent.greeting} rows={3} />
        </Field>
        <Field id="knowledge" label="Knowledge snippets">
          <Textarea
            id="knowledge"
            name="knowledge"
            defaultValue={agent.knowledgeSummary}
            rows={5}
          />
        </Field>
        <Button type="submit">Save</Button>
      </form>
      <div className="mt-10 max-w-xl rounded-2xl border border-line p-5">
        <p className="font-medium">Custom voice clone</p>
        <p className="mt-1 text-sm text-muted">
          A one-time €99 extra. We train from a short sample you record.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          asChild
        >
          <Link to="/checkout" onClick={() => addToCart("voice-clone")}>
            Add to cart · €99
          </Link>
        </Button>
      </div>
    </div>
  );
}
