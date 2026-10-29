import * as React from "react";
import { useNavigate } from "react-router-dom";
import LiquidGlass from "../components/LiquidGlass";
import { useAuth } from "../hooks/useAuth";
import { adminApi, type AdminUser } from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Manage.css";

const STATUSES: AdminUser["status"][] = ["ACTIVE", "INACTIVE", "DEACTIVATED"];

export default function UsersAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [tab, setTab] = React.useState<"TEACHER" | "STUDENT">("TEACHER");
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [savingId, setSavingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) {
        setError(authError.message);
        setLoading(false);
      } else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "ADMIN") navigate(homeFor(user.role), { replace: true });
  }, [authLoading, user, authError, navigate]);

  const isAdmin = user?.role === "ADMIN";
  React.useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    setLoading(true);
    adminApi
      .users(tab)
      .then(({ users }) => !cancelled && setUsers(users))
      .catch((e) => !cancelled && setError(errText(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [tab, isAdmin]);

  const changeStatus = async (u: AdminUser, status: AdminUser["status"]) => {
    setSavingId(u.id);
    setError(null);
    try {
      await adminApi.setStatus(u.id, status);
      setUsers((list) => list.map((x) => (x.id === u.id ? { ...x, status } : x)));
    } catch (e) {
      setError(errText(e));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="manage">
      <h2 className="manage__heading">Users</h2>

      <div className="admin__tabs">
        {(["TEACHER", "STUDENT"] as const).map((t) => (
          <LiquidGlass
            as="button"
            key={t}
            className={`admin__tab${tab === t ? " is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "TEACHER" ? "Teachers" : "Students"}
          </LiquidGlass>
        ))}
      </div>

      {error && <p className="manage__error">{error}</p>}

      <LiquidGlass className="manage__panel">
        <div className="manage__panel-body">
          {loading ? (
            <p className="manage__note">Loading…</p>
          ) : users.length === 0 ? (
            <p className="manage__note">No users found.</p>
          ) : (
            <table className="admin__table">
              <thead>
                <tr>
                  <th>TUPT ID</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.tuptId}</td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        className={`admin__status is-${u.status}`}
                        value={u.status}
                        disabled={savingId === u.id}
                        onChange={(e) => changeStatus(u, e.target.value as AdminUser["status"])}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0) + s.slice(1).toLowerCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </LiquidGlass>
    </div>
  );
}