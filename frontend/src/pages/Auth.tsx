import * as React from "react";
import { useNavigate } from "react-router-dom";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import { ApiError, authApi } from "../services/authApi";
import { homeFor } from "../utils/roleRoutes";
import {
  formatTuptId,
  getMissingPasswordRules,
  toLoginIdentifier,
  validateEmail,
  validateLoginIdentifier,
  validateName,
  validateTuptId,
} from "../utils/authValidators";
import "../styles/Auth.css";

const PLACEHOLDER_IMG =
  "https://imgs.search.brave.com/hjSPuyXM7OmC_UwkgtdwRc8BjhOpcbtnYoCpngeiTG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lYXJ0/aGRhdGEubmFzYS5n/b3YvczNmcy1wdWJs/aWMvc3R5bGVzL2hk/c19nZW5lcmljX2Nh/cmQvcHVibGljLzIw/MjUtMTIvY2xvdWQt/Y29tcHV0aW5nLTIt/dGguanBnP1ZlcnNp/b25JZD12SGR4MWps/OHNHT3V5QTl5SFNs/R1plamNxYXNoMVVi/TSZpdG9rPV9FNUtn/cXNK";

const BLURB =
  "Tag along in learning the fundamentals of what makes the digital landscape the backbone of modern society.";

type Mode = "register" | "login";
type RegRole = "STUDENT" | "TEACHER";
type FieldState = { status: "idle" | "valid" | "invalid"; hint: string };
type Notice = { title: string; message: string; onClose?: () => void };

const IDLE: FieldState = { status: "idle", hint: "" };
const stateClass = (s: FieldState) => (s.status === "idle" ? "" : ` is-${s.status}`);

/** valid shows live once the value is correct; invalid waits until blur/submit */
function textFieldState(
  value: string,
  error: string | null,
  touched: boolean,
  okHint: string,
  serverError?: string,
): FieldState {
  if (serverError) return { status: "invalid", hint: serverError };
  if (!value) return touched ? { status: "invalid", hint: error ?? "" } : IDLE;
  if (!error) return { status: "valid", hint: okHint };
  return touched ? { status: "invalid", hint: error } : IDLE;
}

/* ---------- Icons ---------- */
function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1" />
          <path d="M6.6 6.6C3.7 8.5 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </>
      )}
    </svg>
  );
}

/* ---------- Hint text ---------- */
function Hint({
  id,
  state,
  compact = false,
}: {
  id: string;
  state: FieldState;
  compact?: boolean;
}) {
  return (
    <p
      id={id}
      className={`auth-hint${compact ? " auth-hint--compact" : ""}${
        state.status === "idle" ? "" : ` is-${state.status}`
      }`}
      aria-live="polite"
    >
      {state.hint}
    </p>
  );
}

/* ---------- Student / Teacher toggle ---------- */
function RoleToggle({ value, onChange }: { value: RegRole; onChange: (r: RegRole) => void }) {
  return (
    <div
      className={`auth-toggle${value === "TEACHER" ? " is-teacher" : ""}`}
      role="radiogroup"
      aria-label="Register as"
    >
      <span className="auth-toggle__thumb" aria-hidden="true" />
      {(["STUDENT", "TEACHER"] as const).map((r) => (
        <button
          key={r}
          type="button"
          role="radio"
          aria-checked={value === r}
          className={value === r ? "is-on" : ""}
          onClick={() => onChange(r)}
        >
          {r === "STUDENT" ? "Student" : "Teacher"}
        </button>
      ))}
    </div>
  );
}

/* ---------- Text field (names, TUPT ID, email) ---------- */
type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  state: FieldState;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
};

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  state,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
  placeholder,
}: TextFieldProps) {
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className={`auth-input-wrap${stateClass(state)}`}>
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={state.status === "invalid"}
          aria-describedby={`${id}-hint`}
        />
      </div>
      <Hint id={`${id}-hint`} state={state} compact />
    </div>
  );
}

