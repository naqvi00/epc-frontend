import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, setToken } from "../../api/api";

type LoginResponse = {
  token: string;
  admin: { email: string };
};

export default function AdminLogin() {

  const nav = useNavigate();
  const [email, setEmail] = useState("admin@epc.com");
  const [password, setPassword] = useState("ChangeThis123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(data.token);
      nav("/epc-admin-92f3");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-mist flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-brand-line bg-white p-6 shadow-card">
        <h1 className="font-heading text-2xl font-bold text-brand-ink">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-600">Only authorized admins can access the panel.</p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-line px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
           <label className="text-sm font-semibold text-slate-700">Password</label>

<div className="relative mt-1">
  <input
    type={showPassword ? "text" : "password"}
    className="w-full rounded-xl border border-brand-line px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="current-password"
  />

  <button
    type="button"
    onClick={() => setShowPassword((s) => !s)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? (
      // Eye off
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.733 5.076A10.744 10.744 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      </svg>
    ) : (
      // Eye
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )}
  </button>
</div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
