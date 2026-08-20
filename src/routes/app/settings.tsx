import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Field } from "@/components/field";
import { useAppStore, useSessionUser } from "@/lib/store";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  const user = useSessionUser()!;
  const update = useAppStore((s) => s.updateUser);

  function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    update(user.id, {
      name: String(fd.get("name") ?? user.name),
      company: String(fd.get("company") ?? user.company),
      brandColor: String(fd.get("brand") ?? user.brandColor),
    });
    toast.success("Profile saved");
  }

  function savePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = String(fd.get("password") ?? "");
    if (next.length < 6) {
      toast.error("Use at least six characters.");
      return;
    }
    update(user.id, { password: next });
    toast.success("Password updated");
    e.currentTarget.reset();
  }

  return (
    <div className="max-w-xl space-y-12">
      <h1 className="text-2xl font-medium tracking-tight">Settings</h1>
      <form onSubmit={saveProfile} className="space-y-4">
        <h2 className="text-sm font-medium">Profile</h2>
        <Field id="name" label="Name">
          <Input id="name" name="name" defaultValue={user.name} />
        </Field>
        <Field id="email" label="Email">
          <Input id="email" value={user.email} readOnly />
        </Field>
        <Field id="company" label="Company">
          <Input id="company" name="company" defaultValue={user.company} />
        </Field>
        <Field id="brand" label="Brand colour" hint="Used on your dashboard chrome.">
          <Input id="brand" name="brand" defaultValue={user.brandColor} />
        </Field>
        <Button type="submit">Save profile</Button>
      </form>

      <section className="space-y-3">
        <h2 className="text-sm font-medium">Notifications</h2>
        <Row
          label="Email summaries"
          checked={user.notifyEmail}
          onChange={(v) => {
            update(user.id, { notifyEmail: v });
            toast.success("Saved");
          }}
        />
        <Row
          label="SMS alerts"
          checked={user.notifySms}
          onChange={(v) => {
            update(user.id, { notifySms: v });
            toast.success("Saved");
          }}
        />
        <Row
          label="Weekly digest"
          checked={user.notifyWeekly}
          onChange={(v) => {
            update(user.id, { notifyWeekly: v });
            toast.success("Saved");
          }}
        />
      </section>

      <form onSubmit={savePassword} className="space-y-4">
        <h2 className="text-sm font-medium">Password</h2>
        <Field id="password" label="New password">
          <Input id="password" name="password" type="password" autoComplete="new-password" />
        </Field>
        <Button type="submit" variant="outline">
          Update password
        </Button>
      </form>
    </div>
  );
}

function Row({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}
