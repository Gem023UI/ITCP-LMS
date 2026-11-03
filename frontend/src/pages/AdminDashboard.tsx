import * as React from "react";
import { useNavigate } from "react-router-dom";
import SparklineCard from "../components/SparklineCard";
import PieChart from "../components/charts/PieChart";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import { dashboardApi, type AdminDashboard as DashboardData } from "../services/dashboardApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/TeacherDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [data, setData] = React.useState<DashboardData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      setData(await dashboardApi.admin());
      setError(null);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
      else setError(errText(e));
    }
  }, [navigate]);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) setError(authError.message);
      else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "ADMIN") navigate(homeFor(user.role), { replace: true });
    else load();
  }, [authLoading, user, authError, navigate, load]);

  const totalStudents = data?.totalStudents ?? 0;

  return (
    <div className="dash">
      <h1 className="dash__heading">Dashboard</h1>
      {error && <p className="dash__error">{error}</p>}
      {!data && !error && <p className="dash__empty">Loading dashboard…</p>}

      {data && (
        <>
          {/* 1. registration and completion rates */}
          <section className="dash__cards">
            <SparklineCard
              label="Students Registered"
              value={data.students.today}
              note="today"
              series={data.students.series}
              days={data.days}
              today={data.students.today}
              yesterday={data.students.yesterday}
              variant="area"
              color="#6c63ff"
            />
            <SparklineCard
              label="Chapters Completed"
              value={data.chapters.today}
              note="today"
              series={data.chapters.series}
              days={data.days}
              today={data.chapters.today}
              yesterday={data.chapters.yesterday}
              variant="line"
              color="#ffc400"
            />
            <SparklineCard
              label="Teachers Registered"
              value={data.teachers.today}
              note="today"
              series={data.teachers.series}
              days={data.days}
              today={data.teachers.today}
              yesterday={data.teachers.yesterday}
              variant="bars"
              color="#e040fb"
            />
          </section>

          {/* 2. students per subject, all subjects */}
          <section className="dash__section">
            <PieChart
              heading={`Student Per Subject: ${totalStudents.toLocaleString()} total student${totalStudents === 1 ? "" : "s"}`}
              slices={data.subjects.map((s) => ({ id: s.id, label: s.title, value: s.students }))}
            />
          </section>
        </>
      )}
    </div>
  );
}
