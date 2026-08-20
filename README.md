# Agent 42

The receptionist that never sleeps. A marketing site and working product demo for a managed AI voice receptionist.

This is a fully client-side demo. No live payments, no remote API, no vendor names on the customer surface. Session and data persist in `localStorage`.

## Run

```bash
npm install
npm run dev
```

The app binds to port 8080.

```bash
npm run build
npm run typecheck
```

## Demo logins

Shown on `/login`. Click a row to fill the form.

| Email | Password | Role |
| --- | --- | --- |
| `customer@agent42.dev` | `demo123` | Northlight Salon · Pro |
| `starter@agent42.dev` | `demo123` | Harbor Coffee · Starter (upgrade gate) |
| `admin@agent42.dev` | `admin123` | Admin across three clients |

A new trial from `/trial` or `/signup` creates a 24-hour countdown and a dedicated number.

## Test cards

Dummy checkout at `/checkout`. Expiry and CVC can be any future values.

| Number | Result |
| --- | --- |
| `4242 4242 4242 4242` | Success — invoice marked paid, Pro upgrades apply, receipt at `/checkout/success` |
| `4000 0000 0000 0002` | Decline — cart kept, error toast |

## Persistence

Key: **`agent42.v1`**

Theme: **`agent42.theme`** (`light` or `dark`)

Clear them in the browser to re-seed Northlight, Harbor, and Pike & Co.

## What is in the cart

Pro plan, custom voice clone (€99 one-time), advanced integrations (€299 one-time). Extra phone numbers are not sold — they are an Enterprise conversation via `/contact?plan=enterprise`.

Minutes pass through at **€0.06 / min**.
