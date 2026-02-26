import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, Menu, X, PhoneCall, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand, mainNav } from "../../content/site";
import MegaMenu from "../nav/MegaMenu";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";


function useCloseOnRouteChange(isOpen: boolean, onClose: () => void) {
  const location = useLocation();
  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
}

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
  "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czechia",
  "Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
  "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
  "Oman",
  "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar",
  "Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen",
  "Zambia","Zimbabwe",
];

type CallbackForm = {
  subject: string;
  reason: string;
  country: string;
  phone: string;
  email: string;
};

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validatePhone(v: string) {
  // permissive (international): digits + spaces + + - ( )
  const s = v.trim();
  if (!s) return true;
  if (s.length < 7) return false;
  return /^[0-9+\-() ]+$/.test(s);
}

function RequestCallbackModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<CallbackForm>({
    subject: "",
    reason: "",
    country: "",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Country typeahead
  const [countryQuery, setCountryQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRIES.slice(0, 10);
    const starts = COUNTRIES.filter((c) => c.toLowerCase().startsWith(q));
    const includes = COUNTRIES.filter(
      (c) => !c.toLowerCase().startsWith(q) && c.toLowerCase().includes(q)
    );
    return [...starts, ...includes].slice(0, 12);
  }, [countryQuery]);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    // focus first field quickly
    requestAnimationFrame(() => {
      const el = modalRef.current?.querySelector<HTMLInputElement>(
        'input[name="subject"]'
      );
      el?.focus();
    });
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function reset() {
    setForm({ subject: "", reason: "", country: "", phone: "", email: "" });
    setCountryQuery("");
    setCountryOpen(false);
    setErr(null);
  }

  function closeAndReset() {
    onClose();
    reset();
  }

  async function submit(e: React.FormEvent) {
  e.preventDefault();
  setErr(null);

  const subject = form.subject.trim();
  const reason = form.reason.trim();
  const country = form.country.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();

  if (!subject) return setErr("Subject is required.");
  if (!reason) return setErr("Reason is required.");
  if (!country) return setErr("Country is required.");

  if (!email && !phone) return setErr("Please provide either a phone number or an email.");
  if (email && !validateEmail(email)) return setErr("Please enter a valid email address.");
  if (phone && !validatePhone(phone)) return setErr("Please enter a valid phone number.");

  setSubmitting(true);
  try {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const res = await fetch(`${API_BASE}/api/callback-requests/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, reason, country, phone, email }),
    });

    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const j = await res.json();
        msg = j?.message || j?.error || msg;
      } catch {}
      throw new Error(msg);
    }
toast.success("We will get in touch with you soon");
    // optional: show toast later
    closeAndReset();
  } catch (e: any) {
    setErr(e?.message || "Failed to submit. Please try again.");
  } finally {
    setSubmitting(false);
  }
}


  if (!open) return null;

  return (
    <div
  className="fixed inset-0 z-[100] flex items-start justify-center px-4 py-6 overflow-y-auto"

      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        // click outside closes
        if (e.target === e.currentTarget) closeAndReset();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card"
      >
        <div className="flex items-start justify-between gap-4 border-b border-brand-line p-6">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs font-semibold text-brand-navy">
              <PhoneCall className="h-4 w-4" />
              Request a Call back
            </div>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
              Tell us how we can help
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Fill the details below. Provide <span className="font-semibold">either</span> a phone number{" "}
              <span className="font-semibold">or</span> an email.
            </p>
          </div>

          <button
            type="button"
            onClick={closeAndReset}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line hover:bg-brand-mist"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6">
          {err && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Subject *</label>
              <input
                name="subject"
                value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-blue"
                placeholder="e.g. Partnership inquiry"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Reason *</label>
              <textarea
                value={form.reason}
                onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-blue"
                rows={4}
                placeholder="Tell us a bit more about what you need..."
              />
            </div>

            {/* Country autocomplete */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Country *</label>

              <div className="relative mt-1">
                <button
                  type="button"
                  onClick={() => setCountryOpen((v) => !v)}
                  className="absolute right-2 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-brand-mist"
                  aria-label="Toggle country list"
                >
                  <ChevronDown className={clsx("h-4 w-4 transition-transform", countryOpen && "rotate-180")} />
                </button>

                <input
                  value={countryQuery}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCountryQuery(v);
                    setCountryOpen(true);
                    setForm((p) => ({ ...p, country: "" })); // enforce selecting from list
                  }}
                  onFocus={() => setCountryOpen(true)}
                  className="w-full rounded-xl border border-brand-line px-3 py-2 pr-12 text-sm outline-none focus:border-brand-blue"
                  placeholder="Type to search… e.g. por"
                />

                {countryOpen && (
                  <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                    <div className="max-h-56 overflow-auto p-2">
                      {filteredCountries.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-slate-600">No matches</div>
                      ) : (
                        filteredCountries.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setForm((p) => ({ ...p, country: c }));
                              setCountryQuery(c);
                              setCountryOpen(false);
                            }}
                            className={clsx(
                              "w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-brand-mist",
                              form.country === c && "bg-brand-mist"
                            )}
                          >
                            {c}
                          </button>
                        ))
                      )}
                    </div>
                    <div className="border-t border-brand-line bg-brand-mist px-3 py-2 text-xs text-slate-600">
                      Tip: choose from list so it saves correctly.
                    </div>
                  </div>
                )}
              </div>

              {form.country && (
                <div className="mt-2 text-xs text-slate-600">
                  Selected: <span className="font-semibold text-slate-800">{form.country}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-blue"
                placeholder="+351 912 345 678"
              />
              <p className="mt-1 text-xs text-slate-500">Provide phone OR email (one is required).</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Email (optional)</label>
              <input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-blue"
                placeholder="name@example.com"
              />
              <p className="mt-1 text-xs text-slate-500">Provide email OR phone (one is required).</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={closeAndReset}
              className="rounded-xl border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
            >
              Cancel
            </button>

            <button
              disabled={submitting || !form.subject.trim() || !form.reason.trim()}
              className="rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useCloseOnRouteChange(mobileOpen, () => setMobileOpen(false));

  const desktopNav = useMemo(
    () => (mainNav || []).filter((i) => i && i.label && i.label !== "Home"),
    []
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-header">
      <RequestCallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      {/* Top utility row */}
      <div className="border-b border-brand-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* ✅ Clean logo: no borders */}
          <Link to="/" className="flex items-center gap-4" aria-label={`${brand.orgName} home`}>
            <img
              src={logo}
              alt={`${brand.orgName} logo`}
              className="h-[86px] w-[86px] md:h-[96px] md:w-[96px] object-contain"
            />
            <div className="leading-tight">
              <div className="font-heading text-lg md:text-xl font-semibold tracking-wide text-brand-navy">
                {brand.orgName.toUpperCase()}
              </div>
              
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
           <div className="flex items-center gap-5">
    
    <a
      href="https://instagram.com/yourhandle"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      className="transition-transform hover:scale-110"
    >
      <FaInstagram className="h-5 w-5" style={{ color: "#E1306C" }} />
    </a>

    <a
      href="https://facebook.com/yourpage"
      target="_blank"
      rel="noreferrer"
      aria-label="Facebook"
      className="transition-transform hover:scale-110"
    >
      <FaFacebookF className="h-5 w-5" style={{ color: "#1877F2" }} />
    </a>

    <a
      href="https://linkedin.com/company/yourcompany"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
      className="transition-transform hover:scale-110"
    >
      <FaLinkedinIn className="h-5 w-5" style={{ color: "#0A66C2" }} />
    </a>

    <a
      href="https://x.com/yourhandle"
      target="_blank"
      rel="noreferrer"
      aria-label="X"
      className="transition-transform hover:scale-110"
    >
      <FaXTwitter className="h-5 w-5" style={{ color: "#000000" }} />
    </a>

  </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-brand-line px-3 py-1.5 text-sm text-slate-700 hover:bg-brand-mist"
              aria-label="Search"
              onClick={() => {
                const el = document.getElementById("search-hint");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>

            {/* ✅ NEW: Request callback button (replaces About/Contact links) */}
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy2"
            >
              <PhoneCall className="h-4 w-4" />
              Request a Call back
            </button>
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-line hover:bg-brand-mist"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 relative">
          <div className="hidden md:flex items-center gap-6 py-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  "font-heading text-xs uppercase tracking-[0.18em] text-slate-800 hover:text-brand-blue",
                  isActive && "text-brand-blue"
                )
              }
              end
            >
              Home
            </NavLink>

            {desktopNav
              .filter(Boolean)
              .map((item) => {
                if (!item?.label) return null;

                return item.children ? (
                  <MegaMenu key={item.label} item={item} />
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.href || "#"}
                    className={({ isActive }) =>
                      clsx(
                        "font-heading text-xs uppercase tracking-[0.18em] text-slate-800 hover:text-brand-blue",
                        isActive && "text-brand-blue"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
          </div>

          {/* Mobile menu */}
          <div className={clsx("md:hidden", mobileOpen ? "block" : "hidden")}>
            <div className="pb-4">
              <div className="flex items-center gap-3 pt-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  placeholder="Search (demo)"
                  className="w-full rounded-lg border border-brand-line px-3 py-2 text-sm"
                />
              </div>

              {/* ✅ Mobile CTA */}
              <button
                type="button"
                onClick={() => setCallbackOpen(true)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
              >
                <PhoneCall className="h-4 w-4" />
                Request a Call back
              </button>

              <nav className="mt-4 space-y-2" aria-label="Mobile">
                {(mainNav || []).filter(Boolean).map((item) => (
                  <div key={item.label} className="rounded-xl border border-brand-line">
                    {item.href ? (
                      <Link to={item.href} className="block px-4 py-3 font-heading text-sm font-semibold text-slate-800">
                        {item.label}
                      </Link>
                    ) : (
                      <div className="px-4 py-3 font-heading text-sm font-semibold text-slate-800">{item.label}</div>
                    )}

                    {item.children && (
                      <div className="border-t border-brand-line bg-brand-mist p-3">
                        <div className="grid gap-2">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              to={c.href}
                              className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
