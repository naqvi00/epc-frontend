import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Plus, Save, Trash2, UploadCloud, X, Loader2, BadgeCheck } from "lucide-react";
import { uploadToCloudinarySigned } from "../../lib/cloudinaryUpload";
import { getToken } from "../../api/api";

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
  images: PlanImage[];
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // form modal
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MembershipPlan | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploadPct, setUploadPct] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  // fields
  const [subject, setSubject] = useState("");
  const [planName, setPlanName] = useState("");
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [intro, setIntro] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [billing, setBilling] = useState<Billing>("month");
  const [featuresText, setFeaturesText] = useState("");
  const [images, setImages] = useState<PlanImage[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState<number>(0);

  const features = useMemo(() => {
    return featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [featuresText]);

  async function authedFetch(url: string, init?: RequestInit) {
    const token = getToken();
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
    });

    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const j = await res.json();
        msg = j?.message || j?.error || msg;
      } catch {}
      throw new Error(msg);
    }

    return res.json();
  }

  function resetForm() {
    setEditing(null);
    setSubject("");
    setPlanName("");
    setTitle("");
    setShort("");
    setIntro("");
    setPrice(0);
    setBilling("month");
    setFeaturesText("");
    setImages([]);
    setIsActive(true);
    setSortOrder(0);
    setUploadPct(0);
    setUploading(false);
  }

  async function loadPlans() {
    setErr(null);
    setLoading(true);
    try {
      const data = await authedFetch(`${API_BASE}/api/memberships/plans/admin`);
      setPlans(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message || "Failed to load plans");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    resetForm();
    setOpen(true);
  }

  function openEdit(p: MembershipPlan) {
    setEditing(p);
    setSubject(p.subject || "");
    setPlanName(p.plan || "");
    setTitle(p.title || "");
    setShort(p.short || "");
    setIntro(p.intro || "");
    setPrice(Number(p.price || 0));
    setBilling(p.billing || "month");
    setFeaturesText((p.features || []).join("\n"));
    setImages(p.images || []);
    setIsActive(Boolean(p.isActive));
    setSortOrder(Number(p.sortOrder || 0));
    setOpen(true);
  }

  async function savePlan() {
    try {
      setSaving(true);
      setErr(null);

      if (!subject.trim() || !planName.trim() || !title.trim() || !short.trim() || !intro.trim()) {
        throw new Error("Subject, Plan, Title, Short, Intro are required.");
      }

      const payload = {
        subject: subject.trim(),
        plan: planName.trim(),
        title: title.trim(),
        short: short.trim(),
        intro: intro.trim(),
        price: Number(price || 0),
        billing,
        features,
        images, // [{secureUrl, publicId}]
        isActive,
        sortOrder: Number(sortOrder || 0),
      };

      if (editing) {
        await authedFetch(`${API_BASE}/api/memberships/plans/admin/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await authedFetch(`${API_BASE}/api/memberships/plans/admin`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setOpen(false);
      resetForm();
      await loadPlans();
    } catch (e: any) {
      setErr(e?.message || "Failed to save plan");
    } finally {
      setSaving(false);
    }
  }

  async function deletePlan(id: string) {
    const ok = confirm("Delete this plan?");
    if (!ok) return;

    try {
      setErr(null);
      await authedFetch(`${API_BASE}/api/memberships/plans/admin/${id}`, { method: "DELETE" });
      await loadPlans();
    } catch (e: any) {
      setErr(e?.message || "Failed to delete plan");
    }
  }

  async function onPickImages(files: FileList | null) {
    if (!files || files.length === 0) return;

    try {
      setErr(null);

      for (const file of Array.from(files)) {
        setUploading(true);
        setUploadPct(0);

        const uploaded = await uploadToCloudinarySigned(file, {
          folder: "epc/memberships",
          onProgress: (pct) => setUploadPct(pct),
        });

        setImages((prev) => [...prev, uploaded]);

        setUploading(false);
        setUploadPct(0);
      }
    } catch (e: any) {
      setUploading(false);
      setUploadPct(0);
      setErr(e?.message || "Image upload failed");
    }
  }

  function removeImage(publicId: string) {
    setImages((prev) => prev.filter((img) => img.publicId !== publicId));
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Admin
            </p>
            <h1 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
              Membership Plans
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Create, edit, activate, set pricing and upload images (Cloudinary).
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadPlans}
              className="rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
            >
              Refresh
            </button>

            <button
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy2"
            >
              <Plus className="h-4 w-4" />
              Add plan
            </button>
          </div>
        </div>

        {err && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {err}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading…
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => {
              const cover = p.images?.[0]?.secureUrl;
              return (
                <div key={p._id} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                  <div className="relative">
                    <img
                      src={
                        cover ||
                        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt={p.title}
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy">
                      {p.subject}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">{p.plan}</div>
                      <div className="text-sm font-semibold text-brand-navy">
                        £{Number(p.price || 0).toLocaleString()}
                        {p.billing === "month" ? "/mo" : p.billing === "year" ? "/yr" : ""}
                      </div>
                    </div>

                    <div className="mt-3 font-heading text-lg font-semibold text-slate-900">{p.title}</div>
                    <div className="mt-2 text-sm text-slate-700 line-clamp-2">{p.short}</div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className={clsx("text-xs font-semibold", p.isActive ? "text-emerald-700" : "text-slate-500")}>
                        {p.isActive ? "Active" : "Inactive"}
                      </div>

                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-xl border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-mist"
                      >
                        Edit
                      </button>
                    </div>

                    <button
                      onClick={() => deletePlan(p._id)}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-brand-line p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {editing ? "Edit plan" : "Create plan"}
                </div>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-900">
                  Membership Plan
                </h2>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line hover:bg-brand-mist"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-12 overflow-y-auto">
              {/* LEFT */}
              <div className="md:col-span-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject (e.g. Geopolitical Risk)"
                    className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                  />
                  <input
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="Plan name (e.g. Professional)"
                    className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                  />
                </div>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (card headline)"
                  className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                />

                <textarea
                  value={short}
                  onChange={(e) => setShort(e.target.value)}
                  placeholder="Short description (card)"
                  rows={3}
                  className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                />

                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Intro (modal long text)"
                  rows={6}
                  className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Price"
                    className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                  />

                  <select
                    value={billing}
                    onChange={(e) => setBilling(e.target.value as Billing)}
                    className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm font-semibold outline-none"
                  >
                    <option value="month">month</option>
                    <option value="year">year</option>
                    <option value="one-time">one-time</option>
                  </select>

                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    placeholder="Sort order"
                    className="w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="active"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="active" className="text-sm font-semibold text-slate-700">
                    Active (visible on public membership page)
                  </label>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-900">Features (one per line)</div>
                  <textarea
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-brand-line px-4 py-3 text-sm outline-none"
                    placeholder={`Example:\nInvite-only roundtables\nPriority registration\nMember briefings`}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-5">
                <div className="rounded-2xl border border-brand-line bg-brand-mist p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <BadgeCheck className="h-4 w-4" />
                    Images
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Upload to Cloudinary. First image will be used as card cover.
                  </p>

                  <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy2">
                    <UploadCloud className="h-4 w-4" />
                    Upload images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => onPickImages(e.target.files)}
                    />
                  </label>

                  {uploading && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-slate-700">
                        <span>Uploading…</span>
                        <span>{uploadPct}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                        <div className="h-2 rounded-full bg-brand-navy" style={{ width: `${uploadPct}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 grid gap-3">
                    {images.map((img) => (
                      <div key={img.publicId} className="relative overflow-hidden rounded-xl border border-brand-line bg-white">
                        <img src={img.secureUrl} alt="uploaded" className="h-28 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(img.publicId)}
                          className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow"
                          aria-label="Remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {images.length === 0 && (
                      <div className="rounded-xl border border-brand-line bg-white p-4 text-sm text-slate-600">
                        No images uploaded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-brand-line p-5">
              <button
                onClick={savePlan}
                disabled={saving}
                className={clsx(
                  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
                  saving ? "bg-brand-navy/70 text-white cursor-not-allowed" : "bg-brand-navy text-white hover:bg-brand-navy2"
                )}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save plan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}