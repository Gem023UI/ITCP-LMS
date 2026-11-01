export const TUPT_ID_RE = /^TUPT-\d{2}-\d{4}$/;

export function validateTuptId(value: string): string | null {
  const v = value.trim();
  if (!v) return "TUPT ID is required";
  if (!TUPT_ID_RE.test(v)) return "Use the format TUPT-XX-XXXX (e.g. TUPT-22-0123)";
  return null;
}

// uppercases, drops stray characters, and inserts the dashes while typing
export function formatTuptId(raw: string): string {
  const s = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
  return [s.slice(0, 4), s.slice(4, 6), s.slice(6, 10)].filter(Boolean).join("-");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Email is required";
  if (v.length > 254 || !EMAIL_RE.test(v)) {
    return "Enter a valid email (e.g. name@mail.com)";
  }
  return null;
}

export const PASSWORD_RULES = [
  { key: "length", label: "8+ characters", test: (p: string) => p.length >= 8 },
  { key: "upper", label: "1 uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  {
    key: "special",
    label: "1 special character",
    test: (p: string) => /[^A-Za-z0-9\s]/.test(p),
  },
] as const;

export const getMissingPasswordRules = (p: string): string[] =>
  PASSWORD_RULES.filter((r) => !r.test(p)).map((r) => r.label);

export function validateName(label: string, value: string): string | null {
  const v = value.trim();
  if (!v) return `${label} is required`;
  if (v.length > 50) return `${label} is too long`;
  return null;
}

export function validateLoginIdentifier(value: string): string | null {
  const v = value.trim();
  if (!v) return "TUPT ID or email is required";
  return TUPT_ID_RE.test(v.toUpperCase()) || EMAIL_RE.test(v)
    ? null
    : "Enter your TUPT ID (TUPT-XX-XXXX) or email";
}

export function toLoginIdentifier(value: string): { tuptId: string } | { email: string } {
  const v = value.trim();
  return TUPT_ID_RE.test(v.toUpperCase()) ? { tuptId: v.toUpperCase() } : { email: v.toLowerCase() };
}