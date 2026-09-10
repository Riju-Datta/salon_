import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Calendar, Clock, ChevronRight, ChevronLeft, Star, MapPin, Phone,
  Mail, Instagram, Check, ArrowRight, User, Gift, Scissors, Search,
  Copy, Share2, CalendarPlus, ChevronDown, Award, RefreshCw, Settings as SettingsIcon,
  Heart, Sparkles, SlidersHorizontal, Wand2, Navigation, ChevronUp,
} from "lucide-react";

/* =========================================================================
   DATA
   ========================================================================= */
const BIZ = {
  name: "LUMÉ",
  fullName: "LUMÉ Studio",
  tagline: "Beauty, refined.",
  phone: "(718) 555-0148",
  email: "hello@lumestudio.demo",
  addressLine1: "128 Mercer Avenue",
  addressLine2: "Brooklyn, NY 11211",
  hours: [
    { day: "Monday", open: 9, close: 19 },
    { day: "Tuesday", open: 9, close: 19 },
    { day: "Wednesday", open: 9, close: 20 },
    { day: "Thursday", open: 9, close: 20 },
    { day: "Friday", open: 9, close: 20 },
    { day: "Saturday", open: 10, close: 18 },
    { day: "Sunday", open: null, close: null },
  ],
};

const CATEGORIES = ["All", "Hair", "Color", "Styling", "Nails", "Beauty", "Treatments"];

const SERVICES = [
  { id: "s1", category: "Hair", name: "Signature Cut", price: 65, duration: 60, popular: true,
    desc: "A precision cut tailored to your face shape and how you actually live in your hair.",
    includes: ["Consultation", "Shampoo & scalp treatment", "Precision cut", "Style finish"],
    recommendedFor: "Anyone due for a refresh, or a first visit with us.",
    aftercare: "Use a sulfate-free shampoo and trim every 6–8 weeks to hold the shape." },
  { id: "s2", category: "Hair", name: "Men's Precision Cut", price: 40, duration: 30, popular: false,
    desc: "Clean lines and controlled texture, built around your natural growth pattern.",
    includes: ["Consultation", "Precision cut", "Neckline clean-up", "Style finish"],
    recommendedFor: "Regular maintenance or a first cut with a new stylist.",
    aftercare: "Rebook every 3–4 weeks to keep the lines sharp." },
  { id: "s3", category: "Color", name: "Color Refresh", price: 110, duration: 90, popular: true,
    desc: "Restores vibrancy to your existing color and blends new growth seamlessly.",
    includes: ["Consultation", "Root refresh", "Gloss", "Blowout"],
    recommendedFor: "Clients maintaining an established color.",
    aftercare: "Space washes 2–3 days apart to extend vibrancy." },
  { id: "s4", category: "Color", name: "Full Color", price: 165, duration: 120, popular: false,
    desc: "A complete single-process color change, formulated to suit your skin tone.",
    includes: ["Consultation & formulation", "Full application", "Gloss", "Blowout"],
    recommendedFor: "A full color change, or covering significant grey.",
    aftercare: "Use color-safe, sulfate-free products for the first two weeks." },
  { id: "s5", category: "Color", name: "Balayage", price: 220, duration: 150, popular: true,
    desc: "Hand-painted, dimensional color for a lived-in, low-maintenance grow-out.",
    includes: ["Consultation", "Hand-painted balayage", "Toner", "Gloss", "Blowout"],
    recommendedFor: "Clients who want dimension without a hard regrowth line.",
    aftercare: "A toning gloss every 8–10 weeks keeps it fresh." },
  { id: "s6", category: "Styling", name: "Blowout", price: 45, duration: 45, popular: true,
    desc: "A smooth, bouncy, salon-fresh finish — no cut, no color, just polish.",
    includes: ["Shampoo", "Blow-dry", "Finishing style"],
    recommendedFor: "A quick refresh before an event, or just because.",
    aftercare: "A silk pillowcase and dry shampoo extend the finish." },
  { id: "s7", category: "Styling", name: "Event Styling", price: 95, duration: 60, popular: false,
    desc: "Formal styling for weddings, galas, and everything worth dressing up for.",
    includes: ["Consultation", "Prep & set", "Finished style", "Touch-up kit"],
    recommendedFor: "Special occasions and formal events.",
    aftercare: "Book a trial run 2–3 weeks ahead of important dates." },
  { id: "s8", category: "Nails", name: "Classic Manicure", price: 35, duration: 30, popular: false,
    desc: "Shape, cuticle care, and polish in your choice of finish.",
    includes: ["Shape & buff", "Cuticle care", "Polish"],
    recommendedFor: "Regular upkeep.",
    aftercare: "Cuticle oil daily keeps polish looking newer, longer." },
  { id: "s9", category: "Nails", name: "Gel Manicure", price: 55, duration: 45, popular: false,
    desc: "Chip-resistant, high-shine color that holds for weeks.",
    includes: ["Shape & buff", "Cuticle care", "Gel polish", "Cure & seal"],
    recommendedFor: "Clients who want longer-lasting color.",
    aftercare: "Avoid picking at gel — book a soak-off removal instead." },
  { id: "s10", category: "Beauty", name: "Express Facial", price: 70, duration: 45, popular: false,
    desc: "A targeted cleanse, exfoliation, and hydration treatment for tired skin.",
    includes: ["Double cleanse", "Exfoliation", "Mask", "Hydration finish"],
    recommendedFor: "Anyone needing a mid-season skin reset.",
    aftercare: "SPF the following morning, always." },
  { id: "s11", category: "Beauty", name: "Brow Shaping", price: 30, duration: 20, popular: false,
    desc: "Wax or tweeze shaping, built around your natural brow line.",
    includes: ["Consultation", "Shape", "Tint on request"],
    recommendedFor: "Brow upkeep between fuller treatments.",
    aftercare: "Avoid retinol products on brows for 24 hours." },
  { id: "s12", category: "Treatments", name: "Gloss + Treatment", price: 85, duration: 75, popular: false,
    desc: "A clear or tinted gloss layered over a deep-conditioning treatment.",
    includes: ["Consultation", "Treatment mask", "Gloss", "Blowout"],
    recommendedFor: "Color-treated or textured hair needing shine and repair.",
    aftercare: "Follow with a weekly hydrating mask at home." },
];

const STYLISTS = [
  { id: "st1", name: "Maya Chen", role: "Senior Stylist", specialties: ["Color", "Balayage", "Precision Cuts"],
    years: 9, rating: 4.9, languages: ["English", "Mandarin"], days: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    bio: "Maya trained in New York and Tokyo and built her chair on a simple idea: color should look like it grew that way.",
    img: "https://i.pravatar.cc/400?img=47" },
  { id: "st2", name: "Sofia Martinez", role: "Color Specialist", specialties: ["Balayage", "Color Correction", "Vivids"],
    years: 7, rating: 4.8, languages: ["English", "Spanish"], days: ["Mon", "Wed", "Thu", "Fri", "Sat"],
    bio: "Sofia's specialty is the fix — regrown color, patchy balayage, tricky corrections. She sees the whole head, not just the section.",
    img: "https://i.pravatar.cc/400?img=32" },
  { id: "st3", name: "Amelia Rose", role: "Style Director", specialties: ["Editorial Styling", "Blowouts", "Event Hair"],
    years: 11, rating: 5.0, languages: ["English"], days: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    bio: "Amelia leads styling for LUMÉ's editorial shoots and brings that same finishing eye to every blowout.",
    img: "https://i.pravatar.cc/400?img=44" },
  { id: "st4", name: "Jordan Lee", role: "Barber & Cutting Specialist", specialties: ["Precision Cuts", "Fades", "Beard Sculpting"],
    years: 6, rating: 4.9, languages: ["English", "Korean"], days: ["Mon", "Tue", "Thu", "Fri", "Sat"],
    bio: "Jordan bridges barbering and salon precision — sharp lines with a softer, more tailored finish.",
    img: "https://i.pravatar.cc/400?img=13" },
];

const REVIEWS = [
  { id: "r1", name: "Emma R.", service: "Hair", label: "Signature Cut", date: "Aug 2026", verified: true,
    quote: "The best haircut I've had in years. Maya understood exactly what I wanted before I finished explaining it." },
  { id: "r2", name: "Daniel K.", service: "Hair", label: "Precision Cut", date: "Jul 2026", verified: true,
    quote: "Jordan's fades are on another level. First barber I've stuck with for more than two visits." },
  { id: "r3", name: "Priya S.", service: "Color", label: "Balayage", date: "Jul 2026", verified: true,
    quote: "Sofia fixed a box-dye disaster in one visit. It grew out beautifully for months after." },
  { id: "r4", name: "Grace L.", service: "Styling", label: "Blowout", date: "Jun 2026", verified: true,
    quote: "My go-to before every event. Amelia's blowouts genuinely last three days." },
  { id: "r5", name: "Noah T.", service: "Beauty", label: "Express Facial", date: "Jun 2026", verified: false,
    quote: "Small studio, big attention to detail. Booking online took under a minute." },
  { id: "r6", name: "Alexa W.", service: "Color", label: "Color Refresh", date: "May 2026", verified: true,
    quote: "Consistent, unrushed, and my color has never been this even. Worth the drive from the city." },
];

