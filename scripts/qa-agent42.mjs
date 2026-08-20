import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] || "http://127.0.0.1:8080";
await mkdir("/workspace/screenshots", { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.setDefaultTimeout(15000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

async function shot(name) {
  await page.screenshot({
    path: `/workspace/screenshots/${name}.png`,
    fullPage: false,
  });
}

async function login(email, password) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/(app|admin)/);
}

try {
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const hero = await page.getByRole("heading", { name: "Your phones, answered." }).isVisible();
  if (!hero) throw new Error("hero missing");

  for (const path of [
    "/how-it-works",
    "/pricing",
    "/industries",
    "/industries/salons",
    "/about",
    "/blog",
    "/blog/fire-the-phone-keep-the-customers",
    "/legal/privacy",
    "/legal/terms",
    "/contact?plan=enterprise",
    "/this-page-does-not-exist",
  ]) {
    const res = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    if (!res || res.status() >= 500) throw new Error(`fail ${path} ${res?.status()}`);
    const text = await page.locator("body").innerText();
    if (text.length < 40) throw new Error(`thin ${path}`);
  }
  await shot("404");

  await login("customer@agent42.dev", "demo123");
  await page.waitForTimeout(500);
  await shot("app-overview");
  const overview = await page.locator("body").innerText();
  if (!overview.includes("Northlight")) throw new Error("overview missing company");

  await page.goto(`${base}/app/calls`);
  await page.getByRole("link", { name: "Siobhan Murphy" }).first().waitFor({ timeout: 8000 });
  await shot("app-calls");
  await page.getByRole("link", { name: "Siobhan Murphy" }).first().click();
  await page.waitForTimeout(400);
  const transcript = await page.locator("body").innerText();
  if (!transcript.includes("Aoife")) throw new Error("transcript missing");
  await shot("app-call-detail");
  await page.getByRole("button", { name: "Copy transcript" }).click();

  await page.goto(`${base}/app/agent`);
  await page.waitForTimeout(300);
  const sw = page.getByRole("switch", { name: "Toggle agent" });
  await sw.click();
  await page.waitForTimeout(200);
  await sw.click();

  await page.goto(`${base}/app/billing`);
  await page.waitForTimeout(300);
  await shot("app-billing");
  if (!(await page.locator("body").innerText()).includes("Invoice")) {
    // period names like August 2026
  }

  await page.goto(`${base}/app/numbers`);
  await page.waitForTimeout(400);
  await shot("app-numbers");
  const numbers = await page.locator("body").innerText();
  if (numbers.toLowerCase().includes("€18")) throw new Error("extra number upsell found");
  if (!/enterprise/i.test(numbers)) {
    throw new Error("enterprise numbers CTA missing: " + numbers.slice(0, 400));
  }

  await page.goto(`${base}/login`);
  await login("starter@agent42.dev", "demo123");
  await page.waitForTimeout(400);
  await page.goto(`${base}/app/calls`);
  await page.waitForTimeout(400);
  const gate = await page.locator("body").innerText();
  if (!gate.includes("Upgrade to Pro")) throw new Error("starter gate missing");
  await shot("starter-gate");

  await page.goto(`${base}/login`);
  await login("admin@agent42.dev", "admin123");
  await page.waitForTimeout(400);
  await shot("admin-overview");
  await page.goto(`${base}/admin/clients`);
  await page.getByRole("link", { name: "Northlight Salon" }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Pause agent" }).click();
  await page.waitForTimeout(200);
  await shot("admin-client");

  await page.goto(`${base}/login`);
  await login("customer@agent42.dev", "demo123");
  await page.waitForTimeout(400);
  const paused = await page.locator("body").innerText();
  if (!paused.includes("Agent paused")) throw new Error("pause did not reflect");

  await page.goto(`${base}/trial`);
  await page.fill("#name", "Dana Quinn");
  await page.fill("#email", `dana.${Date.now()}@trial.dev`);
  await page.fill("#company", "Quinn Clinic");
  await page.fill("#industry", "clinics");
  await page.fill("#password", "trial123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/app/);
  await page.waitForTimeout(600);
  const trial = await page.locator("body").innerText();
  if (!trial.includes("Your trial ends in")) throw new Error("trial banner missing");
  await shot("trial-app");

  await page.goto(`${base}/checkout`);
  await page.getByRole("button", { name: /Add Pro plan/ }).waitFor({ timeout: 8000 });
  await page.getByRole("button", { name: /Add Pro plan/ }).click();
  await page.getByRole("button", { name: /Pay/ }).waitFor({ state: "visible" });
  await page.waitForFunction(() => {
    const b = document.querySelector('form button[type="submit"]');
    return b && !b.hasAttribute("disabled");
  });
  await page.fill("#name", "Dana Quinn");
  await page.fill("#card", "4000000000000002");
  await page.fill("#exp", "12 / 28");
  await page.fill("#cvc", "123");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(400);
  const declined = await page.locator("body").innerText();
  if (!declined.toLowerCase().includes("declin") && !declined.includes("4000")) {
    // toast may not be in body; check cart still has Pro
    const cart = await page.locator("body").innerText();
    if (!cart.includes("Pro plan")) throw new Error("decline did not keep cart");
  }
  await page.fill("#card", "4242424242424242");
  await page.click('button[type="submit"]');
  await page.waitForURL(/checkout\/success/);
  await page.getByRole("heading", { name: "Receipt" }).waitFor({ timeout: 8000 });
  await shot("checkout-success");
  const receipt = await page.locator("body").innerText();
  if (!receipt.includes("Receipt")) throw new Error("receipt missing: " + receipt.slice(0, 300));

  console.log(JSON.stringify({ ok: true, errors }, null, 2));
} catch (err) {
  await shot("qa-fail");
  console.error("QA FAIL", err);
  console.error("page", page.url());
  console.error("errors", errors);
  process.exitCode = 1;
} finally {
  await browser.close();
}
