import AdminUserTable from "../components/AdminUserTable";
import { useAdminUsers } from "../hooks/useAdminUsers";
import "../styles/Manage.css";

export default function TeachersAdmin() {
  const { users, error, table } = useAdminUsers("TEACHER");

  return (
    <div className="manage">
      <h2 className="manage__heading">Teachers</h2>
      {error && <p className="manage__error">{error}</p>}
      <AdminUserTable noun="teachers" users={users} {...table} />
    </div>
  );
}