/* ---- Real photography, sourced from Pexels (free license, no attribution required) ----
   Credits, kept here for reference:
   Max Vakhtbovych (@artbovich)   — salon interiors: 7750098, 7750099, 7750108, 7750116
   cottonbro studio (@cottonbro)  — haircut & color: 3992865, 3992873, 3992875, 3992876,
                                     3992879, 3993304, 3993320, 3993326
   Engin Akyurt                   — styling/curls: 3065171
   Ali Aliev                      — men's fade: 12074386
   shkraba anthony                — men's haircut: 4625626
   leonardokfn                    — men's haircut: 7781848
*/
function pexels(id, w, h) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${h ? `&h=${h}&fit=crop` : ""}`;
}
const PHOTOS = {
  heroSalon: pexels(7750098, 1400, 1700),
  aboutSalon: pexels(7750116, 1200, 1400),
  artFeature: pexels(7750099, 1600, 1100),
  artGrid: [
    { id: 3992875, alt: "Hairstylist trimming a client's hair, close focus, in the LUMÉ studio" },
    { id: 3992876, alt: "Stylist preparing a client for a precision haircut" },
    { id: 4625626, alt: "Barber giving a modern men's haircut in a contemporary barbershop" },
    { id: 7781848, alt: "Profile view of a client's tailored men's haircut" },
    { id: 3993326, alt: "Hair stylist applying a glossing color treatment" },
    { id: 7750098, alt: "Salon vanity mirrors and styling stations with warm lighting" },
    { id: 7750108, alt: "Contemporary salon interior with illuminated vanity mirrors" },
  ],
};

const OFFERS = [
  { id: "o1", tag: "New Client", title: "20% off your first visit", type: "percent", value: 20 },
  { id: "o2", tag: "Color + Cut", title: "Save $25 on the pair", type: "fixed", value: 25 },
  { id: "o3", tag: "Midweek Reset", title: "10% off Tuesday–Thursday", type: "percent", value: 10 },
];

const REWARD_TIERS = [
  { points: 100, label: "$5 reward" },
  { points: 250, label: "Free treatment add-on" },
  { points: 500, label: "$15 off" },
  { points: 1000, label: "$40 off" },
];

const TIME_TEMPLATE = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"];

/* =========================================================================
   UTIL
   ========================================================================= */
const fmt$ = (n) => `$${n}`;
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const dow3 = (d) => d.toLocaleDateString("en-US", { weekday: "short" });
const dowFull = (d) => d.toLocaleDateString("en-US", { weekday: "long" });
const monthDay = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fullDate = (d) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

function hoursFor(d) {
  const name = dowFull(d);
  return BIZ.hours.find((h) => h.day === name);
}
function isOpenNow() {
  const now = new Date();
  const h = hoursFor(now);
  if (!h || h.open == null) return false;
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour >= h.open && hour < h.close;
}
function statusLabel() {
  const h = hoursFor(new Date());
  if (!h || h.open == null) return "Closed today";
  return isOpenNow() ? `Open today · until ${to12(h.close)}` : `Closed now · opens ${to12(h.open)}`;
}
function to12(hr) {
  const h = hr > 12 ? hr - 12 : hr === 0 ? 12 : hr;
  return `${h}:00 ${hr >= 12 ? "PM" : "AM"}`;
}
function slotHour(label) {
  const [time, ap] = label.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h + m / 60;
}
function seedRand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function buildUpcoming(count = 7) {
  const days = [];
  for (let i = 0; i < count; i++) days.push(addDays(new Date(), i));
  return days;
}
function slotsForDay(date, dayIndex) {
  const h = hoursFor(date);
  if (!h || h.open == null) return [];
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const nowHour = now.getHours() + now.getMinutes() / 60;
  return TIME_TEMPLATE.filter((t) => slotHour(t) >= h.open && slotHour(t) < h.close).map((t, i) => {
    const booked = seedRand(dayIndex * 31 + i * 7 + 3) < 0.28;
    const past = isToday && slotHour(t) <= nowHour + 0.5;
    return { label: t, disabled: booked || past };
  });
}
function dayLevel(date, dayIndex) {
  const slots = slotsForDay(date, dayIndex);
  if (!slots.length) return "closed";
  const open = slots.filter((s) => !s.disabled).length;
  if (open === 0) return "full";
  if (open <= 2) return "limited";
  return "available";
}
function getNextWeekday(targetDow, minDaysOut) {
  let d = addDays(new Date(), minDaysOut);
  while (d.getDay() !== targetDow) d = addDays(d, 1);
  return d;
}
function buildICS(appt) {
  const start = new Date(appt.dateISO);
  const [time, ap] = appt.time.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + appt.duration * 60000);
  const f = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//LUME Studio Demo//EN", "BEGIN:VEVENT",
    `UID:${appt.id}@lumestudio.demo`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${appt.serviceName} at LUME Studio`, `DESCRIPTION:${appt.serviceName} with ${appt.stylistName}`,
    `LOCATION:${BIZ.addressLine1}\\, ${BIZ.addressLine2}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
function downloadICS(appt) {
  const blob = new Blob([buildICS(appt)], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "lume-appointment.ics";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function serviceById(id) { return SERVICES.find((s) => s.id === id) || null; }
function stylistById(id) { return STYLISTS.find((s) => s.id === id) || null; }

function sampleAppt() {
  const d = getNextWeekday(4, 4);
  return { id: "sample-1", serviceId: "s1", serviceName: "Signature Cut", stylistId: "st1", stylistName: "Maya Chen",
    dateISO: d.toISOString(), time: "4:30 PM", duration: 60, price: 65, total: 65, offerTitle: null };
}
const INITIAL_ACCOUNT = {
  name: "Emma Carter", email: "emma@example.com", points: 680, lifetimeVisits: 12,
  favoriteStylist: "Maya Chen", referralCode: "LUME-EMMA15",
  settings: { emailReminders: true, smsReminders: true },
  upcoming: [sampleAppt()],
  history: [
    { id: "h1", serviceId: "s1", serviceName: "Signature Cut", stylistId: "st1", stylistName: "Maya Chen", date: "Aug 12", price: 65 },
    { id: "h2", serviceId: "s6", serviceName: "Blowout", stylistId: "st3", stylistName: "Amelia Rose", date: "Jul 05", price: 45 },
    { id: "h3", serviceId: "s3", serviceName: "Color Refresh", stylistId: "st2", stylistName: "Sofia Martinez", date: "Jun 11", price: 110 },
  ],
};
const INITIAL_DRAFT = { serviceId: null, stylistId: null, dateISO: null, time: null, offerId: null,
  firstName: "", lastName: "", email: "", phone: "", notes: "", agree: false };
const STORAGE_KEY = "lume_demo_v1";

/* =========================================================================
   GLOBAL STYLES
   ========================================================================= */
function GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
      .lume{ --ivory:#FBF7F0; --ivory2:#F3ECDF; --stone:#EAE1CF; --border:#DFD3BC; --charcoal:#231F1C; --charcoalSoft:#5B5349;
        --burgundy:#6B1E3A; --burgundyDark:#4C1526; --rose:#B98089; --gold:#A6874F; --white:#FFFFFF;
        background:var(--ivory); color:var(--charcoal); font-family:'Inter',sans-serif; position:relative;
        -webkit-font-smoothing:antialiased; }
      .lume *{ box-sizing:border-box; }
      .lume .serif{ font-family:'Cormorant Garamond',serif; }
      .lume .eyebrow{ font-family:'Inter',sans-serif; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--burgundy); font-weight:600; }
      .lume h1,.lume h2,.lume h3{ font-family:'Cormorant Garamond',serif; font-weight:500; line-height:1.08; color:var(--charcoal); margin:0; }
      .lume .container{ max-width:1200px; margin:0 auto; padding:0 20px; }
      @media(min-width:768px){ .lume .container{ padding:0 40px; } }
      .lume section.sec{ padding:64px 0; }
      @media(min-width:768px){ .lume section.sec{ padding:96px 0; } }
      .lume .sec-alt{ background:var(--ivory2); }
      .lume .btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; font-family:'Inter',sans-serif;
        font-size:13px; font-weight:600; letter-spacing:.03em; padding:14px 26px; border-radius:2px; cursor:pointer;
        border:1px solid transparent; transition:all .25s ease; white-space:nowrap; }
      .lume .btn:focus-visible{ outline:2px solid var(--burgundy); outline-offset:2px; }
      .lume .btn-primary{ background:var(--burgundy); color:var(--white); }
      .lume .btn-primary:hover{ background:var(--burgundyDark); transform:translateY(-1px); }
      .lume .btn-outline{ background:transparent; color:var(--charcoal); border-color:var(--charcoal); }
      .lume .btn-outline:hover{ background:var(--charcoal); color:var(--white); }
      .lume .btn-ghost{ background:transparent; color:var(--burgundy); padding:8px 4px; }
      .lume .btn-ghost:hover{ color:var(--burgundyDark); }
      .lume .btn-sm{ padding:9px 16px; font-size:12px; }
      .lume .btn-block{ width:100%; }
      .lume .btn:disabled{ opacity:.4; cursor:not-allowed; transform:none; }
      .lume .card{ background:var(--white); border:1px solid var(--border); border-radius:3px; }
      .lume .icon-btn{ width:38px; height:38px; display:inline-flex; align-items:center; justify-content:center; border-radius:2px;
        border:1px solid var(--border); background:transparent; cursor:pointer; color:var(--charcoal); transition:all .2s ease; }
      .lume .icon-btn:hover{ background:var(--stone); }
      .lume .badge{ display:inline-flex; align-items:center; gap:5px; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase;
        font-weight:600; padding:5px 9px; border-radius:2px; background:var(--stone); color:var(--charcoalSoft); }
      .lume .badge-pop{ background:var(--burgundy); color:var(--white); }
      .lume .chip{ font-size:12.5px; font-weight:500; padding:8px 16px; border-radius:20px; border:1px solid var(--border);
        background:var(--white); color:var(--charcoalSoft); cursor:pointer; transition:all .2s ease; white-space:nowrap; }
      .lume .chip.active{ background:var(--charcoal); border-color:var(--charcoal); color:var(--white); }
      .lume .scrollx{ display:flex; gap:10px; overflow-x:auto; padding-bottom:4px; scrollbar-width:none; }
      .lume .scrollx::-webkit-scrollbar{ display:none; }
      /* nav */
      .lume .nav{ position:sticky; top:0; z-index:40; background:rgba(251,247,240,.7); backdrop-filter:blur(0px);
        border-bottom:1px solid transparent; transition:all .3s ease; }
      .lume .nav.scrolled{ background:rgba(251,247,240,.92); backdrop-filter:blur(10px); border-bottom-color:var(--border); }
      .lume .nav-inner{ display:flex; align-items:center; justify-content:space-between; padding:20px 0; transition:padding .3s ease; }
      .lume .nav.scrolled .nav-inner{ padding:13px 0; }
      .lume .nav-logo{ font-family:'Cormorant Garamond',serif; font-size:26px; letter-spacing:.06em; font-weight:600; color:var(--charcoal); cursor:pointer; background:none; border:none; }
      .lume .nav-links{ display:none; gap:32px; }
      @media(min-width:900px){ .lume .nav-links{ display:flex; } }
      .lume .nav-link{ background:none; border:none; font-size:13px; font-weight:500; color:var(--charcoalSoft); cursor:pointer; padding:6px 0; position:relative; }
      .lume .nav-link:hover{ color:var(--charcoal); }
      .lume .nav-right{ display:flex; align-items:center; gap:12px; }
      .lume .nav-cta{ display:none; }
      @media(min-width:640px){ .lume .nav-cta{ display:inline-flex; } }
      .lume .nav-mobile-toggle{ display:inline-flex; }
      @media(min-width:900px){ .lume .nav-mobile-toggle{ display:none; } }
      /* promo banner */
      .lume .promo{ background:var(--charcoal); color:var(--ivory); font-size:12.5px; }
      .lume .promo-inner{ display:flex; align-items:center; justify-content:center; gap:14px; padding:10px 44px 10px 20px; text-align:center; position:relative; flex-wrap:wrap; }
      .lume .promo-close{ position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--ivory); opacity:.7; cursor:pointer; padding:4px; }
      .lume .promo-close:hover{ opacity:1; }
      /* mobile menu */
      .lume .mmenu{ position:fixed; inset:0; z-index:60; background:var(--ivory); display:flex; flex-direction:column; padding:20px; transform:translateX(100%); transition:transform .3s ease; }
      .lume .mmenu.open{ transform:translateX(0); }
      .lume .mmenu a, .lume .mmenu button.mlink{ font-family:'Cormorant Garamond',serif; font-size:32px; text-align:left; background:none; border:none; padding:14px 0; color:var(--charcoal); border-bottom:1px solid var(--border); }
      /* hero */
      .lume .hero{ padding:44px 0 64px; }
      @media(min-width:900px){ .lume .hero{ padding:64px 0 90px; } }
      .lume .hero-grid{ display:grid; grid-template-columns:1fr; gap:36px; align-items:center; }
      @media(min-width:900px){ .lume .hero-grid{ grid-template-columns:1fr 1fr; gap:56px; } }
      .lume .hero h1{ font-size:44px; letter-spacing:-.01em; }
      @media(min-width:640px){ .lume .hero h1{ font-size:58px; } }
      @media(min-width:1100px){ .lume .hero h1{ font-size:68px; } }
      .lume .hero-img-wrap{ position:relative; border-radius:3px; overflow:hidden; aspect-ratio:4/5; background:var(--stone); }
      .lume .hero-img-wrap img{ width:100%; height:100%; object-fit:cover; display:block; }
      .lume .float-card{ position:absolute; background:var(--white); border-radius:3px; box-shadow:0 14px 34px rgba(35,31,28,.16); padding:14px 16px; }
      .lume .duotone{ filter:sepia(.22) saturate(1.3) contrast(1.05) grayscale(.12); }
      /* about */
      .lume .about-grid{ display:grid; grid-template-columns:1fr; gap:36px; align-items:center; }
      @media(min-width:900px){ .lume .about-grid{ grid-template-columns:1fr 1fr; gap:56px; } }
      .lume .about-img-wrap{ border-radius:3px; overflow:hidden; aspect-ratio:4/5; background:var(--stone); }
      .lume .about-img-wrap img{ width:100%; height:100%; object-fit:cover; display:block; }
      .lume .about-features{ display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:30px; }
      .lume .feature-item{ padding-top:14px; border-top:1px solid var(--border); }
      /* art of hair */
      .lume .art-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
      @media(min-width:640px){ .lume .art-grid{ grid-template-columns:repeat(4,1fr); } }
      .lume .art-feature{ grid-column:span 2; grid-row:span 2; border-radius:3px; overflow:hidden; aspect-ratio:4/3; }
      @media(min-width:640px){ .lume .art-feature{ aspect-ratio:auto; height:100%; min-height:420px; } }
      .lume .art-thumb{ border-radius:3px; overflow:hidden; aspect-ratio:1/1; }
      .lume .art-feature img, .lume .art-thumb img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
      .lume .art-feature:hover img, .lume .art-thumb:hover img{ transform:scale(1.04); }
      /* quick booking */
      .lume .qb{ margin-top:-40px; position:relative; z-index:5; }
      @media(min-width:900px){ .lume .qb{ margin-top:-56px; } }
      .lume .qb-card{ background:var(--white); border:1px solid var(--border); border-radius:4px; padding:22px; box-shadow:0 20px 50px rgba(35,31,28,.10); }
      .lume .qb-grid{ display:grid; grid-template-columns:1fr; gap:14px; }
      @media(min-width:800px){ .lume .qb-grid{ grid-template-columns:1fr 1fr 1fr 1fr auto; align-items:end; } }
      .lume .field label{ display:block; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--charcoalSoft); margin-bottom:6px; font-weight:600; }
      .lume select, .lume input, .lume textarea{ width:100%; font-family:'Inter',sans-serif; font-size:14px; padding:11px 12px; border:1px solid var(--border);
        border-radius:2px; background:var(--white); color:var(--charcoal); }
      .lume select:focus, .lume input:focus, .lume textarea:focus{ outline:2px solid var(--burgundy); outline-offset:1px; border-color:var(--burgundy); }
      /* services grid */
      .lume .svc-toolbar{ display:flex; flex-wrap:wrap; gap:14px; align-items:center; justify-content:space-between; margin:28px 0 30px; }
      .lume .svc-search{ position:relative; max-width:260px; flex:1 1 200px; }
      .lume .svc-search svg{ position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--charcoalSoft); }
      .lume .svc-search input{ padding-left:34px; }
      .lume .svc-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
      @media(min-width:640px){ .lume .svc-grid{ grid-template-columns:1fr 1fr; } }
      @media(min-width:1024px){ .lume .svc-grid{ grid-template-columns:1fr 1fr 1fr; } }
      .lume .svc-card{ padding:22px; display:flex; flex-direction:column; gap:10px; transition:box-shadow .25s ease, transform .25s ease; cursor:pointer; }
      .lume .svc-card:hover{ box-shadow:0 14px 32px rgba(35,31,28,.10); transform:translateY(-2px); }
      .lume .svc-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }
      .lume .svc-price{ font-family:'Cormorant Garamond',serif; font-size:26px; color:var(--burgundy); white-space:nowrap; }
      .lume .svc-meta{ display:flex; gap:10px; align-items:center; font-size:12px; color:var(--charcoalSoft); }
      /* stylists */
      .lume .sty-grid{ display:grid; grid-template-columns:1fr; gap:20px; }
      @media(min-width:640px){ .lume .sty-grid{ grid-template-columns:1fr 1fr; } }
      @media(min-width:1024px){ .lume .sty-grid{ grid-template-columns:repeat(4,1fr); } }
      .lume .sty-card{ overflow:hidden; cursor:pointer; }
      .lume .sty-photo{ aspect-ratio:3/4; overflow:hidden; background:var(--stone); }
      .lume .sty-photo img{ width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
      .lume .sty-card:hover .sty-photo img{ transform:scale(1.05); }
      .lume .sty-body{ padding:16px 18px 20px; }
      /* reviews */
      .lume .rev-grid{ display:grid; grid-template-columns:1fr; gap:18px; }
      @media(min-width:768px){ .lume .rev-grid{ grid-template-columns:1fr 1fr; } }
      @media(min-width:1100px){ .lume .rev-grid{ grid-template-columns:1fr 1fr 1fr; } }
      .lume .rev-card{ padding:24px; }
      /* offers */
      .lume .off-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
      @media(min-width:768px){ .lume .off-grid{ grid-template-columns:repeat(3,1fr); } }
      .lume .off-card{ padding:26px; background:var(--charcoal); color:var(--ivory); border-radius:3px; }
      .lume .off-card .btn-outline{ border-color:var(--ivory); color:var(--ivory); }
      .lume .off-card .btn-outline:hover{ background:var(--ivory); color:var(--charcoal); }
      /* location */
      .lume .loc-grid{ display:grid; grid-template-columns:1fr; gap:32px; }
      @media(min-width:900px){ .lume .loc-grid{ grid-template-columns:1fr 1fr; } }
      .lume .hours-row{ display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid var(--border); font-size:13.5px; }
      .lume .map-box{ position:relative; aspect-ratio:4/3; border-radius:3px; overflow:hidden; border:1px solid var(--border);
        background-image:
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px);
        background-size:28px 28px; background-color:var(--ivory2); }
      .lume .map-pin{ position:absolute; left:50%; top:44%; transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center; }
      /* rewards */
      .lume .rw-track{ height:8px; border-radius:4px; background:var(--stone); overflow:hidden; }
      .lume .rw-fill{ height:100%; background:var(--burgundy); transition:width .5s ease; }
      .lume .tier-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
      @media(min-width:640px){ .lume .tier-grid{ grid-template-columns:repeat(4,1fr); } }
      .lume .tier-card{ padding:16px; text-align:center; }
      /* footer */
      .lume footer{ background:var(--charcoal); color:var(--ivory); padding:56px 0 26px; }
      .lume .foot-grid{ display:grid; grid-template-columns:1fr; gap:32px; }
      @media(min-width:768px){ .lume .foot-grid{ grid-template-columns:1.4fr 1fr 1fr 1fr; } }
      .lume .foot-link{ display:block; font-size:13.5px; color:#D9CFC0; text-decoration:none; padding:5px 0; background:none; border:none; text-align:left; cursor:pointer; }
      .lume .foot-link:hover{ color:var(--ivory); }
      /* overlays */
      .lume .overlay-bg{ position:fixed; inset:0; background:rgba(35,31,28,.5); z-index:70; animation:fadeIn .2s ease; }
      .lume .drawer{ position:fixed; top:0; right:0; bottom:0; width:100%; background:var(--ivory); z-index:71; display:flex; flex-direction:column;
        transform:translateX(100%); transition:transform .32s ease; box-shadow:-10px 0 40px rgba(0,0,0,.15); }
      .lume .drawer.open{ transform:translateX(0); }
      @media(min-width:640px){ .lume .drawer{ width:460px; } }
      .lume .drawer-head{ display:flex; align-items:center; justify-content:space-between; padding:18px 22px; border-bottom:1px solid var(--border); }
      .lume .drawer-body{ flex:1; overflow-y:auto; padding:20px 22px; }
      .lume .drawer-foot{ border-top:1px solid var(--border); padding:16px 22px; background:var(--white); }
      .lume .modal-panel{ position:fixed; z-index:75; background:var(--ivory); border-radius:4px; top:50%; left:50%; transform:translate(-50%,-50%);
        width:min(560px,92vw); max-height:86vh; overflow-y:auto; box-shadow:0 30px 70px rgba(0,0,0,.3); }
      .lume .steps{ display:flex; gap:6px; margin-bottom:22px; }
      .lume .step-dot{ flex:1; height:3px; border-radius:2px; background:var(--border); }
      .lume .step-dot.done{ background:var(--burgundy); }
      .lume .step-dot.current{ background:var(--gold); }
      .lume .date-chip{ flex:0 0 auto; width:64px; padding:10px 6px; border-radius:3px; border:1px solid var(--border); background:var(--white);
        text-align:center; cursor:pointer; }
      .lume .date-chip.selected{ border-color:var(--burgundy); background:var(--burgundy); color:var(--white); }
      .lume .date-chip.disabled{ opacity:.35; cursor:not-allowed; }
      .lume .dot{ width:6px; height:6px; border-radius:50%; display:inline-block; margin-top:4px; }
      .lume .dot.available{ background:#6E8F5C; } .lume .dot.limited{ background:#C9922B; } .lume .dot.full,.lume .dot.closed{ background:#B54A4A; }
      .lume .time-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
      @media(min-width:420px){ .lume .time-grid{ grid-template-columns:repeat(3,1fr); } }
      .lume .time-slot{ padding:11px 4px; text-align:center; border:1px solid var(--border); border-radius:2px; background:var(--white); font-size:13px; cursor:pointer; }
      .lume .time-slot.selected{ background:var(--charcoal); border-color:var(--charcoal); color:var(--white); }
      .lume .time-slot:disabled{ opacity:.32; cursor:not-allowed; text-decoration:line-through; }
      .lume .summary-line{ display:flex; justify-content:space-between; font-size:14px; padding:7px 0; }
      .lume .toggle{ width:42px; height:24px; border-radius:14px; background:var(--border); position:relative; cursor:pointer; border:none; flex:0 0 auto; }
      .lume .toggle.on{ background:var(--burgundy); }
      .lume .toggle .knob{ position:absolute; top:3px; left:3px; width:18px; height:18px; border-radius:50%; background:var(--white); transition:left .2s ease; }
      .lume .toggle.on .knob{ left:21px; }
      .lume .portal-tabs{ display:flex; gap:4px; overflow-x:auto; border-bottom:1px solid var(--border); margin-bottom:22px; scrollbar-width:none; }
      .lume .portal-tabs::-webkit-scrollbar{ display:none; }
      .lume .ptab{ padding:10px 14px; font-size:13px; font-weight:600; background:none; border:none; color:var(--charcoalSoft); border-bottom:2px solid transparent; cursor:pointer; white-space:nowrap; }
      .lume .ptab.active{ color:var(--burgundy); border-color:var(--burgundy); }
      /* toasts */
      .lume .toast-wrap{ position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:90; display:flex; flex-direction:column; gap:8px; align-items:center; width:92%; max-width:380px; }
      .lume .toast{ background:var(--charcoal); color:var(--ivory); padding:12px 18px; border-radius:3px; font-size:13px; display:flex; align-items:center; gap:8px; box-shadow:0 10px 26px rgba(0,0,0,.25); animation:slideUp .25s ease; width:100%; justify-content:center; text-align:center; }
      /* demo tools */
      .lume .demo-fab{ position:fixed; left:18px; bottom:18px; z-index:55; width:46px; height:46px; border-radius:50%; background:var(--charcoal); color:var(--ivory);
        border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 10px 26px rgba(0,0,0,.25); }
      .lume .demo-panel{ position:fixed; left:18px; bottom:74px; z-index:55; background:var(--white); border:1px solid var(--border); border-radius:4px;
        padding:14px; width:230px; box-shadow:0 20px 50px rgba(0,0,0,.2); }
      .lume .demo-tag{ position:fixed; right:14px; bottom:14px; z-index:30; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase;
        color:var(--charcoalSoft); background:rgba(255,255,255,.7); padding:4px 8px; border-radius:2px; border:1px solid var(--border); }
      @keyframes fadeIn{ from{opacity:0;} to{opacity:1;} }
      @keyframes slideUp{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }
      @media (prefers-reduced-motion: reduce){ .lume *{ animation:none !important; transition:none !important; } }
    ` }} />
  );
}

