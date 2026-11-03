import * as React from "react";
import { useNavigate } from "react-router-dom";
import Lanyard from "../components/Lanyard";
import ActivityYearHeatmap from "../components/ActivityHeatMap";
import MetallicBlueButton from "../components/MetallicBlueButton";
import EditProfileModal from "../components/ProfileEditModal";
import PublishedArticles from "../components/PublishedArticles";
import StatRow from "../components/StatRow";
import AreaChart from "../components/charts/AreaChart";
import { ApiError } from "../services/authApi";
import { progressApi, type HomeData, type QuizStats } from "../services/progressApi";
import { useAuth } from "../hooks/useAuth";
import { errText } from "../utils/errorText";
import { profileFor } from "../utils/roleRoutes";
import "../styles/Profile.css";

const PLACEHOLDER = {
  frontImage: "/card-front.png",
  backImage: "/card-back.png",
  strapImage: "/band.png",
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [data, setData] = React.useState<HomeData | null>(null);
  const [stats, setStats] = React.useState<QuizStats | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAvatarUrl(user.imageUrl);
  }, [user]);

  const joined = user
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) setError(authError.message);
      else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "STUDENT") {
      navigate(profileFor(user.role), { replace: true }); // teachers -> /teacher/profile
      return;
    }

    let cancelled = false;
    const fail = (e: unknown) => {
      if (cancelled) return;
      if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
      else setError(errText(e));
    };
    progressApi.home().then((d) => !cancelled && setData(d)).catch(fail);
    progressApi.quizStats().then((s) => !cancelled && setStats(s)).catch(fail);
    return () => {
      cancelled = true;
    };
  }, [authLoading, user, authError, navigate]);

  return (
    <div className="profile">
      {error && <p className="profile__message">{error}</p>}

      {/* info */}
      <section className="profile__info">
        <div className="profile__details">
          <h1 className="profile__name">
            {firstName} {lastName}
          </h1>
          <p className="profile__meta">Student - Joined {joined}</p>
          <MetallicBlueButton className="profile__edit" onClick={() => setEditing(true)}>
            Edit Profile
          </MetallicBlueButton>
        </div>

        <div className="profile__lanyard">
          <Lanyard
            frontImage={avatarUrl ?? PLACEHOLDER.frontImage}
            backImage={PLACEHOLDER.backImage}
            strapImage={PLACEHOLDER.strapImage}
            imageFit="cover"
            cardColor="#ffffff"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.3}
            size={0.6}
            anchor="center"
            strapLength={0.5}
            strapColor="#111111"
            strapWidth={0.65}
            metal="silver"
            gravity={1}
            damping={0.5}
            elasticity={0.5}
            breeze={0.5}
            interactive
            intro
          />
        </div>
      </section>

      {/* progress */}
      <section className="profile__section">
        <h2 className="profile__heading">Year-Round Progress</h2>
        {data ? (
          <ActivityYearHeatmap today={data.today} activity={data.activity} />
        ) : (
          !error && <p className="profile__message">Loading your progress…</p>
        )}
      </section>

      {/* published articles: shared with the teacher profile */}
      {user?.role === "STUDENT" && <PublishedArticles userId={user.id} />}

      {/* quiz stats: stat row, then the area graph */}
      <section className="profile__section profile__stats">
        <h2 className="profile__heading">Quiz Stats</h2>
        {stats ? (
          <>
            <StatRow
              stats={[
                { value: stats.quizzesCompleted, label: "Quizzes\nCompleted" },
                { value: stats.percentPerQuiz, suffix: "%", label: "Per\nQuiz" },
                {
                  value: stats.averageScore,
                  decimals: Number.isInteger(stats.averageScore) ? 0 : 1,
                  label: "Average\nScore",
                },
              ]}
            />
            <AreaChart
              points={stats.points.map((p) => ({
                t: Date.parse(p.date),
                a: p.total,
                b: p.score,
                title: p.title,
                subtitle: p.subjectTitle,
              }))}
              from={Date.parse(stats.from)}
              to={Date.parse(stats.to)}
              seriesA={{ label: "Quiz items", color: "#6c63ff" }}
              seriesB={{ label: "Your score", color: "#ffc400" }}
              emptyText="No quizzes taken in the last 30 days."
            />
          </>
        ) : (
          !error && <p className="profile__message">Loading your quiz stats…</p>
        )}
      </section>

      {editing && (
        <EditProfileModal
          initial={{ firstName, lastName, avatarUrl }}
          onClose={() => setEditing(false)}
          onSave={(v) => {
            setFirstName(v.firstName);
            setLastName(v.lastName);
            setAvatarUrl(v.avatarUrl);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}