import * as React from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import { quizApi, type QuizLists, type StudentQuizCard } from "../services/learningApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Quizzes.css";

type Section = {
  key: "dueToday" | "upcoming" | "missed" | "completed";
  title: string;
  empty: string;
  hint?: string;
};

const SECTIONS: Section[] = [
  { key: "dueToday", title: "Due Today", empty: "Nothing is due today." },
  { key: "upcoming", title: "Upcoming", empty: "No upcoming quizzes.", hint: "Soonest deadline first" },
  { key: "missed", title: "Missed", empty: "You haven't missed any quizzes.", hint: "Most recent first" },
  { key: "completed", title: "Completed", empty: "No completed quizzes yet.", hint: "Most recent first" },
];

export default function Quizzes() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [lists, setLists] = React.useState<QuizLists | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // students only; everyone else goes to their own page
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) setError(authError.message);
      else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "STUDENT") {
      navigate(homeFor(user.role), { replace: true });
      return;
    }

    let cancelled = false;
    quizApi
      .list()
      .then((l) => !cancelled && setLists(l))
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
        else setError(errText(e));
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, user, authError, navigate]);

  // a STRICT quiz that was never taken is closed: show it, but don't open it
  const open = (q: StudentQuizCard) => (q.closed ? undefined : () => navigate(`/quiz/${q.id}`));

  return (
    <div className="quizzes">
      <h1 className="quizzes__heading">Quizzes</h1>
      {error && <p className="quizzes__error">{error}</p>}
      {!lists && !error && <p className="quizzes__empty">Loading quizzes…</p>}

      {lists &&
        SECTIONS.map((s) => {
          const items = lists[s.key];
          return (
            <section key={s.key} className={`quizzes__section${s.key === "dueToday" ? " is-today" : ""}`}>
              <h2 className="quizzes__title">
                {s.title}
                <span className="quizzes__count">{items.length}</span>
                {s.hint && <small>{s.hint}</small>}
              </h2>
              {items.length ? (
                <div className="quizzes__grid">
                  {items.map((q) => (
                    <QuizCard key={q.id} quiz={q} onOpen={open(q)} />
                  ))}
                </div>
              ) : (
                <p className="quizzes__empty">{s.empty}</p>
              )}
            </section>
          );
        })}
    </div>
  );
}
