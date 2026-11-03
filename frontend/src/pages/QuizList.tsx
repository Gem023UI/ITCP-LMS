import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import { formatDeadline } from "../components/QuizCard";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import { manageApi, type QuizRecords } from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/QuizList.css";

export default function QuizList() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [data, setData] = React.useState<QuizRecords | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [exporting, setExporting] = React.useState(false);

  const load = React.useCallback(async () => {
    if (!quizId) return;
    try {
      setData(await manageApi.quizRecords(quizId));
      setError(null);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
      else setError(errText(e));
    }
  }, [quizId, navigate]);

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

  const download = async () => {
    if (!data) return;
    setExporting(true);
    try {
      const { downloadQuizPdf } = await import("../utils/quizPdf"); // keeps jsPDF out of the main bundle
      downloadQuizPdf(data);
    } catch (e) {
      setError(errText(e));
    } finally {
      setExporting(false);
    }
  };

  const quiz = data?.quiz;
  const stats = data?.stats;

  return (
    <div className="qlist">
      <button type="button" className="qlist__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {error && <p className="qlist__error">{error}</p>}
      {!data && !error && <p className="qlist__note">Loading quiz…</p>}

      {quiz && stats && data && (
        <>
          {/* 1. quiz details */}
          <LiquidGlass className="qlist__panel">
            <div className="qlist__panel-body">
              <h1 className="qlist__title">{quiz.title}</h1>
              <p className="qlist__subject">
                {quiz.subjectTitle} · Quiz {quiz.quizNo}
              </p>

              <div className="qlist__details">
                <div>
                  <span className="qlist__label">Chapters covered</span>
                  {quiz.chapters.length ? (
                    <ul className="qlist__chapters">
                      {quiz.chapters.map((c) => (
                        <li key={c.id}>
                          <b>Ch {c.chapterNo}</b> {c.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="qlist__note">No chapters</p>
                  )}
                </div>
                <div>
                  <span className="qlist__label">Deadline</span>
                  <p className="qlist__value">{quiz.deadline ? formatDeadline(quiz.deadline) : "No deadline"}</p>
                </div>
                <div>
                  <span className="qlist__label">Mode</span>
                  <p className="qlist__value">
                    {quiz.deadline ? (quiz.deadlineMode === "STRICT" ? "Strict" : "Late allowed") : "-"}
                  </p>
                </div>
              </div>
            </div>
          </LiquidGlass>

          {/* 2. quiz stats */}
          <section className="qlist__stats">
            <LiquidGlass className="qlist__stat">
              <div className="qlist__stat-body">
                <span className="qlist__label">Students who took this quiz</span>
                <strong className="qlist__big">
                  {stats.taken}
                  <small> / {stats.enrolled}</small>
                </strong>
                <span className="qlist__sub">taking {quiz.subjectTitle}</span>
              </div>
            </LiquidGlass>
            <LiquidGlass className="qlist__stat">
              <div className="qlist__stat-body">
                <span className="qlist__label">Average score</span>
                <strong className="qlist__big">
                  {stats.averageScore}
                  <small> / {stats.totalItems}</small>
                </strong>
                <span className="qlist__sub">{stats.averagePercent}% average</span>
              </div>
            </LiquidGlass>
          </section>

          <div className="qlist__toolbar">
            <MetallicBlueButton type="button" onClick={download} disabled={exporting || data.records.length === 0}>
              {exporting ? "Preparing…" : "Download PDF"}
            </MetallicBlueButton>
          </div>

          {/* 3. student records */}
          <section>
            <h2 className="qlist__section-title">Student Records</h2>
            {data.records.length === 0 ? (
              <p className="qlist__note">No student has taken this quiz yet.</p>
            ) : (
              <LiquidGlass className="qlist__panel">
                <div className="qlist__table-wrap">
                  <table className="qlist__table">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className="is-right">Score</th>
                        <th className="is-right">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.records.map((r) => (
                        <tr key={r.studentId}>
                          <td>{r.firstName}</td>
                          <td>{r.lastName}</td>
                          <td className="is-right">
                            {r.score}/{r.total}
                            {r.isLate && <span className="qlist__late">Late</span>}
                          </td>
                          <td className="is-right">{r.percent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </LiquidGlass>
            )}
          </section>
        </>
      )}
    </div>
  );
}
