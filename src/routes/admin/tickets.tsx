import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/field";
import { useAppStore } from "@/lib/store";
import { formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/admin/tickets")({ component: Tickets });

function Tickets() {
  const tickets = useAppStore((s) => s.tickets);
  const users = useAppStore((s) => s.users);
  const setStatus = useAppStore((s) => s.setTicketStatus);
  const add = useAppStore((s) => s.addTicket);
  const [open, setOpen] = useState(false);
  const clients = users.filter((u) => u.role === "customer");

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    add({
      clientId: String(fd.get("client") ?? clients[0]?.id ?? ""),
      subject: String(fd.get("subject") ?? ""),
      body: String(fd.get("body") ?? ""),
      status: "open",
    });
    toast.success("Ticket opened");
    setOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Tickets</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">New ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={onCreate} className="space-y-3">
              <Field id="client" label="Client">
                <select
                  id="client"
                  name="client"
                  className="flex h-11 w-full rounded-xl border border-line bg-elevated px-3.5 text-sm"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.company}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="subject" label="Subject">
                <Input id="subject" name="subject" required />
              </Field>
              <Field id="body" label="Note">
                <Textarea id="body" name="body" required />
              </Field>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {tickets.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-muted">Inbox is clear.</li>
        ) : (
          tickets.map((t) => {
            const client = users.find((u) => u.id === t.clientId);
            return (
              <li key={t.id} className="px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{t.subject}</p>
                    <p className="text-xs text-muted">
                      {client?.company} · {formatDateTime(t.createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-muted">{t.body}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        t.status === "resolved"
                          ? "success"
                          : t.status === "pending"
                            ? "warning"
                            : "default"
                      }
                    >
                      {t.status}
                    </Badge>
                    {t.status !== "resolved" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setStatus(t.id, "resolved");
                          toast.success("Marked resolved");
                        }}
                      >
                        Resolve
                      </Button>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
