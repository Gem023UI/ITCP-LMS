import * as React from "react";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import ChapterCarousel from "../components/ChapterCarousel";
import { CARD_H } from "../data/chaptercardsize";
import type { ChapterCardData } from "../data/chapters";
import { useAuth } from "../hooks/useAuth";
import { adminApi, type AdminChapterCard, type AdminSubject } from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Manage.css";
import "../styles/AdminSubjects.css";

// the carousel only reads id / image / chapterNo / title / description
const toCard = (c: AdminChapterCard) =>
  ({
    id: c.id,
    chapterNo: c.chapterNo,
    title: c.title,
    description: c.description,
    image: c.cardImage,
    chapter: null,
  }) as unknown as ChapterCardData;

export default function SubjectsAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [subjects, setSubjects] = React.useState<AdminSubject[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [selected, setSelected] = React.useState<AdminSubject | null>(null);
  const [cards, setCards] = React.useState<ChapterCardData[]>([]);
  const [chLoading, setChLoading] = React.useState(false);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) {
        setError(authError.message);
        setLoading(false);
      } else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "ADMIN") navigate(homeFor(user.role), { replace: true });
  }, [authLoading, user, authError, navigate]);

  const isAdmin = user?.role === "ADMIN";
  React.useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    adminApi
      .subjects()
      .then((r) => !cancelled && setSubjects(r.subjects))
      .catch((e) => !cancelled && setError(errText(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const open = async (s: AdminSubject) => {
    setSelected(s);
    setCards([]);
    setChLoading(true);
    setError(null);
    try {
      const r = await adminApi.subjectChapters(s.id);
      setCards(r.chapters.map(toCard));
    } catch (e) {
      setError(errText(e));
    } finally {
      setChLoading(false);
    }
  };

  if (selected) {
    return (
      <div className="manage admin-subjects">
        <button type="button" className="manage__link" onClick={() => setSelected(null)}>
          ← All subjects
        </button>
        <h2 className="manage__heading">{selected.title}</h2>
        <p className="admin-subjects__meta">
          {selected.teacherName} · {selected.studentCount} taking · {selected.chapterCount} chapters
          {selected.visibility === "PRIVATE" && selected.code ? ` · Code ${selected.code}` : ""}
        </p>
        {error && <p className="manage__error">{error}</p>}
        {chLoading ? (
          <p className="manage__note">Loading chapters…</p>
        ) : cards.length === 0 ? (
          <p className="manage__note">This subject has no chapters yet.</p>
        ) : (
          <div className="admin-subjects__carousel" style={{ height: CARD_H + 120 }}>
            <ChapterCarousel cards={cards} onSelect={() => {}} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="manage admin-subjects">
      <h2 className="manage__heading">Subjects</h2>
      {error && <p className="manage__error">{error}</p>}
      {loading ? (
        <p className="manage__note">Loading subjects…</p>
      ) : subjects.length === 0 ? (
        <p className="manage__note">No subjects found.</p>
      ) : (
        <div className="admin-subjects__grid">
          {subjects.map((s) => (
            <div key={s.id} className="admin-subjects__item">
              <SubjectCard
                className="subject-card--inline"
                title={s.title}
                description={s.description}
                mediaUrl={s.mediaUrl}
                studentCount={s.studentCount}
                finishedCount={s.finishedCount}
                actionLabel="View Chapters"
                onAction={() => open(s)}
              />
              <p className="admin-subjects__meta">
                {s.teacherName} · {s.visibility === "PRIVATE" ? `Private · ${s.code ?? "—"}` : "Public"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}