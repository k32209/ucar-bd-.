import { useEffect, useRef, useState } from "react";

/* ---------- Data ---------- */

const PHONE = "01871-765517";
const PHONE_RAW = "01871765517";
const WHATSAPP = "8801871765517";

const HERO_IMG = "/images/toyota-allion-black.jpg";

type Car = {
  id: string;
  name: string;
  year: number;
  badge: string;
  price: number;
  image: string;
  seats: number;
  transmission: string;
  fuel: string;
  ac: boolean;
  features: string[];
  color: string;
  colorDot: string;
};

const CARS: Car[] = [
  {
    id: "allion-black",
    name: "Toyota Allion",
    year: 2016,
    badge: "Best Value",
    price: 3500,
    image: "/images/toyota-allion-black.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    features: ["Push Start", "LED Headlights", "Bluetooth Audio", "Power Windows"],
    color: "Midnight Black",
    colorDot: "#1a1a1a",
  },
  {
    id: "noah-black",
    name: "Toyota Noah",
    year: 2018,
    badge: "Family MPV",
    price: 5500,
    image: "/images/xnuha-black.jpg",
    seats: 8,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    features: ["8 Seater", "Sliding Doors", "Dual AC", "Large Boot"],
    color: "Midnight Black",
    colorDot: "#1a1a1a",
  },
  {
    id: "axio-fielder-white",
    name: "Axio Fielder",
    year: 2017,
    badge: "Wagon — Popular",
    price: 4500,
    image: "/images/axio-fielder-white.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    ac: true,
    features: ["Wagon Body", "Hybrid Engine", "Large Cargo", "Rear Spoiler"],
    color: "Pearl White",
    colorDot: "#e8e8e8",
  },
  {
    id: "premio-maroon",
    name: "Toyota Premio",
    year: 2019,
    badge: "Premium Sedan",
    price: 4000,
    image: "/images/premio-maroon.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Octane",
    ac: true,
    features: ["Chrome Grille", "Leather Seats", "LED Headlamps", "Keyless Entry"],
    color: "Maroon / Wine",
    colorDot: "#6b1219",
  },
  {
    id: "axio-white",
    name: "Toyota Axio",
    year: 2016,
    badge: "Compact Sedan",
    price: 4500,
    image: "/images/axio-white.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    ac: true,
    features: ["Hybrid Engine", "Fuel Efficient", "Smooth Ride", "USB Charging"],
    color: "Pearl White",
    colorDot: "#e8e8e8",
  },
  {
    id: "land-cruiser",
    name: "Toyota Land Cruiser",
    year: 2022,
    badge: "🔥 Premium SUV",
    price: 15000,
    image: "/images/land-cruiser-black.jpg",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    ac: true,
    features: ["7 Seater", "4WD Off-road", "Luxury Interior", "360° Camera"],
    color: "Jet Black",
    colorDot: "#0a0a0a",
  },
];

const TESTIMONIALS = [
  {
    name: "Rakib Hasan",
    role: "Sylhet, BD",
    quote:
      "Booked the Allion 2016 for a family trip to Jaflong. Car was spotless and the handover was fast. Best self-drive experience in Sylhet!",
    rating: 5,
    initial: "R",
    color: "from-accent-500 to-red-700",
  },
  {
    name: "Tariqul Islam",
    role: "Beanibazar",
    quote:
      "Reliable, transparent pricing and a smooth booking process. The Noah was perfect for our family weekend in Bisanakandi. Highly recommended.",
    rating: 5,
    initial: "T",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Mahmud Karim",
    role: "Dhaka → Sylhet",
    quote:
      "I love that there's no driver — I get full control. Pickup at Beanibazar was super easy. The Allion drove like new. Will book again.",
    rating: 5,
    initial: "M",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    name: "Sadia Rahman",
    role: "Sylhet",
    quote:
      "Friendly local support and a beautifully maintained car. The Premio turned heads everywhere! 5 stars from us.",
    rating: 5,
    initial: "S",
    color: "from-purple-500 to-purple-700",
  },
];

