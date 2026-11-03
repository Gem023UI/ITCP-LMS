import * as React from "react";
import { useNavigate } from "react-router-dom";
import Lanyard from "../components/Lanyard";
import MetallicBlueButton from "../components/MetallicBlueButton";
import EditProfileModal from "../components/ProfileEditModal";
import PublishedArticles from "../components/PublishedArticles";
import { useAuth } from "../hooks/useAuth";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Profile.css";

const PLACEHOLDER = {
  frontImage: "/card-front.png",
  backImage: "/card-back.png",
  strapImage: "/band.png",
};

/**
 * Same as the student profile minus the quiz graph and the year-round heatmap
 * (the heatmap is built from student study activity, which teachers don't have).
 */
export default function TeacherProfile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
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

  // teachers only; students go to /profile, admins to their own page
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) setError(authError.message);
      else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "TEACHER") {
      navigate(user.role === "STUDENT" ? "/profile" : homeFor(user.role), { replace: true });
    }
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
          <p className="profile__meta">Teacher - Joined {joined}</p>
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

      {/* published articles: shared with the student profile */}
      {user?.role === "TEACHER" && <PublishedArticles userId={user.id} />}

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