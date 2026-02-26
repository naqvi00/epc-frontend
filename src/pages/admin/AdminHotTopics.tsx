import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/api";

type HotTopicItem = {
  _id: string;
  label: string;
  desc: string;
  href: string;
  sortOrder: number;
  isPublished: boolean;
};

const emptyForm = {
  label: "",
  desc: "",
  href: "/insights/topics",
  sortOrder: 0,
  isPublished: true,
};

export default function AdminHotTopics() {
  const [items, setItems] = useState<HotTopicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<string | null>(null);

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const data = await apiFetch<HotTopicItem[]>("/api/admin/hot-topics");
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Failed to load hot topics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [items]);

  function startEdit(x: HotTopicItem) {
    setEditId(x._id);
    setForm({
      label: x.label,
      desc: x.desc,
      href: x.href,
      sortOrder: x.sortOrder ?? 0,
      isPublished: x.isPublished,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditId(null);
    setForm({ ...emptyForm });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.label.trim() || !form.desc.trim() || !form.href.trim()) {
      setError("label, desc, href are required");
      return;
    }

    setSaving(true);
    try {
      if (editId) {
        const updated = await apiFetch<HotTopicItem>(`/api/admin/hot-topics/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setItems((p) => p.map((i) => (i._id === updated._id ? updated : i)));
      } else {
        const created = await apiFetch<HotTopicItem>("/api/admin/hot-topics", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setItems((p) => [created, ...p]);
      }
      resetForm();
    } catch (e: any) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(x: HotTopicItem) {
    const next = !x.isPublished;
    setItems((p) => p.map((i) => (i._id === x._id ? { ...i, isPublished: next } : i)));

    try {
      const updated = await apiFetch<HotTopicItem>(`/api/admin/hot-topics/${x._id}`, {
        method: "PUT",
        body: JSON.stringify({ isPublished: next }),
      });
      setItems((p) => p.map((i) => (i._id === updated._id ? updated : i)));
    } catch (e: any) {
      setItems((p) => p.map((i) => (i._id === x._id ? x : i)));
      setError(e.message || "Update failed");
    }
  }

  async function remove(x: HotTopicItem) {
    const ok = window.confirm(`Delete hot topic?\n\n${x.label}`);
    if (!ok) return;

    const prev = items;
    setItems((p) => p.filter((i) => i._id !== x._id));

    try {
      await apiFetch(`/api/admin/hot-topics/${x._id}`, { method: "DELETE" });
    } catch (e: any) {
      setItems(prev);
      setError(e.message || "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-ink">Hot Topics</h1>
          <p className="mt-1 text-sm text-slate-600">These show on the Home page (Published only).</p>
        </div>
        <button
          onClick={load}
          className="rounded-xl border border-brand-line px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={submit} className="mt-5 rounded-2xl border border-brand-line bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="font-heading text-lg font-bold text-brand-ink">{editId ? "Edit" : "Add"} Hot Topic</div>
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
            <label className="text-sm font-semibold text-slate-700">Label</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.label}
              onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
              placeholder="Poverty Management"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Href</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.href}
              onChange={(e) => setForm((p) => ({ ...p, href: e.target.value }))}
              placeholder="/insights/topics"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              rows={3}
              value={form.desc}
              onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
              placeholder="Delivery systems, social protection…"
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

          <div>
            <label className="text-sm font-semibold text-slate-700">Sort Order</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
              value={form.sortOrder}
              onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
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
        <div className="font-heading text-lg font-bold text-brand-ink">All Hot Topics ({items.length})</div>

        {loading ? (
          <div className="mt-3 text-sm text-slate-600">Loading…</div>
        ) : sorted.length === 0 ? (
          <div className="mt-3 text-sm text-slate-600">No hot topics yet.</div>
        ) : (
          <div className="mt-3 space-y-3">
            {sorted.map((x) => (
              <div key={x._id} className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-body text-sm font-semibold text-slate-900">{x.label}</div>
                    <div className="mt-1 text-xs text-slate-600">{x.desc}</div>
                    <div className="mt-2 text-xs text-slate-500">
                      href: <span className="font-semibold">{x.href}</span> • sortOrder:{" "}
                      <span className="font-semibold">{x.sortOrder ?? 0}</span> •{" "}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
