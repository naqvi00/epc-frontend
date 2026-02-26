





import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { X, Filter, CheckCircle2, Loader2 } from "lucide-react";

type ContactChoice = "email" | "phone";

type Billing = "month" | "year" | "one-time";
type PlanImage = { secureUrl: string; publicId: string };

type MembershipPlan = {
  _id: string;
  subject: string;
  plan: string;
  title: string;
  short: string;
  intro: string;
  price: number;
  billing: Billing;
  features: string[];
images: PlanImage[]; // from admin
  isActive?: boolean;
};

function formatPrice(price: number, billing: Billing) {
  const suffix = billing === "month" ? "/mo" : billing === "year" ? "/yr" : "";
  return `£${Number(price || 0).toLocaleString()}${suffix}`;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Membership() {
  // ✅ backend plans
  const [plansData, setPlansData] = useState<MembershipPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);

  // Filters
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  // Modal
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = useMemo(
    () => plansData.find((p) => p._id === openId) || null,
    [openId, plansData]
  );

  // Form
  const [contactChoice, setContactChoice] = useState<ContactChoice>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Submit states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch plans from backend
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoadingPlans(true);
        setPlansError(null);

        const res = await fetch(`${API_BASE}/api/memberships/plans/public`);
        if (!res.ok) throw new Error("Failed to load membership plans");
        const data = await res.json();

        if (!cancelled) setPlansData(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!cancelled) setPlansError(e?.message || "Failed to load plans");
      } finally {
        if (!cancelled) setLoadingPlans(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derived filters from backend plans
  const subjects = useMemo(() => {
    const set = new Set(plansData.map((p) => p.subject).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [plansData]);

  const planNames = useMemo(() => {
    const set = new Set(plansData.map((p) => p.plan).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [plansData]);

  // Filtered list
  const filtered = useMemo(() => {
    return plansData.filter((p) => {
      const subjectOk = subjectFilter === "All" || p.subject === subjectFilter;
      const planOk = planFilter === "All" || p.plan === planFilter;
      return subjectOk && planOk;
    });
  }, [plansData, subjectFilter, planFilter]);

  function resetForm() {
    setContactChoice("email");
    setName("");
    setEmail("");
    setPhone("");
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError(null);
  }

  function closeModal() {
    setOpenId(null);
    resetForm();
  }

  async function submitRequest() {
    if (!selected) return;

    const trimmedName = name.trim();
    if (!trimmedName) return;

    if (contactChoice === "email" && !email.trim()) return;
    if (contactChoice === "phone" && !phone.trim()) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      const payload = {
        planId: selected._id,
        name: trimmedName,
        contactMethod: contactChoice,
        email: contactChoice === "email" ? email.trim() : undefined,
        phone: contactChoice === "phone" ? phone.trim() : undefined,
      };

      const res = await fetch(`${API_BASE}/api/memberships/requests/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit request");

      setSubmitted(true);
    } catch (e: any) {
      setSubmitError(e?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  }

  const fallbackImg =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-ink">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-blue blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-brand-teal blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Membership
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
              Membership at the Eurasia Policy Council is built for people and institutions who want{" "}
              <span className="font-semibold text-white">clarity, access, and credibility</span>—not noise.
              We combine impartial research with practical dialogue, giving members early signals, trusted networks,
              and policy tools they can use immediately.
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
                <div className="text-sm font-semibold text-white">Practical intelligence</div>
                <div className="mt-2 text-sm text-white/80">Briefings that translate complexity into decisions.</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
                <div className="text-sm font-semibold text-white">Access & dialogue</div>
                <div className="mt-2 text-sm text-white/80">Curated forums and closed-door roundtables.</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
                <div className="text-sm font-semibold text-white">Credible networks</div>
                <div className="mt-2 text-sm text-white/80">Connect with serious participants and institutions.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Explore memberships
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                Choose a plan that matches your needs
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Filter by subject area or plan type. Click <span className="font-semibold">Check</span> to view details
                and request membership.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm shadow-card">
                <Filter className="h-4 w-4 text-slate-600" />
                <span className="text-slate-700">Subject</span>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="ml-2 bg-transparent text-sm font-semibold text-slate-900 outline-none"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm shadow-card">
                <span className="text-slate-700">Plan</span>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="ml-2 bg-transparent text-sm font-semibold text-slate-900 outline-none"
                >
                  {planNames.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* STATES */}
          {loadingPlans && (
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading membership plans…
            </div>
          )}

          {plansError && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
              {plansError}
            </div>
          )}

          {/* GRID */}
          {!loadingPlans && !plansError && (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => {
                  const img = p.images?.[0]?.secureUrl || fallbackImg;

                  return (
                    <div key={p._id} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                      <div className="relative">
                        <img src={img} alt={p.title} className="h-44 w-full object-cover" />
                        <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy">
                          {p.subject}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-slate-900">{p.plan}</div>
                          <div className="text-sm font-semibold text-brand-navy">
                            {formatPrice(p.price, p.billing)}
                          </div>
                        </div>

                        <h3 className="mt-3 font-heading text-lg font-semibold text-slate-900">{p.title}</h3>
                        <p className="mt-2 text-sm text-slate-700">{p.short}</p>

                        <button
                          type="button"
                          onClick={() => setOpenId(p._id)}
                          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
                        >
                          Check
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="mt-10 rounded-2xl border border-brand-line bg-brand-mist p-6 text-sm text-slate-700">
                  No memberships match the selected filters.
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-brand-line p-6">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {selected.subject} • {selected.plan}
                </div>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-900">{selected.title}</h3>
                <div className="mt-2 text-sm font-semibold text-brand-navy">
                  {formatPrice(selected.price, selected.billing)}
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line hover:bg-brand-mist"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-12 overflow-y-auto">
              <div className="md:col-span-5">
                <img
                  src={selected.images?.[0]?.secureUrl || fallbackImg}
                  alt={selected.title}
                  className="h-56 w-full rounded-2xl border border-brand-line object-cover"
                />

                <div className="mt-4 rounded-2xl border border-brand-line bg-brand-mist p-4">
                  <div className="text-sm font-semibold text-slate-900">What’s included</div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {(selected.features || []).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-blue" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-7">
                <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{selected.intro}</p>

                <div className="mt-6 rounded-2xl border border-brand-line bg-white p-5">
                  <div className="text-sm font-semibold text-slate-900">Request this membership</div>
                  <p className="mt-1 text-sm text-slate-600">
                    Enter your name and choose one contact method. We’ll share your request with the admin team.
                  </p>

                  <div className="mt-4 grid gap-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="inline-flex rounded-xl border border-brand-line bg-brand-mist p-1">
                        <button
                          type="button"
                          onClick={() => setContactChoice("email")}
                          className={clsx(
                            "rounded-lg px-4 py-2 text-sm font-semibold",
                            contactChoice === "email"
                              ? "bg-white text-brand-navy shadow-card"
                              : "text-slate-700 hover:bg-white/60"
                          )}
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactChoice("phone")}
                          className={clsx(
                            "rounded-lg px-4 py-2 text-sm font-semibold",
                            contactChoice === "phone"
                              ? "bg-white text-brand-navy shadow-card"
                              : "text-slate-700 hover:bg-white/60"
                          )}
                        >
                          Phone
                        </button>
                      </div>

                      <div className="flex-1">
                        {contactChoice === "email" ? (
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                          />
                        ) : (
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number"
                            className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
                          />
                        )}
                      </div>
                    </div>

                    {submitError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                        {submitError}
                      </div>
                    )}

                    {!submitted ? (
                      <button
                        type="button"
                        onClick={submitRequest}
                        disabled={submitting}
                        className={clsx(
                          "mt-2 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                          submitting
                            ? "bg-brand-navy/70 text-white cursor-not-allowed"
                            : "bg-brand-navy text-white hover:bg-brand-navy2"
                        )}
                      >
                        {submitting ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting…
                          </span>
                        ) : (
                          "Get this plan"
                        )}
                      </button>
                    ) : (
                      <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                        Request sent successfully. Our team will contact you soon.
                      </div>
                    )}

                    <div className="text-xs text-slate-500">
                      By submitting, you agree to be contacted about membership.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-brand-line p-5 text-right">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-brand-line bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-mist"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}