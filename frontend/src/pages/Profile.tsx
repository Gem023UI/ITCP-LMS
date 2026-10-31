import * as React from "react";
import { useNavigate } from "react-router-dom";
import Lanyard from "../components/Lanyard";
import ActivityYearHeatmap from "../components/ActivityHeatMap";
import SubjectCard from "../components/SubjectCard";
import MetallicBlueButton from "../components/MetallicBlueButton";
import EditProfileModal from "../components/ProfileEditModal";
import { ApiError } from "../services/authApi";
import { progressApi, type HomeData } from "../services/progressApi";
import { useAuth } from "../hooks/useAuth";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Profile.css";

const PLACEHOLDER = {
  firstName: "Firstname M.I.",
  lastName: "Lastname",
  roleLabel: "Student",
  joined: "March 2026",
  frontImage: "/card-front.png",
  backImage: "/card-back.png",
  strapImage: "/band.png",
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [data, setData] = React.useState<HomeData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [firstName, setFirstName] = React.useState(PLACEHOLDER.firstName);
  const [lastName, setLastName] = React.useState(PLACEHOLDER.lastName);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState(false);

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
    <div className="profile">
      {error && <p className="profile__message">{error}</p>}

      {/* info */}
      <section className="profile__info">
        <div className="profile__details">
          <h1 className="profile__name">
            {firstName} {lastName}
          </h1>
          <p className="profile__meta">
            {PLACEHOLDER.roleLabel} - Joined {PLACEHOLDER.joined}
          </p>
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

      {/* subjects */}
      <section className="profile__section">
        <h2 className="profile__heading">Subjects</h2>
        {!data ? (
          !error && <p className="profile__message">Loading your subjects…</p>
        ) : data.subjects.length ? (
          <div className="profile__subjects">
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
          <p className="profile__message">You're not taking any subjects yet.</p>
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