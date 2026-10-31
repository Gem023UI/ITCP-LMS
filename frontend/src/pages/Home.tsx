import * as React from "react";
import { useNavigate } from "react-router-dom";
import ActivityHeatmap from "../components/StreakCalendar";
import SubjectCard from "../components/SubjectCard";
import { ApiError } from "../services/authApi";
import { progressApi, type HomeData } from "../services/progressApi";
import { useAuth } from "../hooks/useAuth";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [data, setData] = React.useState<HomeData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // only students live here; everyone else goes to their own page
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
    progressApi
      .home()
      .then((d) => !cancelled && setData(d))
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
        else setError(e instanceof Error ? e.message : "Something went wrong");
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, user, authError, navigate]);

  return (
    <div className="home">
      {error && <p className="home__message">{error}</p>}

      {/* streak + yearly heatmap */}
      <section className="home__streak">
        <div className="home__streak-info">
          <h2 className="home__heading">Current Streak</h2>
          <div className="home__streak-number" aria-live="polite">
            <span>{data ? data.streak : "–"}</span>
            <small>{data?.streak === 1 ? "Day" : "Days"}</small>
          </div>
        </div>
        <div className="home__heatmap">
          {data && <ActivityHeatmap today={data.today} activity={data.activity} />}
        </div>
      </section>

      {/* ongoing subjects, latest -> earliest */}
      <section className="home__subjects-section">
        <h2 className="home__heading">Continue where you left off</h2>
        {!data ? (
          !error && <p className="home__message">Loading your subjects…</p>
        ) : data.subjects.length ? (
          <div className="home__subjects">
            {data.subjects.map((s) => (
              <SubjectCard
                key={s.id}
                title={s.title}
                description={s.description}
                mediaUrl={s.mediaUrl}
                studentCount={s.studentCount}
                progress={{ completed: s.completedChapters, total: s.totalChapters }}
                actionLabel="Continue"
                onAction={() => navigate(`/chapters?subject=${s.id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="home__message">
            You're not taking any subjects yet.{" "}
            <a
              href="/subjects"
              onClick={(e) => {
                e.preventDefault();
                navigate("/subjects");
              }}
            >
              Browse subjects
            </a>
          </p>
        )}
      </section>
    </div>
  );
}