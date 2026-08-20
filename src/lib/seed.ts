import type {
  Agent,
  Booking,
  Call,
  CatalogSku,
  Invoice,
  PhoneNumber,
  Ticket,
  User,
} from "./types";

const hoursAgo = (h: number) =>
  new Date(Date.now() - h * 3600_000).toISOString();
const daysFromNow = (d: number, hour = 10, min = 0) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + d);
  dt.setHours(hour, min, 0, 0);
  return dt.toISOString();
};
const monthsAgo = (m: number) => {
  const dt = new Date();
  dt.setMonth(dt.getMonth() - m, 1);
  dt.setHours(12, 0, 0, 0);
  return dt.toISOString();
};
const periodOf = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    new Date(iso),
  );

export const MINUTE_RATE = 0.06;
export const PLAN_PRICES = { starter: 99, pro: 149, enterprise: 0 } as const;
export const STORAGE_KEY = "agent42.v1";
export const THEME_KEY = "agent42.theme";

export const CATALOG: CatalogSku[] = [
  {
    sku: "plan-pro",
    name: "Pro plan",
    price: 149,
    kind: "monthly",
    description: "Dedicated number and the full branded dashboard.",
  },
  {
    sku: "voice-clone",
    name: "Custom voice clone",
    price: 99,
    kind: "one-time",
    description: "A voice trained on a short sample you record.",
  },
  {
    sku: "integrations",
    name: "Advanced integrations",
    price: 299,
    kind: "one-time",
    description: "Calendar, PMS, and CRM connections beyond the included set.",
  },
];

export const DEMO_LOGINS = [
  {
    email: "customer@agent42.dev",
    password: "demo123",
    label: "Northlight Salon · Pro",
  },
  {
    email: "starter@agent42.dev",
    password: "demo123",
    label: "Harbor Coffee · Starter",
  },
  {
    email: "admin@agent42.dev",
    password: "admin123",
    label: "Admin · all clients",
  },
] as const;

const REC = "/audio/recording.wav";

