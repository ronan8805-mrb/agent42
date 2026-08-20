import { Outlet, createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/checkout")({
  component: CheckoutLayout,
});

function CheckoutLayout() {
  return (
    <MarketingShell>
      <Outlet />
    </MarketingShell>
  );
}
