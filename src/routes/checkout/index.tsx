import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
import { CATALOG } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { RequireHydrated } from "@/components/require-hydrated";
import { formatEuro } from "@/lib/utils";

type Search = { invoice?: string };

export const Route = createFileRoute("/checkout/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    invoice: typeof s.invoice === "string" ? s.invoice : undefined,
  }),
  component: Checkout,
});

function Checkout() {
  const { invoice: invoiceId } = Route.useSearch();
  const cart = useAppStore((s) => s.cart);
  const invoices = useAppStore((s) => s.invoices);
  const addToCart = useAppStore((s) => s.addToCart);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const payWithCard = useAppStore((s) => s.payWithCard);
  const navigate = useNavigate();

  const invoice = invoices.find((i) => i.id === invoiceId);
  const items = invoice
    ? [
        {
          sku: "invoice" as const,
          name: `Invoice · ${invoice.period}`,
          price: invoice.total,
          kind: "one-time" as const,
        },
      ]
    : cart;
  const total = items.reduce((n, i) => n + i.price, 0);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = payWithCard(String(fd.get("card") ?? ""), invoiceId);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Payment received.");
    void navigate({ to: "/checkout/success" });
  }

  return (
    <RequireHydrated>
      <main
        id="content"
        className="mx-auto grid max-w-content gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Checkout</h1>
          <p className="mt-2 text-sm text-muted">
            Dummy processor. Use 4242 4242 4242 4242 to pay, or 4000 0000 0000 0002 to decline.
          </p>
          <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-4">
            <Field id="name" label="Name on card">
              <Input id="name" name="name" required autoComplete="cc-name" />
            </Field>
            <Field id="card" label="Card number">
              <Input
                id="card"
                name="card"
                required
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field id="exp" label="Expiry">
                <Input id="exp" name="exp" required placeholder="12 / 28" autoComplete="cc-exp" />
              </Field>
              <Field id="cvc" label="CVC">
                <Input id="cvc" name="cvc" required placeholder="123" autoComplete="cc-csc" />
              </Field>
            </div>
            <Button type="submit" className="w-full" disabled={items.length === 0}>
              Pay {formatEuro(total)}
            </Button>
          </form>
        </div>
        <aside className="rounded-2xl border border-line p-6">
          <h2 className="font-medium">Order</h2>
          {items.length === 0 ? (
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>Cart is empty.</p>
              <p>Add Pro, a voice clone, or integrations.</p>
              <div className="flex flex-col gap-2 pt-2">
                {CATALOG.map((c) => (
                  <Button
                    key={c.sku}
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(c.sku)}
                  >
                    Add {c.name} · {formatEuro(c.price)}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.sku} className="flex items-start justify-between gap-3">
                  <div>
                    <p>{i.name}</p>
                    <p className="text-xs text-muted">{i.kind === "monthly" ? "Monthly" : "One-time"}</p>
                  </div>
                  <div className="text-right">
                    <p className="tabular">{formatEuro(i.price)}</p>
                    {!invoice ? (
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-danger"
                        onClick={() =>
                          removeFromCart(i.sku as "plan-pro" | "voice-clone" | "integrations")
                        }
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
            <span>Total</span>
            <span className="tabular text-base font-medium">{formatEuro(total)}</span>
          </div>
          <p className="mt-6 text-xs text-muted">
            Extra numbers are not sold here.{" "}
            <Link to="/contact" search={{ plan: "enterprise" }} className="underline">
              Enterprise
            </Link>
            .
          </p>
        </aside>
      </main>
    </RequireHydrated>
  );
}