/* ---------- Password field with show/hide ---------- */
type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  state?: FieldState;
};

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  state = IDLE,
}: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className={`auth-input-wrap${stateClass(state)}`}>
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          maxLength={72}
          aria-invalid={state.status === "invalid"}
          aria-describedby={`${id}-hint`}
        />
        <button
          type="button"
          className="auth-eye"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      <Hint id={`${id}-hint`} state={state} />
    </div>
  );
}

/* ---------- Page ---------- */
export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<Mode>("register");
  const isLogin = mode === "login";
  const [submitting, setSubmitting] = React.useState(false);
  const [notice, setNotice] = React.useState<Notice | null>(null);

  // register
  const [regRole, setRegRole] = React.useState<RegRole>("STUDENT");
  const [regFirst, setRegFirst] = React.useState("");
  const [regFirstTouched, setRegFirstTouched] = React.useState(false);
  const [regLast, setRegLast] = React.useState("");
  const [regLastTouched, setRegLastTouched] = React.useState(false);
  const [regTupt, setRegTupt] = React.useState("");
  const [regTuptTouched, setRegTuptTouched] = React.useState(false);
  const [regEmail, setRegEmail] = React.useState("");
  const [regEmailTouched, setRegEmailTouched] = React.useState(false);
  const [regPassword, setRegPassword] = React.useState("");
  const [regConfirm, setRegConfirm] = React.useState("");
  const [regServerErrors, setRegServerErrors] = React.useState<Record<string, string>>({});
  const [regFormError, setRegFormError] = React.useState("");

  // login (the identifier is a TUPT ID or an email)
  const [loginTupt, setLoginTupt] = React.useState("");
  const [loginTuptTouched, setLoginTuptTouched] = React.useState(false);
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loginSubmitted, setLoginSubmitted] = React.useState(false);
  const [loginFormError, setLoginFormError] = React.useState("");

  const clearRegServerError = (key: string) =>
    setRegServerErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  /* ----- register field states ----- */
  const regFirstError = validateName("First name", regFirst);
  const regFirstState = textFieldState(
    regFirst,
    regFirstError,
    regFirstTouched,
    "Looks good",
    regServerErrors.firstName,
  );

  const regLastError = validateName("Last name", regLast);
  const regLastState = textFieldState(
    regLast,
    regLastError,
    regLastTouched,
    "Looks good",
    regServerErrors.lastName,
  );

  const regTuptError = validateTuptId(regTupt);
  const regTuptState = textFieldState(
    regTupt,
    regTuptError,
    regTuptTouched,
    "TUPT ID looks good",
    regServerErrors.tuptId,
  );

  const regEmailError = validateEmail(regEmail);
  const regEmailState = textFieldState(
    regEmail,
    regEmailError,
    regEmailTouched,
    "Email looks good",
    regServerErrors.email,
  );

  const missing = getMissingPasswordRules(regPassword);
  const regPasswordState: FieldState = !regPassword
    ? { status: "idle", hint: "8+ characters, 1 uppercase letter, 1 special character" }
    : missing.length
      ? { status: "invalid", hint: `Needs: ${missing.join(", ")}` }
      : { status: "valid", hint: "Password meets requirements" };

  const regConfirmState: FieldState = !regConfirm
    ? IDLE
    : regConfirm === regPassword
      ? { status: "valid", hint: "Passwords match" }
      : { status: "invalid", hint: "Passwords do not match" };

  const registerReady =
    !regFirstError &&
    !regLastError &&
    !regTuptError &&
    !regEmailError &&
    missing.length === 0 &&
    !!regConfirm &&
    regConfirm === regPassword;

  /* ----- login field states ----- */
  const loginTuptError = validateLoginIdentifier(loginTupt); // TUPT ID or email
  const loginTuptState: FieldState =
    (loginTuptTouched || loginSubmitted) && loginTuptError
      ? { status: "invalid", hint: loginTuptError }
      : IDLE;
  const loginPasswordState: FieldState =
    loginSubmitted && !loginPassword
      ? { status: "invalid", hint: "Password is required" }
      : IDLE;

  /* ----- notice modal ----- */
  const closeNotice = React.useCallback(() => {
    setNotice((n) => {
      n?.onClose?.();
      return null;
    });
  }, []);

  React.useEffect(() => {
    if (!notice) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNotice();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [notice, closeNotice]);

  /* ----- actions ----- */
  const switchMode = (next: Mode) => {
    setRegFormError("");
    setLoginFormError("");
    setRegServerErrors({});
    setRegPassword("");
    setRegConfirm("");
    setLoginPassword("");
    setLoginSubmitted(false);
    setMode(next);
  };

  const resetRegister = () => {
    setRegFirst("");
    setRegLast("");
    setRegTupt("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirm("");
    setRegFirstTouched(false);
    setRegLastTouched(false);
    setRegTuptTouched(false);
    setRegEmailTouched(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegFirstTouched(true);
    setRegLastTouched(true);
    setRegTuptTouched(true);
    setRegEmailTouched(true);
    if (!registerReady || submitting) return;

    setSubmitting(true);
    setRegFormError("");
    try {
      await authApi.register({
        role: regRole,
        tuptId: regTupt,
        email: regEmail.trim(),
        firstName: regFirst.trim(),
        lastName: regLast.trim(),
        password: regPassword,
        confirmPassword: regConfirm,
      });
      const tupt = regTupt;
      resetRegister();
      setNotice({
        title: "Registration submitted",
        message:
          "Your account is pending approval. You can log in once an administrator activates it.",
        onClose: () => {
          setLoginTupt(tupt);
          switchMode("login");
        },
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setRegServerErrors(err.fieldErrors);
        if (Object.keys(err.fieldErrors).length === 0) setRegFormError(err.message);
      } else {
        setRegFormError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitted(true);
    if (loginTuptError || !loginPassword || submitting) return;

    setSubmitting(true);
    setLoginFormError("");
    try {
      const { user } = await authApi.login({
        ...toLoginIdentifier(loginTupt),
        password: loginPassword,
      });
      navigate(homeFor(user.role));
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        // pending approval / inactive / deactivated
        setNotice({ title: "Can't log in yet", message: err.message });
      } else {
        setLoginFormError(
          err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className={`auth-card${isLogin ? " is-login" : ""}`}>
        <div className="auth-stage">
          {/* Sliding image panel */}
          <aside className="auth-visual" aria-hidden="true">
            <img src={PLACEHOLDER_IMG} alt="" />
            <div className="auth-visual__shade" />
            <div className={`auth-visual__copy auth-visual__copy--register${!isLogin ? " on" : ""}`}>
              <h2>Join us!</h2>
              <p>{BLURB}</p>
            </div>
            <div className={`auth-visual__copy auth-visual__copy--login${isLogin ? " on" : ""}`}>
              <h2>Welcome back!</h2>
              <p>{BLURB}</p>
            </div>
          </aside>

          {/* Register */}
          <section className="auth-panel auth-panel--register" aria-hidden={isLogin}>
            <h1 className="auth-title">Join us!</h1>
            <RoleToggle value={regRole} onChange={setRegRole} />
            <form onSubmit={handleRegister} noValidate>
              <div className="auth-row">
                <TextField
                  id="reg-first"
                  label="First name"
                  value={regFirst}
                  onChange={(v) => {
                    setRegFirst(v);
                    clearRegServerError("firstName");
                  }}
                  onBlur={() => setRegFirstTouched(true)}
                  state={regFirstState}
                  autoComplete="given-name"
                  maxLength={50}
                />
                <TextField
                  id="reg-last"
                  label="Last name"
                  value={regLast}
                  onChange={(v) => {
                    setRegLast(v);
                    clearRegServerError("lastName");
                  }}
                  onBlur={() => setRegLastTouched(true)}
                  state={regLastState}
                  autoComplete="family-name"
                  maxLength={50}
                />
              </div>

              <TextField
                id="reg-tupt"
                label="TUPT ID"
                value={regTupt}
                onChange={(v) => {
                  setRegTupt(formatTuptId(v));
                  clearRegServerError("tuptId");
                }}
                onBlur={() => setRegTuptTouched(true)}
                state={regTuptState}
                inputMode="text"
                autoComplete="username"
                maxLength={12}
                placeholder="TUPT-XX-XXXX"
              />

              <TextField
                id="reg-email"
                label="Your email"
                type="email"
                value={regEmail}
                onChange={(v) => {
                  setRegEmail(v);
                  clearRegServerError("email");
                }}
                onBlur={() => setRegEmailTouched(true)}
                state={regEmailState}
                inputMode="email"
                autoComplete="email"
                maxLength={254}
              />

              <div className="auth-row">
                <PasswordField
                  id="reg-password"
                  label="Create password"
                  value={regPassword}
                  onChange={setRegPassword}
                  autoComplete="new-password"
                  state={regPasswordState}
                />
                <PasswordField
                  id="reg-confirm"
                  label="Confirm password"
                  value={regConfirm}
                  onChange={setRegConfirm}
                  autoComplete="new-password"
                  state={regConfirmState}
                />
              </div>

              {regFormError && (
                <p className="auth-error" role="alert">
                  {regFormError}
                </p>
              )}

              <MetallicBlueButton type="submit" className="auth-cta" disabled={submitting}>
                {submitting && !isLogin ? "Creating account…" : "Register"}
              </MetallicBlueButton>
            </form>
            <p className="auth-switch">
              Have an account?{" "}
              <button type="button" onClick={() => switchMode("login")}>
                Log in
              </button>
            </p>
          </section>

          {/* Login */}
          <section className="auth-panel auth-panel--login" aria-hidden={!isLogin}>
            <img className="auth-logo" src="/logo.svg" alt="" />
            <h1 className="auth-title">Welcome back!</h1>
            <form onSubmit={handleLogin} noValidate>
              <TextField
                id="login-tupt"
                label="TUPT ID or email"
                value={loginTupt}
                onChange={(v) => {
                  setLoginTupt(v);
                  setLoginFormError("");
                }}
                onBlur={() => setLoginTuptTouched(true)}
                state={loginTuptState}
                inputMode="text"
                autoComplete="username"
                maxLength={254}
                placeholder="TUPT-XX-XXXX or email"
              />

              <PasswordField
                id="login-password"
                label="Password"
                value={loginPassword}
                onChange={(v) => {
                  setLoginPassword(v);
                  setLoginFormError("");
                }}
                autoComplete="current-password"
                state={loginPasswordState}
              />

              {loginFormError && (
                <p className="auth-error" role="alert">
                  {loginFormError}
                </p>
              )}

              <MetallicBlueButton type="submit" className="auth-cta" disabled={submitting}>
                {submitting && isLogin ? "Logging in…" : "Log in"}
              </MetallicBlueButton>
            </form>
            <p className="auth-switch">
              Don&rsquo;t have an account yet?{" "}
              <button type="button" onClick={() => switchMode("register")}>
                Register
              </button>
            </p>
          </section>
        </div>
      </div>

      {notice && (
        <div className="auth-modal__overlay" onClick={closeNotice} role="presentation">
          <LiquidGlass className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="auth-modal__body"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="auth-notice-title"
              aria-describedby="auth-notice-msg"
            >
              <h3 id="auth-notice-title">{notice.title}</h3>
              <p id="auth-notice-msg">{notice.message}</p>
              <MetallicBlueButton type="button" className="auth-cta" onClick={closeNotice}>
                Got it
              </MetallicBlueButton>
            </div>
          </LiquidGlass>
        </div>
      )}
    </main>
  );
}