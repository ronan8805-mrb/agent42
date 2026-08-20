import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CATALOG, createSeed, MINUTE_RATE, STORAGE_KEY } from "./seed";
import type {
  Agent,
  Booking,
  Call,
  CartItem,
  ContactMessage,
  Invoice,
  PhoneNumber,
  Plan,
  Receipt,
  Ticket,
  User,
} from "./types";
import { digitsOnly, uid } from "./utils";

type SeedSlice = ReturnType<typeof createSeed>;

export type AppState = SeedSlice & {
  hydrated: boolean;
  sessionUserId: string | null;
  cart: CartItem[];
  messages: ContactMessage[];
  lastReceipt: Receipt | null;
  checkoutError: string | null;
  theme: "light" | "dark" | "system";

  setHydrated: () => void;
  setTheme: (t: "light" | "dark") => void;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  startTrial: (input: {
    name: string;
    email: string;
    company: string;
    country: string;
    industry: string;
    password: string;
  }) => { ok: true; userId: string } | { ok: false; error: string };
  sessionUser: () => User | null;
  clientOf: (userId?: string | null) => User | null;

  toggleAgent: (clientId: string, on?: boolean) => void;
  pauseClient: (clientId: string, paused: boolean) => void;
  changePlan: (clientId: string, plan: Plan) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  updateAgent: (id: string, patch: Partial<Agent>) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  addBooking: (b: Omit<Booking, "id">) => string;
  addToCart: (sku: CartItem["sku"]) => void;
  removeFromCart: (sku: CartItem["sku"]) => void;
  clearCart: () => void;
  payWithCard: (cardNumber: string, invoiceId?: string) => { ok: true } | { ok: false; error: string };
  sendMessage: (m: Omit<ContactMessage, "id" | "createdAt">) => void;
  addTicket: (t: Omit<Ticket, "id" | "createdAt">) => void;
  setTicketStatus: (id: string, status: Ticket["status"]) => void;
  addClientNote: (clientId: string, notes: string) => void;
};

const empty: SeedSlice = {
  users: [],
  agents: [],
  numbers: [],
  calls: [],
  bookings: [],
  invoices: [],
  tickets: [],
};

