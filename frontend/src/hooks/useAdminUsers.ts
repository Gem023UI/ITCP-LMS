import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { adminApi, type AdminUser } from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";

export type UserStatus = AdminUser["status"];

export function useAdminUsers(role: "TEACHER" | "STUDENT") {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // only one row is editable at a time
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<UserStatus>("ACTIVE");
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
    adminApi
      .users(role)
      .then((r) => !cancelled && setUsers(r.users))
      .catch((e) => !cancelled && setError(errText(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [isAdmin, role]);

  const onEdit = (u: AdminUser) => {
    setEditingId(u.id);
    setDraft(u.status);
    setError(null);
  };

  const onSave = async (u: AdminUser) => {
    if (draft === u.status) {
      setEditingId(null);
      return;
    }
    setSavingId(u.id);
    setError(null);
    try {
      await adminApi.setStatus(u.id, draft);
      setUsers((list) => list.map((x) => (x.id === u.id ? { ...x, status: draft } : x)));
      setEditingId(null);
    } catch (e) {
      setError(errText(e));
    } finally {
      setSavingId(null);
    }
  };

  return {
    users,
    error,
    table: {
      loading,
      editingId,
      draft,
      savingId,
      onEdit,
      onDraft: setDraft,
      onSave,
      onCancel: () => setEditingId(null),
    },
  };
}