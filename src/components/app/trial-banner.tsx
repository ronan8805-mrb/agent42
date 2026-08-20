import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { User } from "@/lib/types";
import { remainingHMS } from "@/lib/utils";

export function TrialBanner({ user }: { user: User }) {
  const [label, setLabel] = useState(() =>
    user.trialEndsAt ? remainingHMS(user.trialEndsAt).label : "",
  );
  const [expired, setExpired] = useState(
    () => (user.trialEndsAt ? remainingHMS(user.trialEndsAt).expired : false),
  );

  useEffect(() => {
    if (!user.trialEndsAt) return;
    const tick = () => {
      const r = remainingHMS(user.trialEndsAt!);
      setLabel(r.label);
      setExpired(r.expired);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [user.trialEndsAt]);

  if (user.plan !== "trial" || !user.trialEndsAt) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm">
      <p>
        {expired ? (
          "Your trial has ended."
        ) : (
          <>
            Your trial ends in{" "}
            <span className="tabular font-medium">{label}</span>
          </>
        )}
      </p>
      <Link to="/pricing" className="font-medium text-accent hover:underline">
        Choose a plan
      </Link>
    </div>
  );
}
