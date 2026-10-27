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