import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEuro(amount: number, opts?: { cents?: boolean }) {
  const value = opts?.cents ? amount : amount;
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMinutes(min: number) {
  return `${min.toLocaleString("en-IE")} min`;
}

export function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(
    "en-GB",
    opts ?? { day: "numeric", month: "short", year: "numeric" },
  ).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function remainingHMS(endsAt: string) {
  const ms = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    ms,
    label: `${pad(h)}:${pad(m)}:${pad(s)}`,
    hours: h,
    expired: ms <= 0,
  };
}

export function planLabel(plan: string) {
  if (plan === "trial") return "Trial";
  if (plan === "starter") return "Starter";
  if (plan === "pro") return "Pro";
  if (plan === "enterprise") return "Enterprise";
  return plan;
}

export function outcomeLabel(outcome: string) {
  if (outcome === "booked") return "Booked";
  if (outcome === "message") return "Message";
  if (outcome === "transferred") return "Transferred";
  if (outcome === "missed") return "Missed";
  return outcome;
}
