const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

export type User = { id: string; email: string; role: string; createdAt: string };

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;
  constructor(status: number, message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/auth${path}`, {
      method: options.method ?? "GET",
      credentials: "include", // send/receive the httpOnly cookie
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Please try again.");
  }

  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(res.status, data?.message ?? "Request failed", data?.errors ?? {});
  }
  return data as T;
}

export const authApi = {
  register: (body: { email: string; password: string; confirmPassword: string }) =>
    request<{ user: User }>("/register", { method: "POST", body }),
  login: (body: { email: string; password: string }) =>
    request<{ user: User }>("/login", { method: "POST", body }),
  logout: () => request<void>("/logout", { method: "POST" }),
  me: () => request<{ user: User }>("/me"),
};