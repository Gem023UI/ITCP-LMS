import * as React from "react";
import { useNavigate } from "react-router-dom";
import QuizCard, { formatDeadline } from "../components/QuizCard";
import ConfirmModal from "../components/ConfirmModal";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import SparklineCard from "../components/SparklineCard";
import PieChart from "../components/charts/PieChart";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import { dashboardApi, type TeacherDashboard as DashboardData } from "../services/dashboardApi";
import { manageApi, type ManagedQuizCard } from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/TeacherDashboard.css";

/** Date -> value for <input type="datetime-local"> in the viewer's local time */
const toLocalInput = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [data, setData] = React.useState<DashboardData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // extend deadline
  const [toExtend, setToExtend] = React.useState<ManagedQuizCard | null>(null);
  const [extendLocal, setExtendLocal] = React.useState("");
  const [extending, setExtending] = React.useState(false);
  const [extendError, setExtendError] = React.useState<string | null>(null);

  // delete quiz
  const [toDelete, setToDelete] = React.useState<ManagedQuizCard | null>(null);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const fail = React.useCallback(
    (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
      else setError(errText(e));
    },
    [navigate],
  );

  const load = React.useCallback(async () => {
    try {
      setData(await dashboardApi.teacher());
      setError(null);
    } catch (e) {
      fail(e);
    }
  }, [fail]);

  // teachers only; other roles go to their own page
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) setError(authError.message);
      else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "TEACHER") navigate(homeFor(user.role), { replace: true });
    else load();
  }, [authLoading, user, authError, navigate, load]);

  /* ----- extend deadline ----- */
  const openExtend = (q: ManagedQuizCard) => {
    setToExtend(q);
    setExtendLocal("");
    setExtendError(null);
  };
  const closeExtend = () => {
    setToExtend(null);
    setExtendError(null);
  };

  // earliest allowed value: the later of "now" and the current deadline
  const extendMin = React.useMemo(() => {
    if (!toExtend) return undefined;
    const now = Date.now();
    const current = toExtend.deadline ? new Date(toExtend.deadline).getTime() : 0;
    return toLocalInput(new Date(Math.max(now, current)));
  }, [toExtend]);

  const confirmExtend = async () => {
    if (!toExtend) return;
    if (!extendLocal) {
      setExtendError("Pick the new deadline.");
      return;
    }
    const next = new Date(extendLocal);
    if (next.getTime() <= Date.now()) {
      setExtendError("Pick a deadline in the future.");
      return;
    }
    if (toExtend.deadline && next.getTime() < new Date(toExtend.deadline).getTime()) {
      setExtendError("The new deadline can't be earlier than the current one.");
      return;
    }
    setExtending(true);
    setExtendError(null);
    try {
      await manageApi.updateDeadline(toExtend.id, next.toISOString());
      closeExtend();
      await load(); // a deadline moved to another day leaves "today"
    } catch (e) {
      setExtendError(errText(e));
    } finally {
      setExtending(false);
    }
  };

  /* ----- delete quiz ----- */
  const closeDelete = () => {
    setToDelete(null);
    setDeleteError(null);
  };
  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await manageApi.deleteQuiz(toDelete.id);
      closeDelete();
      await load();
    } catch (e) {
      setDeleteError(errText(e));
    } finally {
      setDeleting(false);
    }
  };

  const totalStudents = data?.totalStudents ?? 0;

  return (
    <div className="dash">
      <h1 className="dash__heading">Dashboard</h1>
      {error && <p className="dash__error">{error}</p>}
      {!data && !error && <p className="dash__empty">Loading dashboard…</p>}

      {data && (
        <>
          {/* 1. sparkline row */}
          <section className="dash__cards">
            <SparklineCard
              label="Students Joined"
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
              label="Article Likes"
              value={data.likes.total}
              note="total"
              series={data.likes.series}
              days={data.days}
              today={data.likes.today}
              yesterday={data.likes.yesterday}
              variant="bars"
              color="#e040fb"
            />
          </section>

          {/* 2. students per subject */}
          <section className="dash__section">
            <PieChart
              heading={`Student Per Subject: ${totalStudents.toLocaleString()} total student${totalStudents === 1 ? "" : "s"}`}
              slices={data.subjects.map((s) => ({ id: s.id, label: s.title, value: s.students }))}
            />
          </section>

          {/* 3. deadline today */}
          <section className="dash__section">
            <h2 className="dash__title">
              Deadline Today
              <span className="dash__count">{data.deadlineToday.length}</span>
            </h2>
            {data.deadlineToday.length ? (
              <div className="dash__quiz-grid">
                {data.deadlineToday.map((q) => (
                  <QuizCard
                    key={q.id}
                    quiz={q}
                    footer={
                      <>
                        <MetallicBlueButton onClick={() => openExtend(q)}>Edit</MetallicBlueButton>
                        <LiquidGlass as="button" type="button" className="dash__danger" onClick={() => setToDelete(q)}>
                          Delete
                        </LiquidGlass>
                      </>
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="dash__empty">No quizzes are due today.</p>
            )}
          </section>
        </>
      )}

      {toExtend && (
        <ConfirmModal
          title="Extend deadline"
          message={
            toExtend.deadline
              ? `"${toExtend.title}" is due ${formatDeadline(toExtend.deadline)}. Pick a later deadline.`
              : `"${toExtend.title}" has no deadline yet. Pick one.`
          }
          confirmLabel="Save deadline"
          busy={extending}
          disabled={!extendLocal}
          error={extendError}
          onConfirm={confirmExtend}
          onCancel={closeExtend}
        >
          <input
            type="datetime-local"
            min={extendMin}
            value={extendLocal}
            onChange={(e) => setExtendLocal(e.target.value)}
            aria-label="New deadline"
          />
        </ConfirmModal>
      )}

      {toDelete && (
        <ConfirmModal
          title="Delete this quiz?"
          message={
            (toDelete.attemptCount ?? 0) > 0
              ? `"${toDelete.title}" will be permanently deleted, together with ${toDelete.attemptCount} student record(s). Their subject progress will change. This can't be undone.`
              : `"${toDelete.title}" will be permanently deleted. This can't be undone.`
          }
          confirmLabel="Delete"
          danger
          busy={deleting}
          error={deleteError}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}
    </div>
  );
}