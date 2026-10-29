import * as React from "react";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import SubjectCarousel from "../components/SubjectCarousel";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import { ApiError } from "../services/authApi";
import { subjectsApi, type MySubject, type SubjectSummary } from "../services/learningApi";
import "../styles/Subjects.css";

export default function Subjects() {
  const navigate = useNavigate();
  const [mine, setMine] = React.useState<MySubject[]>([]);
  const [pub, setPub] = React.useState<SubjectSummary[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [busyId, setBusyId] = React.useState<string | null>(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleError = React.useCallback(
    (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) navigate("/auth");
      else setError(e instanceof Error ? e.message : "Something went wrong");
    },
    [navigate],
  );

  const load = React.useCallback(async () => {
    try {
      const [m, p] = await Promise.all([subjectsApi.mine(), subjectsApi.listPublic()]);
      setMine(m.subjects);
      setPub(p.subjects);
      setError(null);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  React.useEffect(() => {
    load();
  }, [load]);

  const closeModal = React.useCallback(() => {
    setModalOpen(false);
    setCode("");
    setCodeError(null);
  }, []);

  React.useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setCodeError("Subject code must be 6 characters");
      return;
    }
    setSubmitting(true);
    setCodeError(null);
    try {
      await subjectsApi.joinByCode(code);
      closeModal();
      await load();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) navigate("/auth");
      else setCodeError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const enroll = async (id: string) => {
    setBusyId(id);
    try {
      await subjectsApi.joinPublic(id);
      await load();
    } catch (e) {
      handleError(e);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="subjects">
      <section className="subjects__section">
        <h2 className="subjects__heading">
          My Subjects
          <button
            type="button"
            className="subjects__add"
            aria-label="Add a subject with a code"
            onClick={() => setModalOpen(true)}
          >
            +
          </button>
        </h2>

        {error && <p className="subjects__error">{error}</p>}
        {loading ? (
          <p className="subjects__empty">Loading subjects…</p>
        ) : mine.length ? (
          <SubjectCarousel
            subjects={mine}
            onLearn={(s) => navigate(`/chapters?subject=${s.id}`)}
          />
        ) : (
          <p className="subjects__empty">
            You're not taking any subjects yet. Join one below or add one with a code.
          </p>
        )}
      </section>

      <section className="subjects__section">
        <h2 className="subjects__heading">Public Subjects</h2>
        {!loading && !pub.length ? (
          <p className="subjects__empty">No public subjects available.</p>
        ) : (
          <div className="subjects__public">
            {pub.map((s) => (
              <SubjectCard
                key={s.id}
                className="subject-card--inline"
                title={s.title}
                description={s.description}
                mediaUrl={s.mediaUrl}
                studentCount={s.studentCount}
                actionLabel="Add Subject"
                busy={busyId === s.id}
                onAction={() => enroll(s.id)}
              />
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <div className="subjects__overlay" onClick={closeModal}>
          <LiquidGlass className="subjects__modal" onClick={(e) => e.stopPropagation()}>
            <form className="subjects__form" onSubmit={submitCode}>
              <h3>Add a subject</h3>
              <p>Enter the 6-character code from your instructor.</p>
              <input
                className="subjects__code"
                value={code}
                maxLength={6}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="ABC123"
                onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
              />
              {codeError && <span className="subjects__error">{codeError}</span>}
              <div className="subjects__actions">
                <LiquidGlass as="button" type="button" onClick={closeModal}>
                  Cancel
                </LiquidGlass>
                <MetallicBlueButton type="submit" disabled={submitting}>
                  {submitting ? "Adding…" : "Add Subject"}
                </MetallicBlueButton>
              </div>
            </form>
          </LiquidGlass>
        </div>
      )}
    </div>
  );
}