/* ---------- Reveal-on-scroll hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Icons (inline SVG) ---------- */
const Icon = {
  Menu: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  ),
  X: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  ),
  Phone: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Whatsapp: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  ),
  Pin: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Mail: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <path d="M22 6l-10 7L2 6"/>
    </svg>
  ),
  Star: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
  Check: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...p}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Steering: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="2.5"/>
      <path d="M12 14.5V21M9.6 11.2 3.5 8M14.4 11.2 20.5 8"/>
    </svg>
  ),
  Shield: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Calendar: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  Headset: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M3 14v-2a9 9 0 0 1 18 0v2"/>
      <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2v2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2v2z"/>
    </svg>
  ),
  Seat: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M6 19v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3"/>
      <path d="M8 12V7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v5"/>
    </svg>
  ),
  Gear: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 4v16M5 4l4 4M5 20l4-4M19 4v16M19 4l-4 4M19 20l-4-4"/>
    </svg>
  ),
  Fuel: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M3 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
      <path d="M3 21h12"/>
      <path d="M15 9h3a2 2 0 0 1 2 2v7a2 2 0 0 1-4 0v-3"/>
    </svg>
  ),
  Snow: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07L19.07 4.93"/>
    </svg>
  ),
  Arrow: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Facebook: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/>
    </svg>
  ),
  Instagram: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  ),
  Logo: (p: any) => (
    <svg viewBox="0 0 64 40" fill="none" {...p}>
      <path d="M8 8h6v18a4 4 0 0 0 8 0V8h6v18a10 10 0 0 1-20 0V8z" fill="currentColor"/>
      <path d="M32 32 44 8h6l-8 16h7l2-4h4l-7 14H32z" fill="#e2222b"/>
    </svg>
  ),
};

/* ---------- Components ---------- */

