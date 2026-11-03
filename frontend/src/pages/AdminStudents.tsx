import AdminUserTable from "../components/AdminUserTable";
import { useAdminUsers } from "../hooks/useAdminUsers";
import "../styles/Manage.css";

export default function UsersAdmin() {
  const { users, error, table } = useAdminUsers("STUDENT");

  return (
    <div className="manage">
      <h2 className="manage__heading">Students</h2>
      {error && <p className="manage__error">{error}</p>}
      <AdminUserTable noun="students" users={users} {...table} />
    </div>
  );
}