/* =========================================================================
   SMALL SHARED PIECES
   ========================================================================= */
function Eyebrow({ children }) { return <div className="eyebrow">{children}</div>; }

function StarRow({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} fill={i <= Math.round(rating) ? "#A6874F" : "none"} color="#A6874F" />
      ))}
    </div>
  );
}

function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className="toast"><Check size={14} />{t.msg}</div>
      ))}
    </div>
  );
}

/* =========================================================================
   APP
   ========================================================================= */
export default function App() {
  const [account, setAccount] = useState(INITIAL_ACCOUNT);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [draft, setDraft] = useState(INITIAL_DRAFT);
  const [step, setStep] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState("steps"); // steps | success
  const [confirmed, setConfirmed] = useState(null);

  const [portalOpen, setPortalOpen] = useState(false);
  const [portalTab, setPortalTab] = useState("overview");

  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDraft, setRescheduleDraft] = useState({ dateISO: null, time: null });
  const [cancelId, setCancelId] = useState(null);

  const [serviceModal, setServiceModal] = useState(null);
  const [stylistModal, setStylistModal] = useState(null);

  const [reviewFilter, setReviewFilter] = useState("All");
  const [svcCategory, setSvcCategory] = useState("All");
  const [svcSearch, setSvcSearch] = useState("");
  const [svcSort, setSvcSort] = useState("default");

  const [demoOpen, setDemoOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const upcoming = buildUpcoming(7);

  /* ---- persistence ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.account) setAccount(parsed.account);
        if (typeof parsed.promoDismissed === "boolean") setPromoDismissed(parsed.promoDismissed);
      }
    } catch (e) {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ account, promoDismissed })); } catch (e) {}
  }, [account, promoDismissed, hydrated]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (serviceModal) setServiceModal(null);
      else if (stylistModal) setStylistModal(null);
      else if (cancelId) setCancelId(null);
      else if (rescheduleId) setRescheduleId(null);
      else if (portalOpen) setPortalOpen(false);
      else if (drawerOpen) setDrawerOpen(false);
      else if (mobileMenu) setMobileMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [serviceModal, stylistModal, cancelId, rescheduleId, portalOpen, drawerOpen, mobileMenu]);

  function pushToast(msg) {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }

  function scrollToId(id) {
    setMobileMenu(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openBooking(preset = {}) {
    setPortalOpen(false);
    setMobileMenu(false);
    const nd = { ...INITIAL_DRAFT, ...preset };
    setDraft(nd);
    setStep(nd.serviceId ? (nd.stylistId ? 3 : 2) : 1);
    setDrawerView("steps");
    setDrawerOpen(true);
  }
  function closeBooking() { setDrawerOpen(false); }

  function confirmBooking() {
    const svc = serviceById(draft.serviceId);
    const sty = stylistById(draft.stylistId) || { name: "Any available stylist", id: null };
    const offer = OFFERS.find((o) => o.id === draft.offerId);
    const subtotal = svc.price;
    const discount = offer ? (offer.type === "percent" ? Math.round((subtotal * offer.value) / 100) : offer.value) : 0;
    const total = Math.max(subtotal - discount, 0);
    const appt = {
      id: "a" + Date.now(), serviceId: svc.id, serviceName: svc.name, stylistId: sty.id, stylistName: sty.name,
      dateISO: draft.dateISO, time: draft.time, duration: svc.duration, price: subtotal, discount, total,
      offerTitle: offer ? offer.title : null,
    };
    setAccount((a) => ({
      ...a,
      points: a.points + Math.round(total),
      lifetimeVisits: a.lifetimeVisits + 1,
      favoriteStylist: sty.id ? sty.name : a.favoriteStylist,
      upcoming: [appt, ...a.upcoming],
    }));
    setConfirmed(appt);
    setDrawerView("success");
  }

  function rescheduleConfirm() {
    if (!rescheduleDraft.dateISO || !rescheduleDraft.time) return;
    setAccount((a) => ({
      ...a,
      upcoming: a.upcoming.map((u) => (u.id === rescheduleId ? { ...u, dateISO: rescheduleDraft.dateISO, time: rescheduleDraft.time } : u)),
    }));
    pushToast("Appointment rescheduled.");
    setRescheduleId(null);
    setRescheduleDraft({ dateISO: null, time: null });
  }

  function cancelConfirm() {
    setAccount((a) => ({ ...a, upcoming: a.upcoming.filter((u) => u.id !== cancelId) }));
    pushToast("Your appointment has been cancelled.");
    setCancelId(null);
  }

  function bookAgain(h) {
    setPortalOpen(false);
    openBooking({ serviceId: h.serviceId, stylistId: h.stylistId });
  }

  function redeemReward(tier) {
    if (account.points < tier.points) { pushToast("Not enough points yet."); return; }
    setAccount((a) => ({ ...a, points: a.points - tier.points }));
    pushToast(`Reward redeemed — ${tier.label}`);
  }
  function simulateReferral() {
    setAccount((a) => ({ ...a, points: a.points + 100 }));
    pushToast("Referral bonus added — +100 points.");
  }
  function copyCode() {
    try { navigator.clipboard.writeText(account.referralCode); } catch (e) {}
    pushToast("Referral code copied.");
  }
  function shareReferral() {
    try { navigator.clipboard.writeText(`https://lumestudio.demo/r/${account.referralCode}`); } catch (e) {}
    pushToast("Referral link copied.");
  }
  function toggleSetting(key) {
    setAccount((a) => ({ ...a, settings: { ...a.settings, [key]: !a.settings[key] } }));
    pushToast("Preferences updated.");
  }
  function resetDemo() {
    setAccount(INITIAL_ACCOUNT);
    setPromoDismissed(false);
    setDrawerOpen(false); setPortalOpen(false); setDemoOpen(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    pushToast("Demo reset.");
  }
  function loadSample() {
    setAccount((a) => (a.upcoming.length ? a : { ...a, upcoming: [sampleAppt()] }));
    pushToast("Sample appointment loaded.");
    setDemoOpen(false);
  }

  const svcList = SERVICES
    .filter((s) => svcCategory === "All" || s.category === svcCategory)
    .filter((s) => s.name.toLowerCase().includes(svcSearch.toLowerCase()))
    .sort((a, b) => (svcSort === "price" ? a.price - b.price : svcSort === "duration" ? a.duration - b.duration : 0));

  const reviewList = REVIEWS.filter((r) => reviewFilter === "All" || r.service === reviewFilter);

  const draftSvc = serviceById(draft.serviceId);
  const draftSty = draft.stylistId ? stylistById(draft.stylistId) : null;

  return (
    <div className="lume">
      <GlobalStyles />

      {!promoDismissed && (
        <div className="promo">
          <div className="promo-inner">
            <Sparkles size={14} />
            <span><strong>New client offer</strong> — 20% off your first visit</span>
            <button className="btn btn-sm" style={{ background: "var(--gold)", color: "var(--charcoal)", padding: "6px 14px" }}
              onClick={() => openBooking({ offerId: "o1" })}>Claim Offer</button>
            <button className="promo-close" aria-label="Dismiss offer banner" onClick={() => setPromoDismissed(true)}><X size={15} /></button>
          </div>
        </div>
      )}

      {/* NAV */}
      <div className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <button className="nav-logo" onClick={() => scrollToId("home")}>{BIZ.name}</button>
          <div className="nav-links">
            {["About", "Services", "Stylists", "Reviews", "Rewards"].map((n) => (
              <button key={n} className="nav-link" onClick={() => scrollToId(n.toLowerCase())}>{n}</button>
            ))}
          </div>
          <div className="nav-right">
            <button className="icon-btn" aria-label="My account" onClick={() => setPortalOpen(true)}><User size={17} /></button>
            <button className="btn btn-primary btn-sm nav-cta" onClick={() => openBooking()}>Book Appointment</button>
            <button className="icon-btn nav-mobile-toggle" aria-label="Open menu" onClick={() => setMobileMenu(true)}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mmenu ${mobileMenu ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!mobileMenu}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="nav-logo">{BIZ.name}</span>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMobileMenu(false)}><X size={18} /></button>
        </div>
        <div style={{ marginTop: 20, flex: 1 }}>
          {["Home", "About", "Services", "Stylists", "Reviews", "Rewards"].map((n) => (
            <button key={n} className="mlink" onClick={() => scrollToId(n.toLowerCase())}>{n}</button>
          ))}
        </div>
        <button className="btn btn-primary btn-block" onClick={() => openBooking()}>Book Appointment</button>
        <button className="btn btn-outline btn-block" style={{ marginTop: 10 }} onClick={() => { setMobileMenu(false); setPortalOpen(true); }}>My Account</button>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div>
            <Eyebrow>Modern Beauty Studio</Eyebrow>
            <h1 style={{ marginTop: 12 }}>Your next signature<br />look starts here.</h1>
            <p className="serif" style={{ fontSize: 19, color: "var(--charcoalSoft)", marginTop: 18, maxWidth: 420, lineHeight: 1.5 }}>
              Thoughtful cuts, color, styling and beauty rituals designed around you.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => openBooking()}>Book an Appointment <ArrowRight size={15} /></button>
              <button className="btn btn-outline" onClick={() => scrollToId("services")}>Explore Services</button>
            </div>
          </div>
          <div className="hero-img-wrap">
            <img src={PHOTOS.heroSalon} alt="Sunlit LUMÉ styling station with mirrors and warm ambient lighting" />
            <div className="float-card" style={{ top: 18, left: 18 }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--charcoalSoft)", fontWeight: 600 }}>Next available</div>
              <div className="serif" style={{ fontSize: 20, marginTop: 2 }}>Today · 4:30 PM</div>
            </div>
            <div className="float-card" style={{ bottom: 18, right: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="dot available" style={{ marginTop: 0 }} />
              <span style={{ fontSize: 12.5 }}>{statusLabel()}</span>
            </div>
            <div className="float-card" style={{ bottom: 18, left: 18 }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--charcoalSoft)", fontWeight: 600 }}>From</div>
              <div className="serif" style={{ fontSize: 20 }}>$40</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BOOKING */}
      <div className="container qb">
        <div className="qb-card">
          <div className="serif" style={{ fontSize: 22, marginBottom: 16 }}>Book your visit</div>
          <QuickBooking upcoming={upcoming} onFind={openBooking} />
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="sec">
        <div className="container about-grid">
          <div className="about-img-wrap">
            <img src={PHOTOS.aboutSalon} alt="Warm, spacious LUMÉ studio seating area with marble floor and soft lighting" />
          </div>
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 style={{ fontSize: 36, marginTop: 10 }}>Beauty, refined.</h2>
            <p style={{ fontSize: 15, color: "var(--charcoalSoft)", marginTop: 16, lineHeight: 1.7 }}>
              LUMÉ Studio was built around a simple idea: beauty should feel personal. Great hair isn't styled from a chart — it's considered, appointment by appointment, around the person actually sitting in the chair.
            </p>
            <p style={{ fontSize: 15, color: "var(--charcoalSoft)", marginTop: 14, lineHeight: 1.7 }}>
              Every visit starts with a real conversation about your features, your routine, and how you want to feel when you leave. From there, our artists combine modern technique with unhurried consultation — refined cuts, dimensional color, effortless styling.
            </p>
            <p style={{ fontSize: 15, color: "var(--charcoalSoft)", marginTop: 14, lineHeight: 1.7 }}>
              Nothing about the LUMÉ experience is rushed. It's calm, considered, and entirely yours.
            </p>
            <div className="about-features">
              {[
                { icon: Heart, label: "Personalised", desc: "Consultations designed around you." },
                { icon: Award, label: "Expert", desc: "Modern technique with professional precision." },
                { icon: Sparkles, label: "Considered", desc: "Premium products and thoughtful details." },
                { icon: Check, label: "Effortless", desc: "Beautiful results designed for real life." },
              ].map((f) => (
                <div key={f.label} className="feature-item">
                  <f.icon size={18} color="var(--burgundy)" />
                  <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 8 }}>{f.label}</div>
                  <div style={{ fontSize: 12.5, color: "var(--charcoalSoft)", marginTop: 3 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE ART OF HAIR */}
      <section id="art-of-hair" className="sec sec-alt">
        <div className="container">
          <Eyebrow>Editorial</Eyebrow>
          <h2 style={{ fontSize: 40, marginTop: 10 }}>The Art of Hair.</h2>
          <p className="serif" style={{ fontSize: 18, color: "var(--charcoalSoft)", marginTop: 8, maxWidth: 520 }}>
            Precision cuts, effortless styling, and considered color — crafted around you.
          </p>
          <div className="art-grid" style={{ marginTop: 30 }}>
            <div className="art-feature">
              <img src={PHOTOS.artFeature} alt="Wide view of the LUMÉ studio's sleek, modern seating area" />
            </div>
            {PHOTOS.artGrid.map((p) => (
              <div key={p.id} className="art-thumb">
                <img src={pexels(p.id, 700, 700)} alt={p.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="sec">
        <div className="container">
          <Eyebrow>Service Menu</Eyebrow>
          <h2 style={{ fontSize: 40, marginTop: 10 }}>Services designed around you.</h2>

          <div className="svc-toolbar">
            <div className="scrollx">
              {CATEGORIES.map((c) => (
                <button key={c} className={`chip ${svcCategory === c ? "active" : ""}`} onClick={() => setSvcCategory(c)}>{c}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div className="svc-search">
                <Search size={15} />
                <input placeholder="Search services" value={svcSearch} onChange={(e) => setSvcSearch(e.target.value)} />
              </div>
              <select style={{ width: 150 }} value={svcSort} onChange={(e) => setSvcSort(e.target.value)}>
                <option value="default">Sort: Featured</option>
                <option value="price">Sort: Price</option>
                <option value="duration">Sort: Duration</option>
              </select>
            </div>
          </div>

          <div className="svc-grid">
            {svcList.map((s) => (
              <div key={s.id} className="card svc-card" onClick={() => setServiceModal(s)}>
                <div className="svc-top">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</div>
                    <div className="svc-meta" style={{ marginTop: 6 }}><Clock size={12} />{s.duration} min</div>
                  </div>
                  {s.popular && <span className="badge badge-pop">Popular</span>}
                </div>
                <p style={{ fontSize: 13.5, color: "var(--charcoalSoft)", lineHeight: 1.5 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 8 }}>
                  <span className="svc-price">{fmt$(s.price)}</span>
                  <button className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600, fontSize: 13 }}
                    onClick={(e) => { e.stopPropagation(); openBooking({ serviceId: s.id }); }}>Book <ArrowRight size={13} /></button>
                </div>
              </div>
            ))}
            {svcList.length === 0 && <p style={{ color: "var(--charcoalSoft)" }}>No services match that search.</p>}
          </div>
        </div>
      </section>

      {/* STYLISTS */}
      <section id="stylists" className="sec sec-alt">
        <div className="container">
          <Eyebrow>Our Artists</Eyebrow>
          <h2 style={{ fontSize: 40, marginTop: 10 }}>Meet the artists behind the chair.</h2>
          <div className="sty-grid" style={{ marginTop: 30 }}>
            {STYLISTS.map((st) => (
              <div key={st.id} className="card sty-card" onClick={() => setStylistModal(st)}>
                <div className="sty-photo"><img src={st.img} alt={`Portrait of ${st.name}`} /></div>
                <div className="sty-body">
                  <div style={{ fontWeight: 600 }}>{st.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--burgundy)", marginTop: 2 }}>{st.role}</div>
                  <div style={{ fontSize: 12, color: "var(--charcoalSoft)", marginTop: 8 }}>{st.specialties.slice(0, 2).join(" · ")}</div>
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <StarRow rating={st.rating} />
                    <span className="btn-ghost" style={{ fontSize: 12, fontWeight: 600 }}>View Profile</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="sec sec-alt">
        <div className="container">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 style={{ fontSize: 40, marginTop: 10 }}>Loved by our clients.</h2>
          <div style={{ fontSize: 12, color: "var(--charcoalSoft)", marginTop: 6 }}>Demo testimonials</div>
          <div className="scrollx" style={{ margin: "20px 0" }}>
            {["All", "Hair", "Color", "Styling", "Beauty"].map((c) => (
              <button key={c} className={`chip ${reviewFilter === c ? "active" : ""}`} onClick={() => setReviewFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="rev-grid">
            {reviewList.map((r) => (
              <div key={r.id} className="card rev-card">
                <StarRow rating={5} />
                <p className="serif" style={{ fontSize: 18, marginTop: 12, lineHeight: 1.4 }}>&ldquo;{r.quote}&rdquo;</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 12.5, color: "var(--charcoalSoft)" }}>
                  <span>{r.name} · {r.label}</span>
                  <span>{r.date}</span>
                </div>
                {r.verified && <div className="badge" style={{ marginTop: 10 }}><Check size={11} /> Verified visit</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="sec">
        <div className="container">
          <Eyebrow>Special Offers</Eyebrow>
          <h2 style={{ fontSize: 34, marginTop: 10, marginBottom: 26 }}>A few reasons to book this week.</h2>
          <div className="off-grid">
            {OFFERS.map((o) => (
              <div key={o.id} className="off-card">
                <div className="badge" style={{ background: "var(--gold)", color: "var(--charcoal)" }}>{o.tag}</div>
                <div className="serif" style={{ fontSize: 24, margin: "14px 0 20px" }}>{o.title}</div>
                <button className="btn btn-outline btn-sm" onClick={() => openBooking({ offerId: o.id })}>Book Offer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REWARDS */}
      <section id="rewards" className="sec sec-alt">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
            <div>
              <Eyebrow>Loyalty</Eyebrow>
              <h2 style={{ fontSize: 36, marginTop: 10 }}>Beautiful things are better when they're rewarded.</h2>
              <p style={{ color: "var(--charcoalSoft)", marginTop: 14, maxWidth: 520 }}>Earn a point for every dollar you spend, then redeem for treatments, discounts, and add-ons. Sign in to your account to track your progress.</p>
              <div style={{ display: "flex", gap: 30, marginTop: 24, flexWrap: "wrap" }}>
                {["Book", "Visit", "Earn points", "Redeem rewards"].map((step2, i) => (
                  <div key={step2} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600 }}>{i + 1}</div>
                    <span style={{ fontSize: 13.5 }}>{step2}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 26 }} onClick={() => { setPortalOpen(true); setPortalTab("rewards"); }}>View My Rewards</button>
            </div>
            <div className="tier-grid">
              {REWARD_TIERS.map((t) => (
                <div key={t.points} className="card tier-card">
                  <Award size={18} color="var(--gold)" />
                  <div className="serif" style={{ fontSize: 20, marginTop: 8 }}>{t.points}</div>
                  <div style={{ fontSize: 11.5, color: "var(--charcoalSoft)" }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="sec">
        <div className="container loc-grid">
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h2 style={{ fontSize: 34, marginTop: 10 }}>Come visit us.</h2>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <MapPin size={17} style={{ marginTop: 2, flexShrink: 0 }} color="var(--burgundy)" />
              <div style={{ fontSize: 14.5 }}>{BIZ.addressLine1}<br />{BIZ.addressLine2}</div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <Phone size={17} style={{ marginTop: 2, flexShrink: 0 }} color="var(--burgundy)" />
              <div style={{ fontSize: 14.5 }}>{BIZ.phone}</div>
            </div>
            <div className="badge" style={{ marginTop: 18 }}><span className={`dot ${isOpenNow() ? "available" : "closed"}`} style={{ marginTop: 0 }} />{statusLabel()}</div>
            <div style={{ marginTop: 22 }}>
              {BIZ.hours.map((h) => (
                <div key={h.day} className="hours-row">
                  <span>{h.day}</span>
                  <span style={{ color: "var(--charcoalSoft)" }}>{h.open == null ? "Closed" : `${to12(h.open)} – ${to12(h.close)}`}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="map-box">
              <div className="map-pin">
                <MapPin size={30} color="var(--burgundy)" fill="var(--burgundy)" />
              </div>
              <div style={{ position: "absolute", left: 16, bottom: 16, background: "var(--white)", padding: "10px 14px", borderRadius: 3, border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{BIZ.fullName}</div>
                <div style={{ fontSize: 11.5, color: "var(--charcoalSoft)" }}>{BIZ.addressLine1}</div>
              </div>
            </div>
            <a className="btn btn-outline btn-block" style={{ marginTop: 14 }}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ.addressLine1 + " " + BIZ.addressLine2)}`}
              target="_blank" rel="noreferrer"><Navigation size={14} /> Get Directions</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sec sec-alt" style={{ textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: 40 }}>Ready when you are.</h2>
          <p className="serif" style={{ fontSize: 18, color: "var(--charcoalSoft)", marginTop: 10 }}>Choose your service, find your time, and leave the rest to us.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => openBooking()}>Book an Appointment</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container foot-grid">
          <div>
            <div className="nav-logo" style={{ color: "var(--ivory)" }}>{BIZ.name}</div>
            <div className="serif" style={{ marginTop: 8, color: "#D9CFC0" }}>{BIZ.tagline}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <Instagram size={17} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#A99C88", marginBottom: 10 }}>Explore</div>
            {["Services", "Stylists", "Reviews", "Rewards"].map((n) => (
              <button key={n} className="foot-link" onClick={() => scrollToId(n.toLowerCase())}>{n}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#A99C88", marginBottom: 10 }}>Customer</div>
            <button className="foot-link" onClick={() => setPortalOpen(true)}>My Account</button>
            <button className="foot-link" onClick={() => setPortalOpen(true)}>My Appointments</button>
            <button className="foot-link" onClick={() => { setPortalOpen(true); setPortalTab("rewards"); }}>Rewards</button>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "#A99C88", marginBottom: 10 }}>Business</div>
            <div className="foot-link" style={{ cursor: "default" }}>{BIZ.phone}</div>
            <div className="foot-link" style={{ cursor: "default" }}>{BIZ.email}</div>
          </div>
        </div>
        <div className="container" style={{ marginTop: 34, paddingTop: 18, borderTop: "1px solid #3A342E", fontSize: 11.5, color: "#A99C88", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>© 2026 {BIZ.fullName}</span>
          <span>Demo website — fictional business</span>
        </div>
      </footer>

      <div className="demo-tag">Demo Concept</div>

      {/* ===== BOOKING DRAWER ===== */}
      {drawerOpen && <div className="overlay-bg" onClick={closeBooking} />}
      <div className={`drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!drawerOpen}>
        {drawerView === "steps" ? (
          <>
            <div className="drawer-head">
              <div className="serif" style={{ fontSize: 20 }}>Book your appointment</div>
              <button className="icon-btn" aria-label="Close booking" onClick={closeBooking}><X size={17} /></button>
            </div>
            <div className="drawer-body">
              <div className="steps">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className={`step-dot ${step > n ? "done" : step === n ? "current" : ""}`} />
                ))}
              </div>
              <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--charcoalSoft)", marginBottom: 16 }}>
                Step 0{step} of 05 — {["Service", "Stylist", "Date & Time", "Details", "Review"][step - 1]}
              </div>

              {step === 1 && (
                <div>
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <div key={cat} style={{ marginBottom: 18 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "var(--burgundy)" }}>{cat}</div>
                      {SERVICES.filter((s) => s.category === cat).map((s) => (
                        <button key={s.id} onClick={() => setDraft((d) => ({ ...d, serviceId: s.id }))}
                          className="card" style={{ width: "100%", textAlign: "left", padding: "13px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
                            borderColor: draft.serviceId === s.id ? "var(--burgundy)" : "var(--border)", background: draft.serviceId === s.id ? "var(--ivory2)" : "var(--white)" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                            <div style={{ fontSize: 12, color: "var(--charcoalSoft)" }}>{s.duration} min</div>
                          </div>
                          <div className="serif" style={{ fontSize: 18, color: "var(--burgundy)" }}>{fmt$(s.price)}</div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div>
                  <button onClick={() => setDraft((d) => ({ ...d, stylistId: null }))} className="card"
                    style={{ width: "100%", textAlign: "left", padding: "13px 14px", marginBottom: 8, cursor: "pointer",
                      borderColor: draft.stylistId === null ? "var(--burgundy)" : "var(--border)", background: draft.stylistId === null ? "var(--ivory2)" : "var(--white)" }}>
                    <div style={{ fontWeight: 500 }}>Any available stylist</div>
                    <div style={{ fontSize: 12, color: "var(--charcoalSoft)" }}>We'll match you with the best fit</div>
                  </button>
                  {STYLISTS.map((st) => (
                    <button key={st.id} onClick={() => setDraft((d) => ({ ...d, stylistId: st.id }))} className="card"
                      style={{ width: "100%", textAlign: "left", padding: "13px 14px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center", cursor: "pointer",
                        borderColor: draft.stylistId === st.id ? "var(--burgundy)" : "var(--border)", background: draft.stylistId === st.id ? "var(--ivory2)" : "var(--white)" }}>
                      <img src={st.img} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{st.name}</div>
                        <div style={{ fontSize: 12, color: "var(--charcoalSoft)" }}>{st.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Choose a date</div>
                  <div className="scrollx">
                    {upcoming.map((d, i) => {
                      const lvl = dayLevel(d, i);
                      const iso = d.toISOString();
                      const disabled = lvl === "closed" || lvl === "full";
                      return (
                        <button key={iso} disabled={disabled} onClick={() => setDraft((dr) => ({ ...dr, dateISO: iso, time: null }))}
                          className={`date-chip ${draft.dateISO === iso ? "selected" : ""} ${disabled ? "disabled" : ""}`}>
                          <div style={{ fontSize: 10.5, textTransform: "uppercase" }}>{i === 0 ? "Today" : dow3(d)}</div>
                          <div className="serif" style={{ fontSize: 18 }}>{d.getDate()}</div>
                          <span className={`dot ${lvl}`} />
                        </button>
                      );
                    })}
                  </div>
                  {draft.dateISO && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Available times</div>
                      <div className="time-grid">
                        {slotsForDay(new Date(draft.dateISO), upcoming.findIndex((d) => d.toISOString() === draft.dateISO)).map((sl) => (
                          <button key={sl.label} disabled={sl.disabled} onClick={() => setDraft((d) => ({ ...d, time: sl.label }))}
                            className={`time-slot ${draft.time === sl.label ? "selected" : ""}`}>{sl.label}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div className="field" style={{ flex: 1 }}><label>First name</label><input value={draft.firstName} onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))} /></div>
                    <div className="field" style={{ flex: 1 }}><label>Last name</label><input value={draft.lastName} onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))} /></div>
                  </div>
                  <div className="field"><label>Email</label><input type="email" value={draft.email} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))} /></div>
                  <div className="field"><label>Phone</label><input type="tel" value={draft.phone} onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))} /></div>
                  <div className="field"><label>Notes for stylist (optional)</label>
                    <textarea rows={3} placeholder="Anything we should know before your appointment?" value={draft.notes} onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))} />
                  </div>
                  <label style={{ display: "flex", gap: 8, fontSize: 12.5, color: "var(--charcoalSoft)", alignItems: "flex-start" }}>
                    <input type="checkbox" style={{ width: "auto", marginTop: 2 }} checked={draft.agree} onChange={(e) => setDraft((d) => ({ ...d, agree: e.target.checked }))} />
                    I agree to the cancellation policy.
                  </label>
                </div>
              )}

              {step === 5 && draftSvc && (
                <div>
                  <div className="card" style={{ padding: 16 }}>
                    <div className="summary-line"><span>Service</span><strong>{draftSvc.name}</strong></div>
                    <div className="summary-line"><span>Stylist</span><strong>{draftSty ? draftSty.name : "Any available"}</strong></div>
                    <div className="summary-line"><span>Date</span><strong>{draft.dateISO ? monthDay(new Date(draft.dateISO)) : "—"}</strong></div>
                    <div className="summary-line"><span>Time</span><strong>{draft.time || "—"}</strong></div>
                    <div className="summary-line"><span>Duration</span><strong>{draftSvc.duration} min</strong></div>
                    <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />
                    <div className="summary-line"><span>Subtotal</span><span>{fmt$(draftSvc.price)}</span></div>
                    {draft.offerId && (() => {
                      const o = OFFERS.find((x) => x.id === draft.offerId);
                      const disc = o.type === "percent" ? Math.round((draftSvc.price * o.value) / 100) : o.value;
                      return <div className="summary-line" style={{ color: "var(--burgundy)" }}><span>{o.title} <span style={{ fontSize: 10 }}>(Demo promotion)</span></span><span>−{fmt$(disc)}</span></div>;
                    })()}
                    <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />
                    <div className="summary-line" style={{ fontSize: 17 }}><span className="serif">Total</span><strong className="serif" style={{ color: "var(--burgundy)" }}>
                      {fmt$(draft.offerId ? draftSvc.price - (OFFERS.find((x) => x.id === draft.offerId).type === "percent" ? Math.round(draftSvc.price * OFFERS.find((x) => x.id === draft.offerId).value / 100) : OFFERS.find((x) => x.id === draft.offerId).value) : draftSvc.price)}
                    </strong></div>
                  </div>
                </div>
              )}
            </div>

            <div className="drawer-foot">
              {draftSvc && step < 5 && (
                <div className="summary-line" style={{ marginBottom: 8 }}><span>{draftSvc.name}</span><strong>{fmt$(draftSvc.price)}</strong></div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                {step > 1 && <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}><ChevronLeft size={15} /> Back</button>}
                {step < 5 ? (
                  <button className="btn btn-primary btn-block" disabled={
                    (step === 1 && !draft.serviceId) ||
                    (step === 3 && (!draft.dateISO || !draft.time)) ||
                    (step === 4 && (!draft.firstName || !draft.lastName || !draft.email || !draft.phone || !draft.agree))
                  } onClick={() => setStep((s) => s + 1)}>Continue <ChevronRight size={15} /></button>
                ) : (
                  <button className="btn btn-primary btn-block" onClick={confirmBooking}>Confirm Appointment</button>
                )}
              </div>
            </div>
          </>
        ) : (
          confirmed && (
            <>
              <div className="drawer-head">
                <div className="serif" style={{ fontSize: 20 }}>You're booked.</div>
                <button className="icon-btn" aria-label="Close" onClick={closeBooking}><X size={17} /></button>
              </div>
              <div className="drawer-body">
                <div style={{ textAlign: "center", padding: "10px 0 24px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--burgundy)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    <Check size={26} />
                  </div>
                  <p style={{ color: "var(--charcoalSoft)" }}>Your appointment is confirmed.</p>
                </div>
                <div className="card" style={{ padding: 18 }}>
                  <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--charcoalSoft)" }}>{BIZ.fullName}</div>
                  <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>{confirmed.serviceName}</div>
                  <div style={{ fontSize: 13.5, color: "var(--charcoalSoft)" }}>with {confirmed.stylistName}</div>
                  <div style={{ borderTop: "1px solid var(--border)", margin: "12px 0" }} />
                  <div className="summary-line"><span>Date</span><strong>{fullDate(new Date(confirmed.dateISO))}</strong></div>
                  <div className="summary-line"><span>Time</span><strong>{confirmed.time}</strong></div>
                  <div className="summary-line"><span>Duration</span><strong>{confirmed.duration} minutes</strong></div>
                  <div className="summary-line" style={{ fontSize: 16 }}><span className="serif">Total</span><strong className="serif" style={{ color: "var(--burgundy)" }}>{fmt$(confirmed.total)}</strong></div>
                </div>

                <div style={{ marginTop: 20 }}>
                  {["Confirmation email sent", "SMS reminder scheduled", "24-hour reminder scheduled", "2-hour reminder scheduled"].map((n) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 0", fontSize: 13 }}>
                      <Check size={14} color="var(--burgundy)" />
                      <span>{n}</span>
                      <span style={{ fontSize: 10, color: "var(--charcoalSoft)", marginLeft: "auto" }}>Demo notification</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-outline btn-block" onClick={() => downloadICS(confirmed)}><CalendarPlus size={15} /> Add to Calendar</button>
                  <button className="btn btn-outline btn-block" onClick={() => { closeBooking(); setPortalOpen(true); setPortalTab("overview"); }}>Manage Appointment</button>
                  <button className="btn btn-primary btn-block" onClick={closeBooking}>Back to Home</button>
                </div>
              </div>
            </>
          )
        )}
      </div>

      {/* ===== CLIENT PORTAL ===== */}
      {portalOpen && <div className="overlay-bg" onClick={() => setPortalOpen(false)} />}
      <div className="drawer open" style={{ display: portalOpen ? "flex" : "none", width: "100%", maxWidth: 640 }} role="dialog" aria-modal="true">
        <div className="drawer-head">
          <div className="serif" style={{ fontSize: 20 }}>My Account</div>
          <button className="icon-btn" aria-label="Close account" onClick={() => setPortalOpen(false)}><X size={17} /></button>
        </div>
        <div className="drawer-body">
          <div className="portal-tabs">
            {["overview", "history", "rewards", "settings"].map((t) => (
              <button key={t} className={`ptab ${portalTab === t ? "active" : ""}`} onClick={() => setPortalTab(t)}>
                {t === "overview" ? "Overview" : t === "history" ? "History" : t === "rewards" ? "Rewards & Referrals" : "Settings"}
              </button>
            ))}
          </div>

          {portalTab === "overview" && (
            <div>
              <div className="serif" style={{ fontSize: 24 }}>Welcome back, {account.name.split(" ")[0]}.</div>
              <div style={{ display: "flex", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
                <div className="card" style={{ padding: 14, flex: "1 1 120px", textAlign: "center" }}>
                  <div className="serif" style={{ fontSize: 22 }}>{account.points}</div>
                  <div style={{ fontSize: 11, color: "var(--charcoalSoft)" }}>Reward points</div>
                </div>
                <div className="card" style={{ padding: 14, flex: "1 1 120px", textAlign: "center" }}>
                  <div className="serif" style={{ fontSize: 22 }}>{account.lifetimeVisits}</div>
                  <div style={{ fontSize: 11, color: "var(--charcoalSoft)" }}>Lifetime visits</div>
                </div>
                <div className="card" style={{ padding: 14, flex: "1 1 120px", textAlign: "center" }}>
                  <div className="serif" style={{ fontSize: 15 }}>{account.favoriteStylist}</div>
                  <div style={{ fontSize: 11, color: "var(--charcoalSoft)" }}>Favorite stylist</div>
                </div>
              </div>

              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 26, marginBottom: 10 }}>Upcoming appointments</div>
              {account.upcoming.length === 0 ? (
                <div className="card" style={{ padding: 22, textAlign: "center" }}>
                  <p style={{ color: "var(--charcoalSoft)" }}>You don't have anything booked yet.</p>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={() => openBooking()}>Book an Appointment</button>
                </div>
              ) : (
                account.upcoming.map((u) => (
                  <div key={u.id} className="card" style={{ padding: 16, marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{u.serviceName}</div>
                        <div style={{ fontSize: 12.5, color: "var(--charcoalSoft)" }}>{u.stylistName}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13 }}>{monthDay(new Date(u.dateISO))}</div>
                        <div style={{ fontSize: 12.5, color: "var(--charcoalSoft)" }}>{u.time}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => { setRescheduleId(u.id); setRescheduleDraft({ dateISO: null, time: null }); }}>Reschedule</button>
                      <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => setCancelId(u.id)}>Cancel</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {portalTab === "history" && (
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Booking history</div>
              {account.history.length === 0 ? (
                <p style={{ color: "var(--charcoalSoft)" }}>No past visits yet.</p>
              ) : account.history.map((h) => (
                <div key={h.id} className="card" style={{ padding: 16, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{h.serviceName}</div>
                    <div style={{ fontSize: 12.5, color: "var(--charcoalSoft)" }}>{h.stylistName} · {h.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="serif" style={{ fontSize: 17, color: "var(--burgundy)" }}>{fmt$(h.price)}</div>
                    <button className="btn-ghost" style={{ fontSize: 12, fontWeight: 600 }} onClick={() => bookAgain(h)}>Book Again</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {portalTab === "rewards" && (
            <div>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="serif" style={{ fontSize: 26 }}>{account.points} points</span>
                  <span style={{ fontSize: 12, color: "var(--charcoalSoft)" }}>{Math.max(1000 - account.points, 0)} to next reward</span>
                </div>
                <div className="rw-track" style={{ marginTop: 10 }}><div className="rw-fill" style={{ width: `${Math.min((account.points / 1000) * 100, 100)}%` }} /></div>
              </div>
              <div className="tier-grid" style={{ marginTop: 16 }}>
                {REWARD_TIERS.map((t) => (
                  <div key={t.points} className="card tier-card">
                    <div className="serif" style={{ fontSize: 18 }}>{t.points}</div>
                    <div style={{ fontSize: 11, color: "var(--charcoalSoft)", marginBottom: 8 }}>{t.label}</div>
                    <button className="btn btn-outline btn-sm btn-block" disabled={account.points < t.points} onClick={() => redeemReward(t)}>Redeem</button>
                  </div>
                ))}
              </div>

              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 28, marginBottom: 10 }}>Love LUMÉ? Share it.</div>
              <div className="card" style={{ padding: 18 }}>
                <p style={{ fontSize: 13.5 }}>Give $15, get $15.</p>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <div className="card" style={{ flex: 1, padding: "10px 12px", fontFamily: "monospace", fontSize: 14, letterSpacing: ".04em" }}>{account.referralCode}</div>
                  <button className="icon-btn" aria-label="Copy referral code" onClick={copyCode}><Copy size={16} /></button>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={shareReferral}><Share2 size={13} /> Share Referral</button>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={simulateReferral}>Simulate a Referral (+100)</button>
                </div>
              </div>
            </div>
          )}

          {portalTab === "settings" && (
            <div>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--charcoalSoft)", marginBottom: 4 }}>Profile</div>
                <div style={{ fontWeight: 600 }}>{account.name}</div>
                <div style={{ fontSize: 13, color: "var(--charcoalSoft)" }}>{account.email}</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, margin: "22px 0 10px" }}>Appointment reminders</div>
              <div className="card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div><div style={{ fontSize: 14 }}>Email reminders</div><div style={{ fontSize: 11.5, color: "var(--charcoalSoft)" }}>24 & 2 hours before</div></div>
                <button className={`toggle ${account.settings.emailReminders ? "on" : ""}`} onClick={() => toggleSetting("emailReminders")} aria-label="Toggle email reminders"><span className="knob" /></button>
              </div>
              <div className="card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontSize: 14 }}>SMS reminders</div><div style={{ fontSize: 11.5, color: "var(--charcoalSoft)" }}>24 & 2 hours before</div></div>
                <button className={`toggle ${account.settings.smsReminders ? "on" : ""}`} onClick={() => toggleSetting("smsReminders")} aria-label="Toggle SMS reminders"><span className="knob" /></button>
              </div>
              <div style={{ fontSize: 11, color: "var(--charcoalSoft)", marginTop: 14 }}>Demo settings — no real messages are sent.</div>
            </div>
          )}
        </div>
      </div>

      {/* RESCHEDULE MODAL */}
      {rescheduleId && (
        <>
          <div className="overlay-bg" onClick={() => setRescheduleId(null)} />
          <div className="modal-panel" role="dialog" aria-modal="true">
            <div className="drawer-head"><div className="serif" style={{ fontSize: 19 }}>Reschedule appointment</div>
              <button className="icon-btn" aria-label="Close" onClick={() => setRescheduleId(null)}><X size={16} /></button></div>
            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Choose a new date</div>
              <div className="scrollx">
                {upcoming.map((d, i) => {
                  const lvl = dayLevel(d, i);
                  const iso = d.toISOString();
                  const disabled = lvl === "closed" || lvl === "full";
                  return (
                    <button key={iso} disabled={disabled} onClick={() => setRescheduleDraft({ dateISO: iso, time: null })}
                      className={`date-chip ${rescheduleDraft.dateISO === iso ? "selected" : ""} ${disabled ? "disabled" : ""}`}>
                      <div style={{ fontSize: 10.5, textTransform: "uppercase" }}>{i === 0 ? "Today" : dow3(d)}</div>
                      <div className="serif" style={{ fontSize: 18 }}>{d.getDate()}</div>
                      <span className={`dot ${lvl}`} />
                    </button>
                  );
                })}
              </div>
              {rescheduleDraft.dateISO && (
                <div style={{ marginTop: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Available times</div>
                  <div className="time-grid">
                    {slotsForDay(new Date(rescheduleDraft.dateISO), upcoming.findIndex((d) => d.toISOString() === rescheduleDraft.dateISO)).map((sl) => (
                      <button key={sl.label} disabled={sl.disabled} onClick={() => setRescheduleDraft((d) => ({ ...d, time: sl.label }))}
                        className={`time-slot ${rescheduleDraft.time === sl.label ? "selected" : ""}`}>{sl.label}</button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setRescheduleId(null)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} disabled={!rescheduleDraft.dateISO || !rescheduleDraft.time} onClick={rescheduleConfirm}>Confirm New Time</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CANCEL MODAL */}
      {cancelId && (
        <>
          <div className="overlay-bg" onClick={() => setCancelId(null)} />
          <div className="modal-panel" role="dialog" aria-modal="true" style={{ width: "min(420px,92vw)" }}>
            <div style={{ padding: 26 }}>
              <div className="serif" style={{ fontSize: 22 }}>Cancel appointment?</div>
              <p style={{ fontSize: 13.5, color: "var(--charcoalSoft)", marginTop: 10 }}>Cancellations within 24 hours of your appointment may be subject to a cancellation fee. This is a demo — no fee will actually be charged.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setCancelId(null)}>Keep Appointment</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={cancelConfirm}>Cancel Appointment</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SERVICE MODAL */}
      {serviceModal && (
        <>
          <div className="overlay-bg" onClick={() => setServiceModal(null)} />
          <div className="modal-panel" role="dialog" aria-modal="true">
            <div className="drawer-head">
              <div className="serif" style={{ fontSize: 20 }}>{serviceModal.name}</div>
              <button className="icon-btn" aria-label="Close" onClick={() => setServiceModal(null)}><X size={16} /></button>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                <div className="serif" style={{ fontSize: 28, color: "var(--burgundy)" }}>{fmt$(serviceModal.price)}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--charcoalSoft)" }}><Clock size={13} />{serviceModal.duration} min</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>{serviceModal.desc}</p>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 6 }}>What's included</div>
                {serviceModal.includes.map((i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 13.5, padding: "4px 0" }}><Check size={13} color="var(--burgundy)" />{i}</div>)}
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 6 }}>Recommended for</div>
                <p style={{ fontSize: 13.5, color: "var(--charcoalSoft)" }}>{serviceModal.recommendedFor}</p>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 6 }}>Aftercare</div>
                <p style={{ fontSize: 13.5, color: "var(--charcoalSoft)" }}>{serviceModal.aftercare}</p>
              </div>
              <button className="btn btn-primary btn-block" style={{ marginTop: 22 }}
                onClick={() => { const id = serviceModal.id; setServiceModal(null); openBooking({ serviceId: id }); }}>Choose this service</button>
            </div>
          </div>
        </>
      )}

      {/* STYLIST MODAL */}
      {stylistModal && (
        <>
          <div className="overlay-bg" onClick={() => setStylistModal(null)} />
          <div className="modal-panel" role="dialog" aria-modal="true">
            <button className="icon-btn" aria-label="Close" style={{ position: "absolute", top: 14, right: 14, background: "var(--white)" }} onClick={() => setStylistModal(null)}><X size={16} /></button>
            <img src={stylistModal.img} alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} />
            <div style={{ padding: 22 }}>
              <div className="serif" style={{ fontSize: 26 }}>{stylistModal.name}</div>
              <div style={{ color: "var(--burgundy)", fontSize: 13.5, marginTop: 2 }}>{stylistModal.role}</div>
              <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap", fontSize: 12.5, color: "var(--charcoalSoft)" }}>
                <span>{stylistModal.years} yrs experience</span><span>·</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><StarRow rating={stylistModal.rating} /> {stylistModal.rating}</span>
                <span>·</span><span>{stylistModal.languages.join(", ")}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 14 }}>{stylistModal.bio}</p>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 6 }}>Specialties</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {stylistModal.specialties.map((s) => <span key={s} className="badge">{s}</span>)}
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 6 }}>Available</div>
                <div style={{ fontSize: 13, color: "var(--charcoalSoft)" }}>{stylistModal.days.join(", ")}</div>
              </div>
              <button className="btn btn-primary btn-block" style={{ marginTop: 22 }}
                onClick={() => { const id = stylistModal.id; setStylistModal(null); openBooking({ stylistId: id }); }}>Book with {stylistModal.name.split(" ")[0]}</button>
            </div>
          </div>
        </>
      )}

      {/* DEMO TOOLS */}
      {demoOpen && (
        <div className="demo-panel">
          <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 10 }}>Demo Tools</div>
          <button className="btn btn-outline btn-sm btn-block" style={{ marginBottom: 8 }} onClick={resetDemo}><RefreshCw size={13} /> Reset Demo</button>
          <button className="btn btn-outline btn-sm btn-block" style={{ marginBottom: 8 }} onClick={loadSample}>Load Sample Appointment</button>
          <button className="btn btn-outline btn-sm btn-block" style={{ marginBottom: 8 }} onClick={() => { setDemoOpen(false); openBooking(); }}>Open Booking</button>
          <button className="btn btn-outline btn-sm btn-block" style={{ marginBottom: 8 }} onClick={() => { setDemoOpen(false); setPortalOpen(true); setPortalTab("overview"); }}>Open Client Portal</button>
          <button className="btn btn-outline btn-sm btn-block" onClick={() => { setDemoOpen(false); setPortalOpen(true); setPortalTab("rewards"); }}>View Rewards</button>
        </div>
      )}
      <button className="demo-fab" aria-label="Demo tools" onClick={() => setDemoOpen((v) => !v)}><Wand2 size={19} /></button>

      <Toasts toasts={toasts} />
    </div>
  );
}

/* =========================================================================
   QUICK BOOKING WIDGET (below hero)
   ========================================================================= */
function QuickBooking({ upcoming, onFind }) {
  const [serviceId, setServiceId] = useState("");
  const [stylistId, setStylistId] = useState("");
  const [dateISO, setDateISO] = useState("");
  const [time, setTime] = useState("");

  const dayIndex = upcoming.findIndex((d) => d.toISOString() === dateISO);
  const slots = dateISO ? slotsForDay(new Date(dateISO), dayIndex) : [];

  return (
    <div className="qb-grid">
      <div className="field">
        <label>Service</label>
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
          <option value="">Any service</option>
          {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Stylist</label>
        <select value={stylistId} onChange={(e) => setStylistId(e.target.value)}>
          <option value="">Any stylist</option>
          {STYLISTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Date</label>
        <select value={dateISO} onChange={(e) => { setDateISO(e.target.value); setTime(""); }}>
          <option value="">Choose date</option>
          {upcoming.map((d, i) => <option key={d.toISOString()} value={d.toISOString()}>{i === 0 ? "Today" : `${dow3(d)} ${monthDay(d)}`}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Time</label>
        <select value={time} onChange={(e) => setTime(e.target.value)} disabled={!dateISO}>
          <option value="">Any time</option>
          {slots.filter((s) => !s.disabled).map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" onClick={() => onFind({
        serviceId: serviceId || undefined, stylistId: stylistId || undefined, dateISO: dateISO || undefined, time: time || undefined,
      })}>Find Availability</button>
    </div>
  );
}
