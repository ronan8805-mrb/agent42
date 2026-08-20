export type Role = "customer" | "admin";
export type Plan = "trial" | "starter" | "pro" | "enterprise";
export type CallOutcome = "booked" | "message" | "transferred" | "missed";
export type InvoiceStatus = "paid" | "open" | "failed";
export type BookingStatus = "confirmed" | "pending" | "cancelled";
export type TicketStatus = "open" | "pending" | "resolved";
export type AgentStatus = "live" | "paused" | "setup";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  company: string;
  plan: Plan;
  trialEndsAt: string | null;
  agentOn: boolean;
  numbers: string[];
  createdAt: string;
  country: string;
  industry: string;
  brandColor: string;
  notifyEmail: boolean;
  notifySms: boolean;
  notifyWeekly: boolean;
  paused?: boolean;
  notes?: string;
};

export type Agent = {
  id: string;
  clientId: string;
  name: string;
  voice: string;
  accent: string;
  status: AgentStatus;
  greeting: string;
  knowledgeSummary: string;
  hours: string;
  language: string;
};

export type PhoneNumber = {
  id: string;
  clientId: string;
  e164: string;
  label: string;
  country: string;
};

export type Call = {
  id: string;
  clientId: string;
  from: string;
  to: string;
  startedAt: string;
  durationSec: number;
  outcome: CallOutcome;
  transcript: string;
  recordingUrl: string;
  sentiment: "positive" | "neutral" | "negative";
  callerName: string;
  summary: string;
  tools: string[];
};

export type Booking = {
  id: string;
  clientId: string;
  customerName: string;
  phone: string;
  service: string;
  startsAt: string;
  status: BookingStatus;
};

export type Invoice = {
  id: string;
  clientId: string;
  period: string;
  serviceFee: number;
  minutes: number;
  minuteRate: number;
  extras: number;
  total: number;
  status: InvoiceStatus;
  issuedAt: string;
};

export type Ticket = {
  id: string;
  clientId: string;
  subject: string;
  body: string;
  status: TicketStatus;
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  message: string;
  createdAt: string;
};

export type CartItem = {
  id: string;
  sku: "plan-pro" | "voice-clone" | "integrations";
  name: string;
  price: number;
  kind: "monthly" | "one-time";
};

export type Receipt = {
  id: string;
  items: CartItem[];
  cardLast4: string;
  total: number;
  createdAt: string;
};

export type CatalogSku = {
  sku: CartItem["sku"];
  name: string;
  price: number;
  kind: CartItem["kind"];
  description: string;
};
