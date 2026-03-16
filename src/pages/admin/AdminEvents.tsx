import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/api";

type EventItem = {
  _id: string;
  title: string;
  date: string;
  location: string;
  format: string;
  imageUrl?: string;
  recap?: string;
  isPublished: boolean;
  showInPast: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

const emptyForm = {
  title: "",
  date: "",
  location: "",
  format: "In-person",
  imageUrl: "",
  recap: "",
  isPublished: true,
  showInPast: false,
  sortOrder: 0,
};

type CloudinarySignResponse = {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  uploadPreset: string;
  folder: string;
};

export default function AdminEvents() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const data = await apiFetch<EventItem[]>("/api/events");
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const ao = a.sortOrder ?? 0;
      const bo = b.sortOrder ?? 0;
      if (ao !== bo) return ao - bo;
      return (b.createdAt || "").localeCompare(a.createdAt || "");
    });
  }, [items]);

  function startEdit(item: EventItem) {
    setEditId(item._id);
    setForm({
      title: item.title,
      date: item.date,
      location: item.location,
      format: item.format,
      imageUrl: item.imageUrl || "",
      recap: item.recap || "",
      isPublished: item.isPublished,
      showInPast: item.showInPast ?? false,
      sortOrder: item.sortOrder ?? 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditId(null);
    setForm({ ...emptyForm });
  }

  async function getCloudinarySignature(): Promise<CloudinarySignResponse> {
    return apiFetch<CloudinarySignResponse>("/api/admin/cloudinary/sign", {
      method: "POST",
      body: JSON.stringify({ folder: "epc/events" }),
    });
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const sig = await getCloudinarySignature();

    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sig.apiKey);
    fd.append("timestamp", String(sig.timestamp));
    fd.append("signature", sig.signature);
    fd.append("upload_preset", sig.uploadPreset);
    fd.append("folder", sig.folder);

    const resp = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
      method: "POST",
      body: fd,
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data?.error?.message || "Image upload failed");
    return data.secure_url;
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.date.trim() || !form.location.trim() || !form.format.trim()) {
      setError("Please fill: title, date, location, format");
      return;
    }

    setSaving(true);
    try {
      if (editId) {
        const updated = await apiFetch<EventItem>(`/api/events/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setItems((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
      } else {
        const created = await apiFetch<EventItem>("/api/events", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setItems((prev) => [created, ...prev]);
      }

      resetForm();
    } catch (e: any) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(item: EventItem) {
    setError(null);
    const next = !item.isPublished;

    setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, isPublished: next } : x)));

    try {
      const updated = await apiFetch<EventItem>(`/api/events/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({ isPublished: next }),
      });
      setItems((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
    } catch (e: any) {
      setItems((prev) => prev.map((x) => (x._id === item._id ? item : x)));
      setError(e.message || "Update failed");
    }
  }

  async function togglePast(item: EventItem) {
    setError(null);
    const next = !item.showInPast;

    setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, showInPast: next } : x)));

    try {
      const updated = await apiFetch<EventItem>(`/api/events/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({ showInPast: next }),
      });
      setItems((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
    } catch (e: any) {
      setItems((prev) => prev.map((x) => (x._id === item._id ? item : x)));
      setError(e.message || "Failed to update Past page status");
    }
  }

  async function remove(item: EventItem) {
    const ok = window.confirm(`Delete event?\n\n${item.title}`);
    if (!ok) return;

    setError(null);
    const prev = items;
    setItems((p) => p.filter((x) => x._id !== item._id));

    try {
      await apiFetch<{ ok: boolean }>(`/api/events/${item._id}`, { method: "DELETE" });
    } catch (e: any) {
      setItems(prev);
      setError(e.message || "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-ink">Events</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage upcoming events and choose which events also appear on the Past Events page.
          </p>
        </div>

        <button
          onClick={load}
          className="rounded-xl border border-brand-line px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={submitForm} className="mt-5 rounded-2xl border border-brand-line bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="font-heading text-lg font-bold text-brand-ink">
            {editId ? "Edit Event" : "Add New Event"}
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
            <label className="text-sm font-semibold text-slate-700">Title</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Closed-door roundtable: …"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Date (YYYY-MM-DD)</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              placeholder="2026-03-05"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Location</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.location}
              onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              placeholder="London, UK"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Format</label>
            <select
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.format}
              onChange={(e) => setForm((p) => ({ ...p, format: e.target.value }))}
            >
              <option>In-person</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Recap / Summary for Past Page</label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.recap}
              onChange={(e) => setForm((p) => ({ ...p, recap: e.target.value }))}
              placeholder="Short summary for the Past Events page..."
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

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700">Show on Past page</label>
            <input
              type="checkbox"
              checked={form.showInPast}
              onChange={(e) => setForm((p) => ({ ...p, showInPast: e.target.checked }))}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Sort Order (smaller shows first)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.sortOrder}
              onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Event Image</label>

            <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-center">
              <input
                type="file"
                accept="image/*"
                className="w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setSaving(true);
                  setError(null);

                  try {
                    const url = await uploadToCloudinary(file);
                    setForm((p) => ({ ...p, imageUrl: url }));
                  } catch (err: any) {
                    setError(err.message || "Image upload failed");
                  } finally {
                    setSaving(false);
                  }
                }}
              />

              {form.imageUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={form.imageUrl}
                    alt="Event"
                    className="h-16 w-16 rounded-xl border border-brand-line object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, imageUrl: "" }))}
                    className="rounded-xl border border-brand-line px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                  >
                    Remove
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            disabled={saving}
            className="rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : editId ? "Update Event" : "Create Event"}
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
          All Events {loading ? "" : `(${items.length})`}
        </div>

        {loading ? (
          <div className="mt-3 text-sm text-slate-600">Loading…</div>
        ) : sorted.length === 0 ? (
          <div className="mt-3 text-sm text-slate-600">No events yet.</div>
        ) : (
          <div className="mt-3 space-y-3">
            {sorted.map((e) => (
              <div key={e._id} className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {e.imageUrl ? (
                      <img
                        src={e.imageUrl}
                        alt={e.title}
                        className="h-12 w-12 rounded-xl border border-brand-line object-cover"
                        loading="lazy"
                      />
                    ) : null}

                    <div>
                      <div className="font-body text-sm font-semibold text-slate-900">{e.title}</div>

                      <div className="mt-1 font-body text-xs text-slate-600">
                        {e.date} • {e.location} • {e.format}
                      </div>

                      {e.recap ? (
                        <div className="mt-2 text-xs text-slate-600 line-clamp-2">{e.recap}</div>
                      ) : null}

                      <div className="mt-2 text-xs text-slate-500">
                        sortOrder: <span className="font-semibold">{e.sortOrder ?? 0}</span>
                        {" • "}status:{" "}
                        <span className={e.isPublished ? "font-semibold text-emerald-700" : "font-semibold text-slate-500"}>
                          {e.isPublished ? "Published" : "Unpublished"}
                        </span>
                        {" • "}past page:{" "}
                        <span className={e.showInPast ? "font-semibold text-blue-700" : "font-semibold text-slate-500"}>
                          {e.showInPast ? "Visible" : "Hidden"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => togglePublish(e)}
                      className="rounded-xl border border-brand-line px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                    >
                      {e.isPublished ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => togglePast(e)}
                      className="rounded-xl border border-brand-line px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                    >
                      {e.showInPast ? "Remove from Past" : "Show on Past"}
                    </button>

                    <button
                      onClick={() => startEdit(e)}
                      className="rounded-xl border border-brand-line px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => remove(e)}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
