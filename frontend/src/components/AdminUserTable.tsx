import LiquidGlass from "./LiquidGlass";
import type { AdminUser } from "../services/manageApi";

type Status = AdminUser["status"];
const STATUSES: Status[] = ["VERIFY", "ACTIVE", "INACTIVE", "DEACTIVATED"];
const label = (s: Status) => s.charAt(0) + s.slice(1).toLowerCase();

export default function AdminUserTable({
  noun,
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
  noun: string;
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
      <LiquidGlass className="manage__panel">
        <div className="manage__panel-body">
          {loading ? (
            <p className="manage__note">Loading…</p>
          ) : users.length === 0 ? (
            <p className="manage__note">No {noun} found.</p>
          ) : (
            <table className="admin__table">
              <thead>
                <tr>
                  <th>TUPT ID</th>
                  <th>Name</th>
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
                      <td>{u.tuptId ?? "—"}</td>
                      <td>
                        {u.firstName} {u.lastName}
                      </td>
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