export function createSeed() {
  const users: User[] = [
    {
      id: "u-northlight",
      name: "Clara Voss",
      email: "customer@agent42.dev",
      password: "demo123",
      role: "customer",
      company: "Northlight Salon",
      plan: "pro",
      trialEndsAt: null,
      agentOn: true,
      numbers: ["num-nl"],
      createdAt: hoursAgo(24 * 96),
      country: "United Kingdom",
      industry: "salons",
      brandColor: "#0F766E",
      notifyEmail: true,
      notifySms: true,
      notifyWeekly: true,
      notes: "Flagship salon in Marylebone. Prefers Aoife’s voice.",
    },
    {
      id: "u-harbor",
      name: "James Whitaker",
      email: "starter@agent42.dev",
      password: "demo123",
      role: "customer",
      company: "Harbor Coffee",
      plan: "starter",
      trialEndsAt: null,
      agentOn: true,
      numbers: ["num-hb"],
      createdAt: hoursAgo(24 * 40),
      country: "United Kingdom",
      industry: "restaurants",
      brandColor: "#0F766E",
      notifyEmail: true,
      notifySms: false,
      notifyWeekly: true,
      notes: "Two sites in Leith. Starter — upgrade conversation open.",
    },
    {
      id: "u-pike",
      name: "Helen Pike",
      email: "pike@agent42.dev",
      password: "demo123",
      role: "customer",
      company: "Pike & Co. Trades",
      plan: "enterprise",
      trialEndsAt: null,
      agentOn: true,
      numbers: ["num-pk"],
      createdAt: hoursAgo(24 * 210),
      country: "United Kingdom",
      industry: "trades",
      brandColor: "#0F766E",
      notifyEmail: true,
      notifySms: true,
      notifyWeekly: false,
      notes: "Plumbing and heating. Enterprise quote locked in March.",
    },
    {
      id: "u-admin",
      name: "Rowan Hale",
      email: "admin@agent42.dev",
      password: "admin123",
      role: "admin",
      company: "Agent 42 Ltd",
      plan: "enterprise",
      trialEndsAt: null,
      agentOn: true,
      numbers: [],
      createdAt: hoursAgo(24 * 400),
      country: "Ireland",
      industry: "other",
      brandColor: "#0F766E",
      notifyEmail: true,
      notifySms: false,
      notifyWeekly: true,
    },
  ];

  const agents: Agent[] = [
    {
      id: "ag-nl",
      clientId: "u-northlight",
      name: "Aoife",
      voice: "Aoife — warm alto",
      accent: "Dublin",
      status: "live",
      greeting:
        "Good morning, Northlight Salon, Aoife speaking. How can I help you today?",
      knowledgeSummary:
        "Colour, cut, balayage, and treatments. Closed Mondays. Last appointment 18:30 Tue–Fri, 16:00 Sat. Deposits on colour. Stylists: Clara, Faye, Tom.",
      hours: "Tue–Fri 09:00–19:00 · Sat 09:00–17:00 · Closed Sun–Mon",
      language: "English (Ireland)",
    },
    {
      id: "ag-hb",
      clientId: "u-harbor",
      name: "Marcus",
      voice: "Marcus — even baritone",
      accent: "Edinburgh",
      status: "live",
      greeting:
        "Harbor Coffee, Marcus here. Table, takeaway, or a question about hours?",
      knowledgeSummary:
        "Two rooms in Leith. Bookings for 6+ only. Kitchen 08:00–15:00. Allergen list on request. No dogs in the back room.",
      hours: "Daily 07:30–16:00",
      language: "English (Scotland)",
    },
    {
      id: "ag-pk",
      clientId: "u-pike",
      name: "Rhys",
      voice: "Rhys — dry, calm",
      accent: "Cardiff",
      status: "live",
      greeting:
        "Pike and Co, Rhys speaking. Are you calling about a boiler, a leak, or a booked job?",
      knowledgeSummary:
        "Emergency callouts 7 days. Gas Safe. Quote visits Tue–Thu. Invoice terms 14 days. Coverage: Bristol, Bath, North Somerset.",
      hours: "Desk 08:00–17:30 · On-call nights",
      language: "English (Wales)",
    },
  ];

  const numbers: PhoneNumber[] = [
    {
      id: "num-nl",
      clientId: "u-northlight",
      e164: "+44 20 3918 4242",
      label: "Front desk",
      country: "GB",
    },
    {
      id: "num-hb",
      clientId: "u-harbor",
      e164: "+44 131 555 0142",
      label: "Leith line",
      country: "GB",
    },
    {
      id: "num-pk",
      clientId: "u-pike",
      e164: "+44 117 555 4242",
      label: "Jobs line",
      country: "GB",
    },
  ];

  const nl = "u-northlight";
  const calls: Call[] = [
    {
      id: "call-nl-01",
      clientId: nl,
      from: "+44 7700 900112",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(2.4),
      durationSec: 186,
      outcome: "booked",
      callerName: "Siobhan Murphy",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Booked a colour refresh with Clara on Thursday at 14:00.",
      transcript: `Aoife: Good afternoon, Northlight Salon, Aoife speaking. How can I help you today?
Siobhan: Hiya, it's Siobhan Murphy. I need a colour refresh before the weekend.
Aoife: Of course. Clara has Thursday at two, or Faye on Saturday morning. Which would you rather?
Siobhan: Thursday at two, please. Same as last time — a root tint and a gloss.
Aoife: That's in. I'll send a confirmation to this number, and a reminder the day before. Anything else?
Siobhan: That's grand, thank you.
Aoife: See you Thursday, Siobhan.`,
    },
    {
      id: "call-nl-02",
      clientId: nl,
      from: "+44 7700 900204",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(8),
      durationSec: 142,
      outcome: "booked",
      callerName: "Aoife Byrne",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Cut and finish with Tom, Saturday 11:00.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Caller: This is going to be confusing — I'm Aoife as well. Looking for a cut.
Aoife: We get that more than you'd think. Tom has Saturday at eleven.
Caller: Perfect. Medium length, just a tidy.
Aoife: Booked. Confirmation is on its way.`,
    },
    {
      id: "call-nl-03",
      clientId: nl,
      from: "+44 7700 900331",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(18),
      durationSec: 97,
      outcome: "message",
      callerName: "Niamh Kelly",
      sentiment: "neutral",
      recordingUrl: REC,
      tools: ["voicemail-note", "email-summary"],
      summary: "Asked whether Olaplex is in stock; requested a call back from Clara.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Niamh: Is Clara in? I wanted to ask about Olaplex before I book.
Aoife: She's with a client until four. I can take a note and have her ring you, or I can book a treatment now.
Niamh: A note is fine. Niamh Kelly. Same number.
Aoife: I'll make sure she gets it.`,
    },
    {
      id: "call-nl-04",
      clientId: nl,
      from: "+44 7700 900418",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(27),
      durationSec: 248,
      outcome: "booked",
      callerName: "Ciaran Walsh",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm", "knowledge"],
      summary: "Balayage consultation with Faye, Friday 10:30. First visit.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Ciaran: I've never been in. Looking at a balayage. How long does that take?
Aoife: With Faye, a first balayage is usually three hours including a consultation. Friday at half ten is free.
Ciaran: I'll take that. Ciaran Walsh.
Aoife: I'll send a short note on what to expect, and a deposit link for colour.`,
    },
    {
      id: "call-nl-05",
      clientId: nl,
      from: "+44 7700 900555",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(31),
      durationSec: 74,
      outcome: "transferred",
      callerName: "Maeve O'Connor",
      sentiment: "neutral",
      recordingUrl: REC,
      tools: ["handoff"],
      summary: "Existing client asked to speak with Clara about a patch test. Transferred.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Maeve: Can you put me through to Clara? It's about a patch test.
Aoife: She's just finishing. I'll put you through now, Maeve.`,
    },
    {
      id: "call-nl-06",
      clientId: nl,
      from: "+44 7700 900662",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(46),
      durationSec: 121,
      outcome: "booked",
      callerName: "Padraig Flynn",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Men's cut with Tom, Friday 16:00.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Padraig: Any chance of a cut this week? Short back and sides.
Aoife: Tom can do Friday at four.
Padraig: That's me. Padraig Flynn.
Aoife: Confirmed.`,
    },
    {
      id: "call-nl-07",
      clientId: nl,
      from: "+44 7700 900773",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(52),
      durationSec: 18,
      outcome: "missed",
      callerName: "Orla Brennan",
      sentiment: "negative",
      recordingUrl: REC,
      tools: ["callback-queue"],
      summary: "Caller rang off after 18 seconds. SMS offered a call-back window.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
(Caller disconnects.)`,
    },
    {
      id: "call-nl-08",
      clientId: nl,
      from: "+44 7700 900884",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(70),
      durationSec: 203,
      outcome: "booked",
      callerName: "Fiadh Ryan",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Full colour with Clara, Saturday 14:30.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Fiadh: I need a full colour before a wedding. Not mine — I'm a bridesmaid.
Aoife: Clara has Saturday at half two. That's our last colour slot.
Fiadh: Take it. Fiadh Ryan.
Aoife: Booked. I'll note it's for a wedding so Clara can plan the timing.`,
    },
    {
      id: "call-nl-09",
      clientId: nl,
      from: "+44 7700 900915",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(95),
      durationSec: 88,
      outcome: "message",
      callerName: "Eoin Gallagher",
      sentiment: "neutral",
      recordingUrl: REC,
      tools: ["email-summary"],
      summary: "Gift voucher enquiry. Email with options sent.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Eoin: Do you still do gift vouchers?
Aoife: We do. Digital, from fifty pounds. I can email the link.
Eoin: Please. Eoin Gallagher, this number is fine.
Aoife: On its way.`,
    },
    {
      id: "call-nl-10",
      clientId: nl,
      from: "+44 7700 900101",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(110),
      durationSec: 156,
      outcome: "booked",
      callerName: "Saoirse Duffy",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Blow dry with Faye, Thursday 17:30.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Saoirse: Can I get a blow dry after work Thursday?
Aoife: Faye at half five.
Saoirse: Yes. Saoirse Duffy.
Aoife: See you then.`,
    },
    {
      id: "call-nl-11",
      clientId: nl,
      from: "+44 7700 900222",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(140),
      durationSec: 134,
      outcome: "booked",
      callerName: "Conor McGrath",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Cut with Tom, Thursday 12:00.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Conor: Looking for a cut around lunch Thursday.
Aoife: Tom is free at twelve.
Conor: Book it. Conor McGrath.
Aoife: Done. Confirmation by text.`,
    },
    {
      id: "call-nl-12",
      clientId: nl,
      from: "+44 7700 900303",
      to: "+44 20 3918 4242",
      startedAt: hoursAgo(165),
      durationSec: 271,
      outcome: "booked",
      callerName: "Grainne Power",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm", "knowledge"],
      summary: "Highlights and trim with Clara, next Saturday 09:30.",
      transcript: `Aoife: Northlight Salon, Aoife speaking.
Grainne: I want highlights and a trim. Last time Clara did a foil, not balayage.
Aoife: Clara can do that Saturday week at half nine. Highlights need a patch test if it's been more than six months.
Grainne: It hasn't. Grainne Power.
Aoife: You're in. I'll hold the patch-test note as not required.`,
    },
    {
      id: "call-hb-01",
      clientId: "u-harbor",
      from: "+44 7700 901001",
      to: "+44 131 555 0142",
      startedAt: hoursAgo(5),
      durationSec: 64,
      outcome: "booked",
      callerName: "Lila Shah",
      sentiment: "positive",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm"],
      summary: "Table for six, Saturday 10:30, front room.",
      transcript: `Marcus: Harbor Coffee, Marcus here.
Lila: Table for six on Saturday morning?
Marcus: Front room at half ten. Name?
Lila: Shah.
Marcus: Booked.`,
    },
    {
      id: "call-hb-02",
      clientId: "u-harbor",
      from: "+44 7700 901002",
      to: "+44 131 555 0142",
      startedAt: hoursAgo(22),
      durationSec: 41,
      outcome: "message",
      callerName: "Owen Reid",
      sentiment: "neutral",
      recordingUrl: REC,
      tools: ["email-summary"],
      summary: "Asked if the back room can take a pram. Yes — noted.",
      transcript: `Marcus: Harbor Coffee.
Owen: Can I bring a pram into the back room?
Marcus: You can. The front room is tighter.`,
    },
    {
      id: "call-pk-01",
      clientId: "u-pike",
      from: "+44 7700 902001",
      to: "+44 117 555 4242",
      startedAt: hoursAgo(3),
      durationSec: 192,
      outcome: "booked",
      callerName: "Daphne Cole",
      sentiment: "negative",
      recordingUrl: REC,
      tools: ["calendar", "sms-confirm", "handoff"],
      summary: "No hot water. Emergency slot today 16:45, Bath.",
      transcript: `Rhys: Pike and Co, Rhys speaking.
Daphne: The boiler's dead. No hot water since last night.
Rhys: I can put an engineer in Bath at a quarter to five. That is a call-out rate.
Daphne: Please. Daphne Cole, Weston Park.
Rhys: He's on his way to the board now. You'll get a text with the window.`,
    },
    {
      id: "call-pk-02",
      clientId: "u-pike",
      from: "+44 7700 902002",
      to: "+44 117 555 4242",
      startedAt: hoursAgo(26),
      durationSec: 110,
      outcome: "booked",
      callerName: "Martin Yeo",
      sentiment: "neutral",
      recordingUrl: REC,
      tools: ["calendar"],
      summary: "Annual service booked Tuesday 09:00.",
      transcript: `Rhys: Pike and Co.
Martin: Annual on the combi, same as last year.
Rhys: Tuesday nine. Martin Yeo, yes?
Martin: That's it.`,
    },
  ];

  const bookings: Booking[] = [
    {
      id: "bk-01",
      clientId: nl,
      customerName: "Siobhan Murphy",
      phone: "+44 7700 900112",
      service: "Colour refresh — Clara",
      startsAt: daysFromNow(1, 14, 0),
      status: "confirmed",
    },
    {
      id: "bk-02",
      clientId: nl,
      customerName: "Ciaran Walsh",
      phone: "+44 7700 900418",
      service: "Balayage consultation — Faye",
      startsAt: daysFromNow(2, 10, 30),
      status: "confirmed",
    },
    {
      id: "bk-03",
      clientId: nl,
      customerName: "Aoife Byrne",
      phone: "+44 7700 900204",
      service: "Cut and finish — Tom",
      startsAt: daysFromNow(3, 11, 0),
      status: "confirmed",
    },
    {
      id: "bk-04",
      clientId: nl,
      customerName: "Fiadh Ryan",
      phone: "+44 7700 900884",
      service: "Full colour — Clara",
      startsAt: daysFromNow(3, 14, 30),
      status: "confirmed",
    },
    {
      id: "bk-05",
      clientId: "u-harbor",
      customerName: "Lila Shah",
      phone: "+44 7700 901001",
      service: "Table for 6 — front room",
      startsAt: daysFromNow(3, 10, 30),
      status: "confirmed",
    },
    {
      id: "bk-06",
      clientId: "u-pike",
      customerName: "Daphne Cole",
      phone: "+44 7700 902001",
      service: "Emergency boiler — Bath",
      startsAt: daysFromNow(0, 16, 45),
      status: "confirmed",
    },
  ];

  const invoices: Invoice[] = [
    {
      id: "inv-nl-1",
      clientId: nl,
      period: periodOf(monthsAgo(1)),
      serviceFee: 149,
      minutes: 412,
      minuteRate: MINUTE_RATE,
      extras: 0,
      total: 149 + 412 * MINUTE_RATE,
      status: "paid",
      issuedAt: monthsAgo(1),
    },
    {
      id: "inv-nl-2",
      clientId: nl,
      period: periodOf(monthsAgo(0)),
      serviceFee: 149,
      minutes: 268,
      minuteRate: MINUTE_RATE,
      extras: 0,
      total: 149 + 268 * MINUTE_RATE,
      status: "open",
      issuedAt: monthsAgo(0),
    },
    {
      id: "inv-hb-1",
      clientId: "u-harbor",
      period: periodOf(monthsAgo(0)),
      serviceFee: 99,
      minutes: 86,
      minuteRate: MINUTE_RATE,
      extras: 0,
      total: 99 + 86 * MINUTE_RATE,
      status: "open",
      issuedAt: monthsAgo(0),
    },
    {
      id: "inv-pk-1",
      clientId: "u-pike",
      period: periodOf(monthsAgo(0)),
      serviceFee: 490,
      minutes: 940,
      minuteRate: MINUTE_RATE,
      extras: 99,
      total: 490 + 940 * MINUTE_RATE + 99,
      status: "paid",
      issuedAt: monthsAgo(0),
    },
  ];

  const tickets: Ticket[] = [
    {
      id: "tk-01",
      clientId: nl,
      subject: "Move Saturday colour later by 30 minutes",
      body: "Fiadh Ryan asked if 15:00 is possible instead of 14:30.",
      status: "open",
      createdAt: hoursAgo(6),
    },
    {
      id: "tk-02",
      clientId: "u-harbor",
      subject: "Starter dashboard feels thin",
      body: "James wants call recordings. Pointed at Pro.",
      status: "pending",
      createdAt: hoursAgo(48),
    },
    {
      id: "tk-03",
      clientId: "u-pike",
      subject: "Add a second on-call greeting for nights",
      body: "Helen wants a shorter night script for the boiler line.",
      status: "resolved",
      createdAt: hoursAgo(120),
    },
  ];

  return { users, agents, numbers, calls, bookings, invoices, tickets };
}

