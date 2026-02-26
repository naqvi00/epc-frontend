import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Loader2, Search, Mail, PhoneCall, CalendarClock, RefreshCw, Trash2} from "lucide-react";
import { getToken } from "../../api/api";

type RequestStatus = "new" | "contacted" | "closed";

type MembershipRequest = {
  _id: string;
  planId: string;
  plan: string;
  subject: string;
  title: string;
  price: number;
  billing: "month" | "year" | "one-time" | string;

  name: string;
  contactMethod: "email" | "phone";
  email?: string | null;
  phone?: string | null;

  status: RequestStatus;
  notes?: string;
  createdAt: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminMembershipRequests() {
  const [items, setItems] = useState<MembershipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [status, setStatus] = useState<RequestStatus | "all">("all");
  const [q, setQ] = useState("");

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

  async function deleteRequest(id: string) {
  const ok = window.confirm("Delete this membership request?");
  if (!ok) return;

  const prev = items;
  setItems((p) => p.filter((x) => x._id !== id));

  try {
    await authedFetch(`${API_BASE}/api/memberships/requests/admin/${id}`, {
      method: "DELETE",
    });
  } catch (e: any) {
    setItems(prev);
    setErr(e?.message || "Delete failed");
  }
}
  async function load() {
    try {
      setLoading(true);
      setErr(null);

      const url =
        status === "all"
          ? `${API_BASE}/api/memberships/requests/admin`
          : `${API_BASE}/api/memberships/requests/admin?status=${encodeURIComponent(status)}`;

      const data = await authedFetch(url);
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message || "Failed to load requests");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;

    return items.filter((r) => {
      return (
        r.name?.toLowerCase().includes(query) ||
        r.plan?.toLowerCase().includes(query) ||
        r.subject?.toLowerCase().includes(query) ||
        r.title?.toLowerCase().includes(query) ||
        (r.email || "")?.toLowerCase().includes(query) ||
        (r.phone || "")?.toLowerCase().includes(query)
      );
    });
  }, [items, q]);

  function billingSuffix(billing: string) {
    if (billing === "month") return "/mo";
    if (billing === "year") return "/yr";
    return "";
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
              Membership Requests
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              View membership requests submitted by users.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>

            <div className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm shadow-card">
              <Search className="h-4 w-4 text-slate-600" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, email, phone, plan…"
                className="w-64 max-w-full bg-transparent text-sm outline-none"
              />
            </div>

            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-mist"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
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
          <div className="mt-8 overflow-hidden rounded-2xl border border-brand-line">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-brand-mist text-left text-xs font-semibold uppercase tracking-widest text-slate-600">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brand-line">
                  {filtered.map((r) => (
                    <tr key={r._id} className="hover:bg-brand-mist/40">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{r.name}</div>
                        <div className="text-xs text-slate-600">{r.subject}</div>
                      </td>

                      <td className="px-4 py-3">
                        {r.contactMethod === "email" ? (
                          <div className="inline-flex items-center gap-2 text-slate-800">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span>{r.email || "-"}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 text-slate-800">
                            <PhoneCall className="h-4 w-4 text-slate-500" />
                            <span>{r.phone || "-"}</span>
                          </div>
                        )}
                        <div className="text-xs text-slate-500">via {r.contactMethod}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{r.plan}</div>
                        <div className="text-xs text-slate-600">{r.title}</div>
                        <div className="text-xs text-slate-500">
                          £{Number(r.price || 0).toLocaleString()}
                          {billingSuffix(String(r.billing))}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={clsx(
                            "inline-flex rounded-full px-3 py-1 text-xs font-semibold border",
                            r.status === "new" && "bg-blue-50 text-blue-700 border-blue-200",
                            r.status === "contacted" && "bg-amber-50 text-amber-800 border-amber-200",
                            r.status === "closed" && "bg-emerald-50 text-emerald-800 border-emerald-200"
                          )}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        <div className="inline-flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-slate-500" />
                          <span>{formatDate(r.createdAt)}</span>
                        </div>
                      </td>
<td className="px-4 py-3 text-right">
  <button
    onClick={() => deleteRequest(r._id)}
    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
  >
    <Trash2 className="h-4 w-4" />
    Delete
  </button>
</td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-6 text-sm text-slate-700">No requests found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}