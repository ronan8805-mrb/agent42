import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { UpgradeGate } from "@/components/app/upgrade-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/field";
import { Badge } from "@/components/ui/badge";
import { useAppStore, useSessionUser } from "@/lib/store";
import { formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/app/bookings")({ component: Bookings });

function Bookings() {
  const user = useSessionUser()!;
  const allBookings = useAppStore((s) => s.bookings);
  const rows = allBookings.filter((b) => b.clientId === user.id);
  const update = useAppStore((s) => s.updateBooking);
  const add = useAppStore((s) => s.addBooking);
  const [open, setOpen] = useState(false);

  if (user.plan === "starter") return <UpgradeGate feature="Bookings" />;

  const sorted = [...rows].sort(
    (a, b) => +new Date(a.startsAt) - +new Date(b.startsAt),
  );

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    add({
      clientId: user.id,
      customerName: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      startsAt: new Date(String(fd.get("when") ?? "")).toISOString(),
      status: "confirmed",
    });
    toast.success("Booking added");
    setOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-medium tracking-tight">Bookings</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">New booking</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New booking</DialogTitle>
            </DialogHeader>
            <form onSubmit={onCreate} className="space-y-3">
              <Field id="name" label="Customer">
                <Input id="name" name="name" required />
              </Field>
              <Field id="phone" label="Phone">
                <Input id="phone" name="phone" required />
              </Field>
              <Field id="service" label="Service">
                <Input id="service" name="service" required />
              </Field>
              <Field id="when" label="Starts">
                <Input id="when" name="when" type="datetime-local" required />
              </Field>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {sorted.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-line px-4 py-10 text-center text-sm text-muted">
          No bookings on the book.{" "}
          <button type="button" className="text-accent" onClick={() => setOpen(true)}>
            Add one
          </button>
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {sorted.map((b) => (
            <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-medium">{b.customerName}</p>
                <p className="text-sm text-muted">
                  {b.service} · {formatDateTime(b.startsAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    b.status === "confirmed"
                      ? "success"
                      : b.status === "cancelled"
                        ? "danger"
                        : "warning"
                  }
                >
                  {b.status}
                </Badge>
                {b.status !== "cancelled" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      update(b.id, { status: "cancelled" });
                      toast.success("Booking cancelled");
                    }}
                  >
                    Cancel
                  </Button>
                ) : null}
                {b.status === "pending" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      update(b.id, { status: "confirmed" });
                      toast.success("Booking confirmed");
                    }}
                  >
                    Confirm
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