function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    { name: "Home", href: "#home" },
    { name: "Fleet", href: "#fleet" },
    { name: "How it Works", href: "#how" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/85 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <a href="#home" className="flex items-center gap-2 text-silver-100">
          <Icon.Logo className="h-7 w-auto" />
          <div className="leading-tight">
            <div className="font-display font-bold text-xl tracking-tight">UCAR</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-silver-400 -mt-0.5">Car Rental</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-sm font-medium text-silver-300 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent-500 after:transition-all hover:after:w-full"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE_RAW}`}
            className="flex items-center gap-2 text-sm font-semibold text-silver-100 hover:text-accent-500 transition-colors"
          >
            <Icon.Phone className="h-4 w-4" />
            {PHONE}
          </a>
          <button
            onClick={onBook}
            className="relative overflow-hidden shine bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all glow-red hover:scale-105"
          >
            Book Now
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-silver-100 p-2"
          aria-label="Menu"
        >
          {open ? <Icon.X className="h-6 w-6" /> : <Icon.Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-navy-950/95 backdrop-blur-xl ${
          open ? "max-h-96 border-b border-white/5" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 px-2 text-silver-200 hover:text-white border-b border-white/5"
            >
              {l.name}
            </a>
          ))}
          <a
            href={`tel:${PHONE_RAW}`}
            className="mt-3 flex items-center justify-center gap-2 bg-white/5 text-silver-100 py-3 rounded-full text-sm font-semibold"
          >
            <Icon.Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="mt-2 bg-accent-500 text-white py-3 rounded-full font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Premium sedan"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-xs sm:text-sm text-silver-200 mb-6 reveal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
              </span>
              Trusted self-drive rentals in Beanibazar, Sylhet
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05] reveal">
              Premium <span className="text-accent-500">Self-Drive</span> Car Rental in Sylhet
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-silver-300 max-w-2xl reveal">
              Drive the <span className="text-white font-semibold">Allion 2016</span>, <span className="text-white font-semibold">Premio</span>, <span className="text-white font-semibold">Axio Fielder</span>, <span className="text-white font-semibold">Noah</span> or <span className="text-white font-semibold">Land Cruiser</span> — no driver needed.
              Total freedom, transparent pricing, starting from <span className="text-accent-500 font-bold">৳3,500/day</span>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 reveal">
              <button
                onClick={onBook}
                className="relative overflow-hidden shine group bg-accent-500 hover:bg-accent-600 text-white font-semibold px-7 py-4 rounded-full transition-all glow-red hover:scale-105 inline-flex items-center gap-2"
              >
                Book Now
                <Icon.Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#fleet"
                className="bg-white/5 backdrop-blur border border-white/15 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/10 hover:border-white/30 transition-all"
              >
                View Fleet
              </a>
              <a
                href={`tel:${PHONE_RAW}`}
                className="hidden sm:inline-flex items-center gap-2 text-silver-200 hover:text-white font-medium ml-2"
              >
                <span className="bg-white/5 border border-white/10 p-3 rounded-full">
                  <Icon.Phone className="h-4 w-4" />
                </span>
                Call {PHONE}
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl reveal">
              {[
                { v: "500+", l: "Happy Drivers" },
                { v: "6", l: "Cars in Fleet" },
                { v: "4.9★", l: "Customer Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">{s.v}</div>
                  <div className="text-xs sm:text-sm text-silver-400 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-look card */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-accent-500/40 via-transparent to-white/10 rounded-3xl blur-xl" />
              <div className="relative bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-accent-500 font-semibold">Featured</div>
                    <div className="font-display font-bold text-xl text-white">Toyota Allion 2016</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-silver-400">From</div>
                    <div className="font-display font-bold text-2xl text-white">৳3,500<span className="text-sm text-silver-400 font-normal">/day</span></div>
                  </div>
                </div>
                <img
                  src="/images/toyota-allion-black.jpg"
                  alt="Allion"
                  className="rounded-2xl w-full h-44 sm:h-52 object-cover animate-float"
                />
                <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                  {[
                    { i: <Icon.Seat className="h-4 w-4 mx-auto" />, l: "5 Seats" },
                    { i: <Icon.Gear className="h-4 w-4 mx-auto" />, l: "Auto" },
                    { i: <Icon.Fuel className="h-4 w-4 mx-auto" />, l: "Octane" },
                    { i: <Icon.Snow className="h-4 w-4 mx-auto" />, l: "AC" },
                  ].map((f) => (
                    <div key={f.l} className="bg-white/5 border border-white/10 rounded-xl py-2.5 text-silver-200 text-xs">
                      <div className="text-accent-500 mb-1">{f.i}</div>
                      {f.l}
                    </div>
                  ))}
                </div>
                <button
                  onClick={onBook}
                  className="mt-5 w-full bg-white text-navy-950 font-semibold py-3 rounded-xl hover:bg-silver-200 transition-colors"
                >
                  Reserve this car →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["No Driver Needed", "Same-Day Pickup", "Verified Cars", "Local Sylhet Support", "Flexible Booking", "Transparent Pricing"];
  return (
    <div className="border-y border-white/5 bg-navy-900/50 py-4 overflow-hidden">
      <div className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap" style={{ animation: "scroll 30s linear infinite" }}>
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-3 text-silver-300 text-sm font-medium">
            <span className="text-accent-500">✦</span>
            {t}
          </div>
        ))}
      </div>
      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

function CarCard({ car, onBook }: { car: Car; onBook: (c: Car) => void }) {
  return (
    <div className="reveal group relative bg-gradient-to-b from-navy-800/60 to-navy-900/60 border border-white/5 rounded-3xl overflow-hidden hover:border-accent-500/40 transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
        <div className="absolute top-3 left-3 bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {car.badge}
        </div>
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur border border-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border border-white/40" style={{ background: car.colorDot }} />
          {car.color}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-xl text-white">{car.name}</h3>
            <p className="text-xs text-silver-400 mt-0.5">{car.year} · Self-Drive</p>
          </div>
          <div className="text-right">
            <div className="font-display font-bold text-2xl text-white">৳{car.price.toLocaleString()}</div>
            <div className="text-[11px] text-silver-400 -mt-0.5">per day</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {[
            { i: <Icon.Seat className="h-4 w-4 mx-auto" />, l: `${car.seats}` },
            { i: <Icon.Gear className="h-4 w-4 mx-auto" />, l: car.transmission.slice(0, 4) },
            { i: <Icon.Fuel className="h-4 w-4 mx-auto" />, l: car.fuel },
            { i: <Icon.Snow className="h-4 w-4 mx-auto" />, l: "AC" },
          ].map((f, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-lg py-2 text-silver-300 text-[10px] font-medium">
              <div className="text-accent-500/90 mb-0.5">{f.i}</div>
              {f.l}
            </div>
          ))}
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-y-1.5 gap-x-3">
          {car.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-silver-300">
              <Icon.Check className="h-3.5 w-3.5 text-accent-500 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onBook(car)}
          className="mt-5 w-full bg-white/5 hover:bg-accent-500 border border-white/10 hover:border-accent-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
        >
          Book Now
          <Icon.Arrow className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

function Fleet({ onSelect }: { onSelect: (c: Car) => void }) {
  return (
    <section id="fleet" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 reveal">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold">Our Fleet</div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-3 max-w-2xl">
              Pick your ride. <span className="text-silver-400">Drive on your own terms.</span>
            </h2>
          </div>
          <p className="text-silver-300 max-w-md text-sm sm:text-base">
            Hand-picked, regularly serviced cars — each one ready for city drives, family trips
            or weekend escapes across Sylhet.
          </p>
        </div>

        {/* Pricing quick-look bar */}
        <div className="mb-10 reveal overflow-x-auto">
          <div className="flex gap-3 min-w-max sm:flex-wrap sm:min-w-0">
            {[
              { name: "Toyota Allion 2016", price: "৳3,500", color: "bg-accent-500" },
              { name: "Toyota Noah", price: "৳5,500", color: "bg-blue-600" },
              { name: "Axio Fielder", price: "৳4,500", color: "bg-emerald-600" },
              { name: "Toyota Premio", price: "৳4,000", color: "bg-purple-600" },
              { name: "Toyota Axio", price: "৳4,500", color: "bg-sky-600" },
              { name: "Land Cruiser", price: "৳15,000", color: "bg-amber-600" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-2 whitespace-nowrap">
                <span className={`h-6 w-6 rounded-full ${p.color} flex items-center justify-center text-[10px] font-bold text-white`}>৳</span>
                <span className="text-xs text-silver-300 font-medium">{p.name}</span>
                <span className="text-xs font-bold text-white">{p.price}<span className="text-silver-400 font-normal">/day</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARS.map((c) => (
            <CarCard key={c.id} car={c} onBook={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    {
      icon: <Icon.Steering className="h-6 w-6" />,
      title: "Self-Drive Only",
      desc: "Total freedom and privacy. You're the boss of your journey — no driver, no schedules.",
    },
    {
      icon: <Icon.Shield className="h-6 w-6" />,
      title: "Well-Maintained Cars",
      desc: "Every car is serviced, sanitized and road-tested before every booking. Drive worry-free.",
    },
    {
      icon: <Icon.Calendar className="h-6 w-6" />,
      title: "Flexible Booking",
      desc: "Hourly, daily or weekly — we tailor the package to your trip. Easy changes, easy cancellations.",
    },
    {
      icon: <Icon.Headset className="h-6 w-6" />,
      title: "Local Sylhet Support",
      desc: "Based right in Beanibazar — quick handovers, in-person help, and 24/7 phone support.",
    },
  ];
  return (
    <section className="py-20 sm:py-28 bg-navy-900/40 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold">Why UCAR</div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-3">
            Built for drivers who value <span className="text-accent-500">trust</span>.
          </h2>
          <p className="text-silver-300 mt-4">
            We're a small, local team obsessed with great cars and great service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal group relative bg-navy-800/60 border border-white/5 rounded-2xl p-6 hover:border-accent-500/40 hover:bg-navy-800 transition-all"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-12 w-12 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center mb-5 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                {it.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white">{it.title}</h3>
              <p className="text-sm text-silver-400 mt-2 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Choose your car", d: "Browse the fleet and pick the model and color that fits your trip." },
    { n: "02", t: "Book online or call", d: "Reserve in 60 seconds via the form, WhatsApp or a quick phone call." },
    { n: "03", t: "Pick up & drive", d: "Visit our Beanibazar location, complete a short verification, grab the keys and go." },
    { n: "04", t: "Return safely", d: "Bring the car back on time — we keep the deposit return fast and fair." },
  ];
  return (
    <section id="how" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold">How It Works</div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-3">
            On the road in <span className="text-accent-500">four simple steps</span>.
          </h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative bg-navy-800/60 border border-white/5 rounded-2xl p-6 h-full hover:border-accent-500/40 transition-colors">
                <div className="relative inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-500 text-white font-display font-bold text-xl mb-5 glow-red">
                  {s.n}
                </div>
                <h3 className="font-display font-bold text-lg text-white">{s.t}</h3>
                <p className="text-sm text-silver-400 mt-2 leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-navy-900/40 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold">Reviews</div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-3">
            What our <span className="text-accent-500">drivers</span> say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="reveal bg-navy-800/60 border border-white/5 rounded-2xl p-6 flex flex-col hover:border-accent-500/40 transition-colors"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex gap-0.5 text-accent-500 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Icon.Star key={idx} className="h-4 w-4" />
                ))}
              </div>
              <p className="text-silver-200 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 pt-5 border-t border-white/5">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-base shrink-0 ring-2 ring-white/10`}>
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-silver-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingForm({ selectedCar, formRef }: { selectedCar: Car | null; formRef: React.RefObject<HTMLDivElement | null> }) {
  const [data, setData] = useState({
    car: "",
    pickup: "",
    ret: "",
    location: "Beanibazar, Sylhet",
    name: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedCar) setData((d) => ({ ...d, car: `${selectedCar.name} (${selectedCar.year}) — ${selectedCar.color}` }));
  }, [selectedCar]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello UCAR! I'd like to book:%0A%0A🚗 Car: ${data.car}%0A📅 Pickup: ${data.pickup}%0A📅 Return: ${data.ret}%0A📍 Location: ${data.location}%0A👤 Name: ${data.name}%0A📞 Contact: ${data.contact}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" ref={formRef} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left info */}
          <div className="lg:col-span-2 reveal">
            <div className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold">Book a Car</div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-3">
              Reserve your ride in <span className="text-accent-500">60 seconds</span>.
            </h2>
            <p className="text-silver-300 mt-4">
              Fill in the form — we'll confirm via WhatsApp or a quick call. Prefer to chat first?
              We're a phone call away.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`tel:${PHONE_RAW}`} className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <Icon.Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-silver-400">Call us directly</div>
                  <div className="font-semibold text-white">{PHONE}</div>
                </div>
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Icon.Whatsapp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-silver-400">WhatsApp</div>
                  <div className="font-semibold text-white">+880 1871-765517</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 text-silver-200 flex items-center justify-center">
                  <Icon.Pin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-silver-400">Visit us</div>
                  <div className="font-semibold text-white">Beanibazar, Sylhet, Bangladesh</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-accent-500/30 via-transparent to-white/10 rounded-3xl blur-xl" />
              <form onSubmit={submit} className="relative bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-silver-300 uppercase tracking-wider">Select your car</label>
                  <select
                    required
                    value={data.car}
                    onChange={(e) => setData({ ...data, car: e.target.value })}
                    className="mt-2 w-full bg-navy-800/80 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                  >
                    <option value="">— Choose a car —</option>
                    {CARS.map((c) => (
                      <option key={c.id} value={`${c.name} (${c.year}) — ${c.color}`}>
                        {c.name} {c.year} — {c.color} · ৳{c.price.toLocaleString()}/day
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-silver-300 uppercase tracking-wider">Pickup date</label>
                    <input
                      type="date"
                      required
                      value={data.pickup}
                      onChange={(e) => setData({ ...data, pickup: e.target.value })}
                      className="mt-2 w-full bg-navy-800/80 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-silver-300 uppercase tracking-wider">Return date</label>
                    <input
                      type="date"
                      required
                      value={data.ret}
                      onChange={(e) => setData({ ...data, ret: e.target.value })}
                      className="mt-2 w-full bg-navy-800/80 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-silver-300 uppercase tracking-wider">Pickup location</label>
                  <select
                    value={data.location}
                    onChange={(e) => setData({ ...data, location: e.target.value })}
                    className="mt-2 w-full bg-navy-800/80 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                  >
                    <option>Beanibazar, Sylhet</option>
                    <option>Sylhet City</option>
                    <option>Osmani Airport</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-silver-300 uppercase tracking-wider">Your name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="mt-2 w-full bg-navy-800/80 border border-white/10 text-white placeholder-silver-400 px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-silver-300 uppercase tracking-wider">Contact number</label>
                    <input
                      type="tel"
                      required
                      placeholder="017XX-XXXXXX"
                      value={data.contact}
                      onChange={(e) => setData({ ...data, contact: e.target.value })}
                      className="mt-2 w-full bg-navy-800/80 border border-white/10 text-white placeholder-silver-400 px-4 py-3 rounded-xl focus:border-accent-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="relative overflow-hidden shine w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 rounded-xl transition-all glow-red flex items-center justify-center gap-2"
                >
                  <Icon.Whatsapp className="h-5 w-5" />
                  Send Booking via WhatsApp
                </button>

                {submitted && (
                  <div className="text-center text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-xl py-3">
                    ✓ Opening WhatsApp… We'll confirm your booking shortly.
                  </div>
                )}

                <p className="text-[11px] text-silver-400 text-center">
                  By booking, you agree to UCAR's rental terms. Valid driving license & NID required at pickup.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#home" className="flex items-center gap-2 text-silver-100">
              <Icon.Logo className="h-7 w-auto" />
              <div className="leading-tight">
                <div className="font-display font-bold text-xl">UCAR</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-silver-400 -mt-0.5">Car Rental</div>
              </div>
            </a>
            <p className="text-sm text-silver-400 mt-4 leading-relaxed">
              Premium self-drive car rentals in Beanibazar, Sylhet. Modern fleet,
              transparent pricing, and friendly local support.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Fleet", "How it Works", "Reviews", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-silver-400 hover:text-accent-500 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-silver-300">
              <li className="flex items-start gap-3">
                <Icon.Phone className="h-4 w-4 mt-1 text-accent-500 shrink-0" />
                <a href={`tel:${PHONE_RAW}`} className="hover:text-white">{PHONE}</a>
              </li>
              <li className="flex items-start gap-3">
                <Icon.Whatsapp className="h-4 w-4 mt-1 text-green-400 shrink-0" />
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:text-white">
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon.Pin className="h-4 w-4 mt-1 text-accent-500 shrink-0" />
                <span>Beanibazar, Sylhet, Bangladesh 3170</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon.Mail className="h-4 w-4 mt-1 text-accent-500 shrink-0" />
                <a href="mailto:info@ucar.com.bd" className="hover:text-white">info@ucar.com.bd</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Follow UCAR</h4>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-accent-500 text-silver-200 hover:text-white flex items-center justify-center transition-colors">
                <Icon.Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-accent-500 text-silver-200 hover:text-white flex items-center justify-center transition-colors">
                <Icon.Instagram className="h-4 w-4" />
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-green-500 text-silver-200 hover:text-white flex items-center justify-center transition-colors">
                <Icon.Whatsapp className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 bg-gradient-to-br from-accent-500/15 to-transparent border border-accent-500/20 rounded-2xl p-4">
              <div className="text-xs text-silver-300 mb-1">Need a car right now?</div>
              <a href={`tel:${PHONE_RAW}`} className="font-display font-bold text-xl text-white">{PHONE}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-silver-400">
            © {new Date().getFullYear()} UCAR Car Rental. All rights reserved.
          </p>
          <p className="text-xs text-silver-400">
            Made with <span className="text-accent-500">♥</span> in Sylhet, Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${WHATSAPP}?text=Hi%20UCAR%2C%20I%27d%20like%20to%20rent%20a%20car`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="pulse-ring h-14 w-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <Icon.Whatsapp className="h-6 w-6" />
      </a>
      <a
        href={`tel:${PHONE_RAW}`}
        aria-label="Call"
        className="h-14 w-14 rounded-full bg-accent-500 text-white flex items-center justify-center shadow-2xl glow-red hover:scale-110 transition-transform"
      >
        <Icon.Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  useReveal();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (car?: Car) => {
    if (car) setSelectedCar(car);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="bg-navy-950 text-silver-100 min-h-screen overflow-x-hidden">
      <Navbar onBook={() => scrollToForm()} />
      <Hero onBook={() => scrollToForm()} />
      <Marquee />
      <Fleet onSelect={(c) => scrollToForm(c)} />
      <WhyChoose />
      <HowItWorks />
      <Testimonials />
      <BookingForm selectedCar={selectedCar} formRef={formRef} />
      <Footer />
      <FloatingActions />
    </div>
  );
}
