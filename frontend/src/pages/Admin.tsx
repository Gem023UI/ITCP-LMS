import * as React from "react";
import { useNavigate } from "react-router-dom";
import LiquidGlass from "../components/LiquidGlass";
import { useAuth } from "../hooks/useAuth";
import { adminApi, type AdminUser } from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Manage.css";

type Status = AdminUser["status"];
const STATUSES: Status[] = ["ACTIVE", "INACTIVE", "DEACTIVATED"];
const label = (s: Status) => s.charAt(0) + s.slice(1).toLowerCase();

function UserTable({
  title,
  users,
  loading,
  editingId,
  draft,
  savingId,
  onEdit,
  onDraft,
  onSave,
  onCancel,
}: {
  title: string;
  users: AdminUser[];
  loading: boolean;
  editingId: string | null;
  draft: Status;
  savingId: string | null;
  onEdit: (u: AdminUser) => void;
  onDraft: (s: Status) => void;
  onSave: (u: AdminUser) => void;
  onCancel: () => void;
}) {
  return (
    <section className="admin__section">
      <h3 className="admin__section-title">{title}</h3>
      <LiquidGlass className="manage__panel">
        <div className="manage__panel-body">
          {loading ? (
            <p className="manage__note">Loading…</p>
          ) : users.length === 0 ? (
            <p className="manage__note">No {title.toLowerCase()} found.</p>
          ) : (
            <table className="admin__table">
              <thead>
                <tr>
                  <th>TUPT ID</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const editing = editingId === u.id;
                  const saving = savingId === u.id;
                  return (
                    <tr key={u.id}>
                      <td>{u.tuptId}</td>
                      <td>{u.email}</td>
                      <td>
                        {editing ? (
                          <select
                            className={`admin__status is-${draft}`}
                            value={draft}
                            disabled={saving}
                            onChange={(e) => onDraft(e.target.value as Status)}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {label(s)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className={`admin__status is-${u.status}`}>{label(u.status)}</span>
                        )}
                      </td>
                      <td>
                        {editing ? (
                          <span className="admin__row-actions">
                            <button
                              type="button"
                              className="manage__link"
                              disabled={saving}
                              onClick={() => onSave(u)}
                            >
                              {saving ? "Saving…" : "Save"}
                            </button>
                            <button
                              type="button"
                              className="manage__link"
                              disabled={saving}
                              onClick={onCancel}
                            >
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="manage__link"
                            disabled={editingId !== null}
                            onClick={() => onEdit(u)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </LiquidGlass>
    </section>
  );
}

export default function UsersAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [teachers, setTeachers] = React.useState<AdminUser[]>([]);
  const [students, setStudents] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // only one row is editable at a time
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<Status>("ACTIVE");
  const [savingId, setSavingId] = React.useState<string | null>(null);

  // admin only; everyone else goes to their own page
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
    Promise.all([adminApi.users("TEACHER"), adminApi.users("STUDENT")])
      .then(([t, s]) => {
        if (cancelled) return;
        setTeachers(t.users);
        setStudents(s.users);
      })
      .catch((e) => !cancelled && setError(errText(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const startEdit = (u: AdminUser) => {
    setEditingId(u.id);
    setDraft(u.status);
    setError(null);
  };

  const save = async (u: AdminUser) => {
    if (draft === u.status) {
      setEditingId(null);
      return;
    }
    setSavingId(u.id);
    setError(null);
    try {
      await adminApi.setStatus(u.id, draft);
      const apply = (list: AdminUser[]) => list.map((x) => (x.id === u.id ? { ...x, status: draft } : x));
      if (u.role === "TEACHER") setTeachers(apply);
      else setStudents(apply);
      setEditingId(null);
    } catch (e) {
      setError(errText(e));
    } finally {
      setSavingId(null);
    }
  };

  const shared = {
    loading,
    editingId,
    draft,
    savingId,
    onEdit: startEdit,
    onDraft: setDraft,
    onSave: save,
    onCancel: () => setEditingId(null),
  };

  return (
    <div className="manage">
      <h2 className="manage__heading">Users</h2>
      {error && <p className="manage__error">{error}</p>}
      <UserTable title="Teachers" users={teachers} {...shared} />
      <UserTable title="Students" users={students} {...shared} />
    </div>
  );
}