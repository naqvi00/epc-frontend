import  { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/api";

type Status = "new" | "contacted" | "closed";

type CallbackRequest = {
  _id: string;
  subject: string;
  reason: string;
  country: string;
  phone?: string;
  email?: string;
  status: Status;
  createdAt: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminCallbackRequests() {
  const [items, setItems] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");

  async function load() {
    setError(null);
    setLoading(true);
    try {
      // ✅ IMPORTANT: uses apiFetch like your other admin pages
      const data = await apiFetch<CallbackRequest[]>("/api/callback-requests/admin");
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load callback requests");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return items.filter((x) => {
      if (status !== "all" && x.status !== status) return false;

      if (!q) return true;
      const blob = [
        x.subject,
        x.reason,
        x.country,
        x.email || "",
        x.phone || "",
        x.status,
      ]
        .join(" ")
        .toLowerCase();

      return blob.includes(q);
    });
  }, [items, search, status]);

  async function changeStatus(x: CallbackRequest, next: Status) {
    const prev = items;
    // optimistic
    setItems((p) => p.map((i) => (i._id === x._id ? { ...i, status: next } : i)));

    try {
      const updated = await apiFetch<CallbackRequest>(`/api/callback-requests/admin/${x._id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: next }),
      });

      setItems((p) => p.map((i) => (i._id === x._id ? updated : i)));
    } catch (e: any) {
      setItems(prev);
      setError(e?.message || "Failed to update status");
    }
  }

  async function remove(x: CallbackRequest) {
    const ok = window.confirm(`Delete this request?\n\n${x.subject}`);
    if (!ok) return;

    const prev = items;
    setItems((p) => p.filter((i) => i._id !== x._id));

    try {
      await apiFetch(`/api/callback-requests/admin/${x._id}`, {
        method: "DELETE",
      });
    } catch (e: any) {
      setItems(prev);
      setError(e?.message || "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-ink">Callback Requests</h1>
          <p className="mt-1 text-sm text-slate-600">
            Submissions from “Request a Call back” popup. You can filter, update status, or delete.
          </p>
        </div>

        <button
          onClick={load}
          className="rounded-xl border border-brand-line px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-mist"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">Search</label>
          <input
            className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
            placeholder="Search subject, reason, country, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Status</label>
          <select
            className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="all">All ({items.length})</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* List */}
      <div className="mt-6">
        {loading ? (
          <div className="text-sm text-slate-600">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-sm text-slate-600">No callback requests found.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((x) => (
              <div key={x._id} className="rounded-2xl border border-brand-line bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {x.status} • {formatDate(x.createdAt)}
                    </div>

                    <div className="mt-1 font-body text-sm font-semibold text-slate-900">
                      {x.subject}
                    </div>

                    <div className="mt-2 text-sm text-slate-700 whitespace-pre-line">
                      {x.reason}
                    </div>

                    <div className="mt-3 text-xs text-slate-600">
                      <span className="font-semibold">Country:</span> {x.country}
                      {x.phone ? (
                        <>
                          {" "}
                          • <span className="font-semibold">Phone:</span> {x.phone}
                        </>
                      ) : null}
                      {x.email ? (
                        <>
                          {" "}
                          • <span className="font-semibold">Email:</span> {x.email}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select
                      value={x.status}
                      onChange={(e) => changeStatus(x, e.target.value as Status)}
                      className="rounded-xl border border-brand-line bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-mist"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>

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