function chargeCard(raw: string) {
  const n = digitsOnly(raw);
  if (n === "4242424242424242") return { ok: true as const };
  if (n === "4000000000000002")
    return { ok: false as const, error: "Card declined. Try 4242 4242 4242 4242." };
  if (n.length < 13) return { ok: false as const, error: "Enter a complete card number." };
  return { ok: false as const, error: "Unrecognised test card. Use 4242… or 4000…0002." };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createSeed(),
      hydrated: false,
      sessionUserId: null,
      cart: [],
      messages: [],
      lastReceipt: null,
      checkoutError: null,
      theme: "system",

      setHydrated: () => set({ hydrated: true }),
      setTheme: (theme) => {
        set({ theme });
        try {
          localStorage.setItem("agent42.theme", theme);
        } catch {
          /* ignore */
        }
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
      },

      sessionUser: () => {
        const id = get().sessionUserId;
        return get().users.find((u) => u.id === id) ?? null;
      },
      clientOf: (userId) => get().users.find((u) => u.id === userId) ?? null,

      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
        );
        if (!user || user.password !== password) {
          return { ok: false, error: "Those details don’t match a demo account." };
        }
        set({ sessionUserId: user.id });
        return { ok: true };
      },

      logout: () => set({ sessionUserId: null }),

      startTrial: (input) => {
        const email = input.email.trim().toLowerCase();
        if (get().users.some((u) => u.email.toLowerCase() === email)) {
          return { ok: false, error: "That email already has an account. Try signing in." };
        }
        const id = uid("u");
        const numId = uid("num");
        const agentId = uid("ag");
        const now = new Date();
        const trialEndsAt = new Date(now.getTime() + 24 * 3600_000).toISOString();
        const user: User = {
          id,
          name: input.name.trim(),
          email,
          password: input.password,
          role: "customer",
          company: input.company.trim(),
          plan: "trial",
          trialEndsAt,
          agentOn: true,
          numbers: [numId],
          createdAt: now.toISOString(),
          country: input.country,
          industry: input.industry,
          brandColor: "#0F766E",
          notifyEmail: true,
          notifySms: true,
          notifyWeekly: true,
        };
        const e164 = "+44 20 3918 42" + String(Math.floor(10 + Math.random() * 89));
        const number: PhoneNumber = {
          id: numId,
          clientId: id,
          e164,
          label: "Trial number",
          country: "GB",
        };
        const agent: Agent = {
          id: agentId,
          clientId: id,
          name: "Aoife",
          voice: "Aoife — warm alto",
          accent: "Dublin",
          status: "setup",
          greeting: `Hello, ${user.company}, Aoife speaking. How can I help?`,
          knowledgeSummary: "Trial desk. Add hours and services in Agent.",
          hours: "24 hours",
          language: "English (Ireland)",
        };
        set((s) => ({
          users: [...s.users, user],
          numbers: [...s.numbers, number],
          agents: [...s.agents, agent],
          sessionUserId: id,
        }));
        return { ok: true, userId: id };
      },

      toggleAgent: (clientId, on) => {
        set((s) => ({
          users: s.users.map((u) =>
            u.id === clientId ? { ...u, agentOn: on ?? !u.agentOn } : u,
          ),
          agents: s.agents.map((a) =>
            a.clientId === clientId
              ? {
                  ...a,
                  status: (on ?? !s.users.find((u) => u.id === clientId)?.agentOn)
                    ? s.users.find((u) => u.id === clientId)?.paused
                      ? "paused"
                      : "live"
                    : "paused",
                }
              : a,
          ),
        }));
      },

      pauseClient: (clientId, paused) => {
        set((s) => ({
          users: s.users.map((u) =>
            u.id === clientId ? { ...u, paused, agentOn: paused ? false : u.agentOn } : u,
          ),
          agents: s.agents.map((a) =>
            a.clientId === clientId ? { ...a, status: paused ? "paused" : "live" } : a,
          ),
        }));
      },

      changePlan: (clientId, plan) => {
        set((s) => ({
          users: s.users.map((u) =>
            u.id === clientId
              ? { ...u, plan, trialEndsAt: plan === "trial" ? u.trialEndsAt : null }
              : u,
          ),
        }));
      },

      updateUser: (id, patch) => {
        set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)) }));
      },

      updateAgent: (id, patch) => {
        set((s) => ({ agents: s.agents.map((a) => (a.id === id ? { ...a, ...patch } : a)) }));
      },

      updateBooking: (id, patch) => {
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        }));
      },

      addBooking: (b) => {
        const id = uid("bk");
        set((s) => ({ bookings: [...s.bookings, { ...b, id }] }));
        return id;
      },

      addToCart: (sku) => {
        const item = CATALOG.find((c) => c.sku === sku);
        if (!item) return;
        set((s) => {
          if (s.cart.some((c) => c.sku === sku)) return s;
          return {
            cart: [...s.cart, { id: sku, sku, name: item.name, price: item.price, kind: item.kind }],
          };
        });
      },

      removeFromCart: (sku) =>
        set((s) => ({ cart: s.cart.filter((c) => c.sku !== sku) })),

      clearCart: () => set({ cart: [] }),

      payWithCard: (cardNumber, invoiceId) => {
        const charged = chargeCard(cardNumber);
        if (!charged.ok) {
          set({ checkoutError: charged.error });
          return charged;
        }
        const last4 = digitsOnly(cardNumber).slice(-4);
        const s = get();
        const user = s.users.find((u) => u.id === s.sessionUserId);
        if (invoiceId) {
          set({
            invoices: s.invoices.map((inv) =>
              inv.id === invoiceId ? { ...inv, status: "paid" } : inv,
            ),
            checkoutError: null,
          });
          return { ok: true };
        }
        const items = s.cart;
        if (items.length === 0) {
          return { ok: false, error: "Your cart is empty." };
        }
        const total = items.reduce((n, i) => n + i.price, 0);
        const extras = items
          .filter((i) => i.kind === "one-time")
          .reduce((n, i) => n + i.price, 0);
        const hasPro = items.some((i) => i.sku === "plan-pro");
        const receipt: Receipt = {
          id: uid("rcpt"),
          items,
          cardLast4: last4,
          total,
          createdAt: new Date().toISOString(),
        };
        const invoice: Invoice | null = user
          ? {
              id: uid("inv"),
              clientId: user.id,
              period: new Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
              }).format(new Date()),
              serviceFee: hasPro ? 149 : 0,
              minutes: 0,
              minuteRate: MINUTE_RATE,
              extras,
              total,
              status: "paid",
              issuedAt: new Date().toISOString(),
            }
          : null;
        set((st) => ({
          cart: [],
          lastReceipt: receipt,
          checkoutError: null,
          invoices: invoice ? [...st.invoices, invoice] : st.invoices,
          users: hasPro
            ? st.users.map((u) =>
                u.id === st.sessionUserId
                  ? { ...u, plan: "pro", trialEndsAt: null }
                  : u,
              )
            : st.users,
        }));
        return { ok: true };
      },

      sendMessage: (m) => {
        set((s) => ({
          messages: [
            ...s.messages,
            { ...m, id: uid("msg"), createdAt: new Date().toISOString() },
          ],
        }));
      },

      addTicket: (t) => {
        set((s) => ({
          tickets: [
            ...s.tickets,
            { ...t, id: uid("tk"), createdAt: new Date().toISOString() },
          ],
        }));
      },

      setTicketStatus: (id, status) => {
        set((s) => ({
          tickets: s.tickets.map((t) => (t.id === id ? { ...t, status } : t)),
        }));
      },

      addClientNote: (clientId, notes) => {
        set((s) => ({
          users: s.users.map((u) => (u.id === clientId ? { ...u, notes } : u)),
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        users: s.users,
        agents: s.agents,
        numbers: s.numbers,
        calls: s.calls,
        bookings: s.bookings,
        invoices: s.invoices,
        tickets: s.tickets,
        sessionUserId: s.sessionUserId,
        cart: s.cart,
        messages: s.messages,
        lastReceipt: s.lastReceipt,
        theme: s.theme,
      }),
    },
  ),
);

export function useSessionUser() {
  return useAppStore((s) => s.users.find((u) => u.id === s.sessionUserId) ?? null);
}

export function selectClientData(clientId: string) {
  const s = useAppStore.getState();
  return {
    user: s.users.find((u) => u.id === clientId),
    agent: s.agents.find((a) => a.clientId === clientId),
    numbers: s.numbers.filter((n) => n.clientId === clientId),
    calls: s.calls.filter((c) => c.clientId === clientId),
    bookings: s.bookings.filter((b) => b.clientId === clientId),
    invoices: s.invoices.filter((i) => i.clientId === clientId),
    tickets: s.tickets.filter((t) => t.clientId === clientId),
  };
}
