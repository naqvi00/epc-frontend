import React, { useEffect, useMemo, useState } from "react";
import { getToken } from "../../api/api";
import { uploadToCloudinarySigned } from "../../lib/cloudinaryUpload";

type PostType = "Online analysis" | "Research paper" | "Briefing" | "Report";
type SectionType = "featured" | "latest" | "archive";

type Item = {
  _id: string;
  section: SectionType;
  type: PostType;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  body: string;
  sortOrder: number;
  isPublished: boolean;
};

const PAGE = "universities"; 

const emptyForm: Omit<Item, "_id"> = {
  section: "featured",
  type: "Research paper",
  title: "",
  subtitle: "",
  author: "",
  date: "",
  imageUrl: "",
  excerpt: "",
  body: "",
  sortOrder: 0,
  isPublished: true,
};

function sectionLabel(s: SectionType) {
  if (s === "featured") return "Featured (Upper blocks)";
  if (s === "latest") return "Latest blogs (Grid)";
  return "Archive (Lower list)";
}

function folderForSection(s: SectionType) {
  return `epc/uploads/${PAGE}/${s}`;
}

export default function AdminInstitutions() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const token = getToken(); 
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<string | null>(null);

  const [uploadPct, setUploadPct] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [activeSection, setActiveSection] = useState<SectionType>("featured");

  async function authedFetch(url: string, init?: RequestInit) {
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

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const data = await authedFetch(`${API_BASE}/api/institutions/${PAGE}/admin`);
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE]);

  const grouped = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const sa = a.sortOrder ?? 0;
      const sb = b.sortOrder ?? 0;
      if (sa !== sb) return sa - sb;
      return (b._id || "").localeCompare(a._id || "");
    });

    return {
      featured: sorted.filter((x) => x.section === "featured"),
      latest: sorted.filter((x) => x.section === "latest"),
      archive: sorted.filter((x) => x.section === "archive"),
    };
  }, [items]);

  const listForTab = grouped[activeSection];

  function startEdit(x: Item) {
    setEditId(x._id);
    setForm({
      section: x.section,
      type: x.type,
      title: x.title,
      subtitle: x.subtitle || "",
      author: x.author,
      date: x.date,
      imageUrl: x.imageUrl,
      excerpt: x.excerpt,
      body: x.body,
      sortOrder: x.sortOrder ?? 0,
      isPublished: x.isPublished,
    });
    setUploadPct(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditId(null);
    setForm({ ...emptyForm, section: activeSection });
    setUploadPct(0);
  }

  async function onPickImage(file: File) {
    setError(null);

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) return setError("Only JPG, PNG, WEBP allowed");
    if (file.size > 10 * 1024 * 1024) return setError("Max image size 10MB");

    setUploading(true);
    setUploadPct(0);

    try {
      const { secureUrl } = await uploadToCloudinarySigned(file, {
        folder: folderForSection(form.section),
        onProgress: (pct) => setUploadPct(pct),
      });
      setForm((p) => ({ ...p, imageUrl: secureUrl }));
    } catch (e: any) {
      setError(e?.error?.message || e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !form.section ||
      !form.type ||
      !form.title.trim() ||
      !form.author.trim() ||
      !form.date.trim() ||
      !form.imageUrl.trim() ||
      !form.excerpt.trim() ||
      !form.body.trim()
    ) {
      return setError("Required: section, type, title, author, date, image, excerpt, body");
    }

    setSaving(true);
    try {
      if (editId) {
        const updated = await authedFetch(`${API_BASE}/api/institutions/${PAGE}/admin/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setItems((p) => p.map((i) => (i._id === updated._id ? updated : i)));
      } else {
        const created = await authedFetch(`${API_BASE}/api/institutions/${PAGE}/admin`, {
          method: "POST",
          body: JSON.stringify(form),
        });
        setItems((p) => [created, ...p]);
      }
      resetForm();
    } catch (e: any) {
      setError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(x: Item) {
    const next = !x.isPublished;
    setItems((p) => p.map((i) => (i._id === x._id ? { ...i, isPublished: next } : i)));

    try {
      const updated = await authedFetch(`${API_BASE}/api/institutions/${PAGE}/admin/${x._id}`, {
        method: "PUT",
        body: JSON.stringify({ isPublished: next }),
      });
      setItems((p) => p.map((i) => (i._id === updated._id ? updated : i)));
    } catch (e: any) {
      setItems((p) => p.map((i) => (i._id === x._id ? x : i)));
      setError(e?.message || "Update failed");
    }
  }

  async function remove(x: Item) {
    if (!window.confirm(`Delete this item?\n\n${x.title}`)) return;

    const prev = items;
    setItems((p) => p.filter((i) => i._id !== x._id));

    try {
      await authedFetch(`${API_BASE}/api/institutions/${PAGE}/admin/${x._id}`, { method: "DELETE" });
    } catch (e: any) {
      setItems(prev);
      setError(e?.message || "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-ink">Universities Page Content</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage Featured / Latest blogs / Archive separately. Only Published items show on the public page.
          </p>
        </div>
        <button
          onClick={load}
          className="rounded-xl border border-brand-line px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["featured", "latest", "archive"] as SectionType[]).map((s) => (
          <button
            key={s}
            onClick={() => {
              setActiveSection(s);
              if (!editId) setForm((p) => ({ ...p, section: s }));
            }}
            className={[
              "rounded-xl border px-3 py-2 text-sm font-semibold",
              activeSection === s
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-brand-line bg-white text-slate-700 hover:bg-brand-mist",
            ].join(" ")}
          >
            {sectionLabel(s)} ({grouped[s].length})
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={submit} className="mt-5 rounded-2xl border border-brand-line bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="font-heading text-lg font-bold text-brand-ink">
            {editId ? "Edit" : "Add"} ({sectionLabel(form.section)})
          </div>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-brand-line px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Section</label>
            <select
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.section}
              onChange={(e) => setForm((p) => ({ ...p, section: e.target.value as SectionType }))}
            >
              <option value="featured">Featured (Upper blocks)</option>
              <option value="latest">Latest blogs (Grid)</option>
              <option value="archive">Archive (Lower list)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Type</label>
            <select
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as PostType }))}
            >
              <option>Online analysis</option>
              <option>Research paper</option>
              <option>Briefing</option>
              <option>Report</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Title</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Subtitle (optional)</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.subtitle}
              onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Author</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.author}
              onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Date</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Sort Order</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.sortOrder}
              onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700">Published</label>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Image</label>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPickImage(f);
                }}
              />
              {uploading && (
                <div className="flex-1">
                  <div className="h-2 w-full rounded-full bg-brand-mist">
                    <div className="h-2 rounded-full bg-brand-blue" style={{ width: `${uploadPct}%` }} />
                  </div>
                  <div className="mt-1 text-xs text-slate-600">{uploadPct}%</div>
                </div>
              )}
            </div>

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Uploaded"
                className="mt-3 h-40 w-full max-w-xl rounded-2xl border border-brand-line object-cover"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Excerpt</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Body</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              rows={8}
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button disabled={saving} className="rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving..." : editId ? "Update" : "Create"}
          </button>

          {!editId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-brand-line px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <div className="font-heading text-lg font-bold text-brand-ink">
          {sectionLabel(activeSection)} ({listForTab.length})
        </div>

        {loading ? (
          <div className="mt-3 text-sm text-slate-600">Loading…</div>
        ) : listForTab.length === 0 ? (
          <div className="mt-3 text-sm text-slate-600">No items yet in this section.</div>
        ) : (
          <div className="mt-3 space-y-3">
            {listForTab.map((x) => (
              <div key={x._id} className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {x.section} • {x.type}
                    </div>
                    <div className="mt-1 font-body text-sm font-semibold text-slate-900">{x.title}</div>
                    <div className="mt-1 text-xs text-slate-600">{x.date} • {x.author}</div>
                    <div className="mt-2 text-xs text-slate-500">
                      sortOrder: <span className="font-semibold">{x.sortOrder ?? 0}</span> •{" "}
                      <span className={x.isPublished ? "font-semibold text-emerald-700" : "font-semibold text-slate-500"}>
                        {x.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => togglePublish(x)}
                      className="rounded-xl border border-brand-line px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                    >
                      {x.isPublished ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => startEdit(x)}
                      className="rounded-xl border border-brand-line px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => remove(x)}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {x.imageUrl && (
                  <img src={x.imageUrl} alt={x.title} className="mt-4 h-40 w-full rounded-2xl border border-brand-line object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