export const BLOG = [
  {
    slug: "fire-the-phone-keep-the-customers",
    title: "Fire the phone, keep the customers",
    dek: "The front desk is a job. It was never a personality test.",
    date: "12 August 2026",
    read: "6 min",
    image: "/images/handset.jpg",
    body: [
      "Most small businesses do not have a receptionist. They have whoever is nearest the phone. That person is usually cutting hair, plating food, or under a sink.",
      "The missed call is not a mystery. It is physics. Two hands, one job, a ringing handset. By the time they wipe off and pick up, the caller has gone to the next listing.",
      "Agent 42 is the person who picks up. Not a menu. Not a promise to call back. A voice with the diary, the prices, and the hours — and the manners to take a message when that is the honest answer.",
      "You keep the customers because someone answered. You keep the work because the person who does the work was not interrupted. That is the whole product.",
      "The transcript arrives a minute later. If something was booked, it is in the calendar. If something was promised, it is in writing. You can read it on the walk to the kettle.",
    ],
  },
  {
    slug: "what-a-24-hour-trial-actually-proves",
    title: "What a 24-hour trial actually proves",
    dek: "A day is long enough to hear your own phone, answered.",
    date: "28 July 2026",
    read: "5 min",
    image: "/images/calendar.jpg",
    body: [
      "We give you twenty-four hours and no card. That is not a teaser. It is the shortest honest test.",
      "In a day, a salon takes somewhere between four and twenty calls. A clinic, more. A trades desk on a Monday, more still. You do not need a month to know whether the voice is right, whether the diary is right, whether a caller was treated well.",
      "What the trial proves: we can launch a number, load your hours and services, and put a receptionist on the line before lunch. What it does not prove: a year of edge cases. Those arrive later, and that is what the dashboard is for.",
      "If it is not right, you walk away. Nothing to cancel, because nothing was charged. If it is right, you pick Starter or Pro and the same number keeps ringing.",
    ],
  },
  {
    slug: "why-minutes-should-stay-usage-based",
    title: "Why minutes should stay usage-based",
    dek: "A quiet February should not subsidise a frantic December.",
    date: "4 June 2026",
    read: "7 min",
    image: "/images/alcove.jpg",
    body: [
      "Phone minutes are not software seats. They are time on a line. Some months you use two hundred. Some months you use seven hundred. Bundling them into the plan makes the quiet months pay for the loud ones, and hides the real cost in marketing.",
      "We charge a service fee for the receptionist, the number, and the desk. Minutes pass through at €0.06. You can see them. You can forecast them. A colour-heavy Saturday is visible. A closed Monday is visible.",
      "This is not a virtue. It is arithmetic. The businesses we like working with already think this way about stock, labour, and heat. The phone should not be the one line on the P&L they cannot explain.",
      "If you need a ceiling, set one in the dashboard. If you need a second number, that is an Enterprise conversation — not an add-on hiding in a cart.",
    ],
  },
] as const;

