const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function getToken() {
  return sessionStorage.getItem("admin_token");
}

export function setToken(token: string) {
  sessionStorage.setItem("admin_token", token);
}

export function clearToken() {
  sessionStorage.removeItem("admin_token");
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg.message || `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}
