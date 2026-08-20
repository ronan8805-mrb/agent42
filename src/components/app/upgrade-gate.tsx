import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export function UpgradeGate({ feature }: { feature: string }) {
  const addToCart = useAppStore((s) => s.addToCart);
  return (
    <div className="grid min-h-80 place-items-center rounded-2xl border border-line p-8 text-center">
      <div className="max-w-sm">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Pro</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight">
          {feature} lives on Pro
        </h2>
        <p className="mt-2 text-sm text-muted">
          Starter keeps the number and the summaries. The full desk — recordings, bookings, the agent — is Pro.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/checkout" onClick={() => addToCart("plan-pro")}>
              Upgrade to Pro
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/pricing">Compare plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
