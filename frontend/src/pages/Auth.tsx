import * as React from "react";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import "../styles/Auth.css";

const PLACEHOLDER_IMG =
  "https://imgs.search.brave.com/hjSPuyXM7OmC_UwkgtdwRc8BjhOpcbtnYoCpngeiTG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lYXJ0/aGRhdGEubmFzYS5n/b3YvczNmcy1wdWJs/aWMvc3R5bGVzL2hk/c19nZW5lcmljX2Nh/cmQvcHVibGljLzIw/MjUtMTIvY2xvdWQt/Y29tcHV0aW5nLTIt/dGguanBnP1ZlcnNp/b25JZD12SGR4MWps/OHNHT3V5QTl5SFNs/R1plamNxYXNoMVVi/TSZpdG9rPV9FNUtn/cXNK";

type Mode = "register" | "login";

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

/* ---------- Password field with show/hide ---------- */
type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
};

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
}: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required
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
    </div>
  );
}

/* ---------- Page ---------- */
export default function Auth() {
  const [mode, setMode] = React.useState<Mode>("register");
  const isLogin = mode === "login";

  // register state
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [regConfirm, setRegConfirm] = React.useState("");
  const [regError, setRegError] = React.useState("");

  // login state
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }
    setRegError("");
    // TODO: call register endpoint
    console.log("register", { email: regEmail });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call login endpoint
    console.log("login", { email: loginEmail });
  };

  return (
    <main className="auth-page">
      <LiquidGlass
        className={`auth-card${isLogin ? " is-login" : ""}`}
      >
        <div className="auth-stage">
          {/* Sliding image panel */}
          <aside className="auth-visual" aria-hidden="true">
            <img src={PLACEHOLDER_IMG} alt="" />
            <div className="auth-visual__shade" />
            <p className="auth-visual__caption">
              <span className={`cap${!isLogin ? " on" : ""}`}>
                Learn cloud computing, one chapter at a time.
              </span>
              <span className={`cap${isLogin ? " on" : ""}`}>
                Welcome back. Pick up where you left off.
              </span>
            </p>
          </aside>

          {/* Register form (right half while image is left) */}
          <section
            className="auth-panel auth-panel--register"
            aria-hidden={isLogin}
          >
            <h1>Get Started</h1>
            <p className="auth-sub">Create your account to begin learning.</p>
            <hr />
            <form onSubmit={handleRegister} noValidate={false}>
              <div className="auth-field">
                <label htmlFor="reg-email">Your email</label>
                <div className="auth-input-wrap">
                  <input
                    id="reg-email"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-row">
                <PasswordField
                  id="reg-password"
                  label="Create password"
                  value={regPassword}
                  onChange={setRegPassword}
                  autoComplete="new-password"
                />
                <PasswordField
                  id="reg-confirm"
                  label="Confirm password"
                  value={regConfirm}
                  onChange={setRegConfirm}
                  autoComplete="new-password"
                />
              </div>

              {regError && (
                <p className="auth-error" role="alert">
                  {regError}
                </p>
              )}

              <MetallicBlueButton type="submit" className="auth-cta">
                Create new account
              </MetallicBlueButton>
            </form>
            <p className="auth-switch">
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")}>
                Login
              </button>
            </p>
          </section>

          {/* Login form (left half while image is right) */}
          <section
            className="auth-panel auth-panel--login"
            aria-hidden={!isLogin}
          >
            <h1>Welcome Back</h1>
            <p className="auth-sub">Log in to continue your progress.</p>
            <hr />
            <form onSubmit={handleLogin}>
              <div className="auth-field">
                <label htmlFor="login-email">Your email</label>
                <div className="auth-input-wrap">
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <PasswordField
                id="login-password"
                label="Password"
                value={loginPassword}
                onChange={setLoginPassword}
                autoComplete="current-password"
              />

              <MetallicBlueButton type="submit" className="auth-cta">
                Login
              </MetallicBlueButton>
            </form>
            <p className="auth-switch">
              Don&rsquo;t have an account yet?{" "}
              <button type="button" onClick={() => setMode("register")}>
                Register
              </button>
            </p>
          </section>
        </div>
      </LiquidGlass>
    </main>
  );
}