export const INDUSTRIES = [
  {
    slug: "salons",
    title: "Salons",
    size: "small",
    line: "Colour days should not start with a full voicemail.",
    image: "/images/salon.jpg",
    story:
      "Tuesday at Northlight. Clara is in a foil. The phone rings four times before noon — a balayage enquiry, a blow-dry after work, a gift voucher, a patch-test question. Aoife takes all four. Two become bookings. One becomes a note. Clara reads the brief between clients and does not wash her hands to answer a number she already knows.",
    prompt:
      "You are Aoife, receptionist for Northlight Salon in Marylebone. Hours Tue–Sat. Clara, Faye, and Tom. Colour needs a patch test if it has been more than six months. Last colour at 16:00 Saturday. Be warm, brief, and exact about times.",
  },
  {
    slug: "restaurants",
    title: "Restaurants",
    size: "small",
    line: "The pass is loud. The booking line should not be.",
    image: "/images/restaurant.jpg",
    story:
      "Saturday brunch at Harbor. The front room holds twenty. Walk-ins pool at the door. The dedicated line still rings — a table for six, a pram question, a cake for Sunday. Marcus answers from the number, not the pass. The kitchen never hears the phone. The six-top is on the book before the next ticket lands.",
    prompt:
      "You are Marcus for Harbor Coffee, Leith. Bookings for six or more only. Kitchen 08:00–15:00. Allergen list on request. Two rooms; prams fit the back room. Do not take dinner bookings — there is no dinner service.",
  },
  {
    slug: "trades",
    title: "Trades",
    size: "small",
    line: "A boiler at 9pm should reach a person, not a hold queue.",
    image: "/images/trades.jpg",
    story:
      "Helen Pike is on a roof in Bath. A caller in Weston Park has no hot water. Rhys takes the job, prices the call-out, puts an engineer on the board, and texts the window. Helen sees the ticket when she is back on the ground. Nobody spent twenty minutes on a scaffold with a phone in their teeth.",
    prompt:
      "You are Rhys for Pike & Co. Emergency call-outs seven days. Desk hours 08:00–17:30. Coverage Bristol, Bath, North Somerset. Be plain about rates. Never promise an arrival time tighter than a two-hour window.",
  },
  {
    slug: "retail",
    title: "Retail",
    size: "small",
    line: "The shop floor is for customers in the room. The phone is for everyone else.",
    image: "/images/retail.jpg",
    story:
      "Saturday on the high street. Two people in the fitting room, a queue at the till, and a caller asking if the navy coat is in a 12. The assistant stays with the room. Agent 42 checks stock, holds the piece, and texts a collection window. The sale does not wait on a handset.",
    prompt:
      "You are the desk for a small clothing shop. Hours Mon–Sat 10:00–18:00. You may hold an item for 24 hours. You do not discount. If stock is uncertain, take a name and number and say the floor will confirm.",
  },
  {
    slug: "clinics",
    title: "Clinics",
    size: "medium",
    line: "The waiting room is for patients. The phone is for the desk.",
    image: "/images/clinic.jpg",
    story:
      "A private clinic cannot let the waiting room hear the next caller’s symptoms. Agent 42 takes the line, books inside the rules you set, and writes a transcript the nurse can file. Repeat prescriptions, new-patient packs, and the odd panic about parking — all answered, none of it over the reception hatch.",
    prompt:
      "You are the desk for a private clinic. Do not give clinical advice. Offer the next new-patient slot, take a message for the nurse, or transfer when the caller asks for a named clinician. Confirm every booking by SMS.",
  },
  {
    slug: "professional",
    title: "Professional services",
    size: "medium",
    line: "A solicitor on a call should not also be the switchboard.",
    image: "/images/office.jpg",
    story:
      "A three-partner firm. One is in court, one is with a client, one is writing. The listed number still rings — a new matter, a document chase, a caller who will not give a name. Agent 42 takes the brief, books a slot inside the diary rules, and sends the note upstairs. Nothing leaks into the waiting room.",
    prompt:
      "You are the receptionist for a small law firm. Never discuss a matter. Take a name, a number, and a one-line reason. Offer the next consultation slot or a call-back from the named partner. Confirm by email.",
  },
  {
    slug: "property",
    title: "Property",
    size: "medium",
    line: "Viewings fill the afternoon. The phone should not.",
    image: "/images/property.jpg",
    story:
      "An agent is on a street with a set of keys. A buyer wants a second look at 6.30. A landlord wants to know if the offer landed. Agent 42 books the viewing, notes the offer, and texts the window. The agent reads it between houses, not between rings.",
    prompt:
      "You are the desk for an independent estate agency. Book viewings only in listed slots. Never quote a price off-script. Take offers as a message for the named agent. Confirm every viewing by SMS with the address and time.",
  },
  {
    slug: "hotels",
    title: "Hotels",
    size: "large",
    line: "The night board should not be a voicemail.",
    image: "/images/hotel.jpg",
    story:
      "A forty-room house. The night manager is walking the third floor. A guest wants a late checkout, a caller wants a twin for Thursday, a taxi is early. Agent 42 takes the line, books inside occupancy, and writes the brief for the desk. The house stays quiet. The book stays accurate.",
    prompt:
      "You are the night and overflow desk for a boutique hotel. Confirm arrivals, take restaurant bookings for residents, and never promise a room you cannot see in the diary. Late checkout is at the manager’s discretion — take a message.",
  },
  {
    slug: "logistics",
    title: "Logistics",
    size: "large",
    line: "A bay does not pause for a ringing phone.",
    image: "/images/warehouse.jpg",
    story:
      "A regional depot. Two bays busy, a driver calling in late, a customer chasing a pallet. The supervisor is on the floor. Agent 42 takes the POD request, logs the delay, and books a callback from traffic. The warehouse does not stop. The customer is not left on hold against a shutter.",
    prompt:
      "You are the desk for a regional depot. Take consignment numbers. Do not guess ETAs — offer a two-hour window or a callback from traffic. Yard opening 05:00–20:00. No cash on collection.",
  },
  {
    slug: "multi-site",
    title: "Groups & multi-site",
    size: "large",
    line: "Twelve locations. One standard of answer.",
    image: "/images/city-dusk.jpg",
    story:
      "A group with salons in four cities, or clinics on three floors, or depots on a ring road. Each site has its own diary. Callers still dial one number, or one per brand. Agent 42 routes, books, and writes the brief to the right desk. Head office sees the minutes. The floor is not the switchboard.",
    prompt:
      "You answer for a group. Identify the site from the number or the caller’s request. Book only into that site’s diary. If the site is closed, offer the nearest open desk or a message. Never mix locations in one booking.",
  },
] as const;
