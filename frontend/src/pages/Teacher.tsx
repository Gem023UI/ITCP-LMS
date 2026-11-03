import * as React from "react";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import QuizCard from "../components/QuizCard";
import ConfirmModal from "../components/ConfirmModal";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import type { DeadlineMode } from "../services/learningApi";
import {
  manageApi,
  type ChapterInput,
  type ChapterListItem,
  type ManagedQuizCard,
  type ManagedSubject,
  type ManagedSubjectDetail,
  type QuizInput,
  type QuizQuestionPayload,
  type SubjectInput,
} from "../services/manageApi";
import { errText } from "../utils/errorText";
import { homeFor } from "../utils/roleRoutes";
import "../styles/Manage.css";

/* ---------- shared bits ---------- */

function Modal({
  title,
  onClose,
  wide,
  children,
}: {
  title: string;
  onClose: () => void;
  wide?: boolean;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="manage__overlay" onMouseDown={onClose}>
      <LiquidGlass
        className={`manage__modal${wide ? " is-wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="manage__modal-body">
          <h3>{title}</h3>
          {children}
        </div>
      </LiquidGlass>
    </div>
  );
}

function SubjectForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: SubjectInput;
  submitLabel: string;
  onSubmit: (v: SubjectInput) => Promise<void>;
}) {
  const [v, setV] = React.useState(initial);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await onSubmit(v);
    } catch (err) {
      setError(errText(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="manage__form" onSubmit={submit}>
      <label>
        Title
        <input value={v.title} maxLength={120} onChange={(e) => setV({ ...v, title: e.target.value })} />
      </label>
      <label>
        Description
        <textarea
          rows={3}
          value={v.description}
          maxLength={1000}
          onChange={(e) => setV({ ...v, description: e.target.value })}
        />
      </label>
      <label>
        Video URL (direct file or YouTube link)
        <input value={v.mediaUrl} onChange={(e) => setV({ ...v, mediaUrl: e.target.value })} />
      </label>
      <label>
        Visibility
        <select
          value={v.visibility}
          onChange={(e) => setV({ ...v, visibility: e.target.value as SubjectInput["visibility"] })}
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private (join by code)</option>
        </select>
      </label>
      {error && <p className="manage__error">{error}</p>}
      <MetallicBlueButton type="submit" disabled={busy}>
        {busy ? "Saving…" : submitLabel}
      </MetallicBlueButton>
    </form>
  );
}

/* ---------- chapter editor ---------- */

type Draft = Record<
  | "chapterNo"
  | "title"
  | "description"
  | "durationMinutes"
  | "cardImage"
  | "videoUrl"
  | "slideUrl"
  | "objectives"
  | "sections"
  | "keyTerms"
  | "references",
  string
>;

const pretty = (v: unknown) => JSON.stringify(v, null, 2);

const SIMPLE: { key: keyof Draft; label: string; kind?: "number" | "area" }[] = [
  { key: "chapterNo", label: "Chapter number", kind: "number" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description", kind: "area" },
  { key: "durationMinutes", label: "Duration (minutes)", kind: "number" },
  { key: "cardImage", label: "Card image (URL or /chapters/01.png)" },
  { key: "videoUrl", label: "Video embed URL" },
  { key: "slideUrl", label: "Slides embed URL" },
];

const JSON_FIELDS: { key: keyof Draft; label: string }[] = [
  { key: "objectives", label: "Objectives (JSON)" },
  { key: "sections", label: "Sections (JSON)" },
  { key: "keyTerms", label: "Key terms (JSON)" },
  { key: "references", label: "References (JSON)" },
];

const blankDraft = (nextNo: number): Draft => ({
  chapterNo: String(nextNo),
  title: "",
  description: "",
  durationMinutes: "30",
  cardImage: "",
  videoUrl: "",
  slideUrl: "",
  objectives: pretty([{ objective: "" }]),
  sections: pretty([
    { sectionNo: "section-1", header: "", imageUrl: [], imageSource: [], content: [{ paragraph: "" }] },
  ]),
  keyTerms: pretty([{ word: "", definition: "", source: "" }]),
  references: pretty([{ author: "", link: "" }]),
});

function ChapterModal({
  subjectId,
  chapterId,
  nextNo,
  onClose,
  onSaved,
}: {
  subjectId: string;
  chapterId: string | null;
  nextNo: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = React.useState<Draft | null>(chapterId ? null : blankDraft(nextNo));
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (!chapterId) return;
    let cancelled = false;
    manageApi
      .getChapter(chapterId)
      .then(({ chapter: c }) => {
        if (cancelled) return;
        setDraft({
          chapterNo: String(c.chapterNo),
          title: c.title,
          description: c.description,
          durationMinutes: String(c.durationMinutes),
          cardImage: c.cardImage,
          videoUrl: c.videoUrl,
          slideUrl: c.slideUrl,
          objectives: pretty(c.objectives),
          sections: pretty(c.sections),
          keyTerms: pretty(c.keyTerms),
          references: pretty(c.references),
        });
      })
      .catch((e) => !cancelled && setError(errText(e)));
    return () => {
      cancelled = true;
    };
  }, [chapterId]);

  const set = (key: keyof Draft, value: string) => setDraft((d) => d && { ...d, [key]: value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    let body: ChapterInput;
    try {
      body = {
        chapterNo: Number(draft.chapterNo),
        title: draft.title,
        description: draft.description,
        durationMinutes: Number(draft.durationMinutes),
        cardImage: draft.cardImage,
        videoUrl: draft.videoUrl,
        slideUrl: draft.slideUrl,
        objectives: JSON.parse(draft.objectives),
        sections: JSON.parse(draft.sections),
        keyTerms: JSON.parse(draft.keyTerms),
        references: JSON.parse(draft.references),
      };
    } catch {
      setError("One of the JSON fields is not valid JSON.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (chapterId) await manageApi.updateChapter(chapterId, body);
      else await manageApi.createChapter(subjectId, body);
      onSaved();
    } catch (err) {
      setError(errText(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title={chapterId ? "Edit chapter" : "Add chapter"} wide onClose={onClose}>
      {!draft ? (
        <p>{error ?? "Loading…"}</p>
      ) : (
        <form className="manage__form" onSubmit={submit}>
          {SIMPLE.map(({ key, label, kind }) => (
            <label key={key}>
              {label}
              {kind === "area" ? (
                <textarea rows={3} value={draft[key]} onChange={(e) => set(key, e.target.value)} />
              ) : (
                <input
                  type={kind === "number" ? "number" : "text"}
                  value={draft[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              )}
            </label>
          ))}
          {JSON_FIELDS.map(({ key, label }) => (
            <label key={key}>
              {label}
              <textarea
                className="manage__json"
                rows={8}
                spellCheck={false}
                value={draft[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </label>
          ))}
          {error && <p className="manage__error">{error}</p>}
          <div className="manage__actions">
            <LiquidGlass as="button" type="button" onClick={onClose}>
              Cancel
            </LiquidGlass>
            <MetallicBlueButton type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save chapter"}
            </MetallicBlueButton>
          </div>
        </form>
      )}
    </Modal>
  );
}

/* ---------- quiz editor ---------- */

type QType = QuizQuestionPayload["type"];
type Q = { type: QType; question: string; choices: string[]; correctIndex: number; answerText: string };

const blankQ = (): Q => ({
  type: "multiple_choice",
  question: "",
  choices: ["", ""],
  correctIndex: 0,
  answerText: "",
});

const toPayload = (q: Q): QuizQuestionPayload =>
  q.type === "multiple_choice"
    ? {
        type: q.type,
        question: q.question.trim(),
        choices: q.choices.map((c) => c.trim()),
        correctAnswer: (q.choices[q.correctIndex] ?? "").trim(),
      }
    : { type: q.type, question: q.question.trim(), choices: [], correctAnswer: q.answerText.trim() };

/** returns the first problem with the questions, or null when they are fine */
const questionProblem = (qs: Q[]): string | null => {
  for (let i = 0; i < qs.length; i++) {
    const q = qs[i];
    const n = `Question ${i + 1}`;
    if (!q.question.trim()) return `${n} needs a question.`;
    if (q.type === "multiple_choice") {
      if (q.choices.some((c) => !c.trim())) return `${n}: fill in every choice (or remove the empty ones).`;
      if (new Set(q.choices.map((c) => c.trim().toLowerCase())).size !== q.choices.length) {
        return `${n}: two choices are the same.`;
      }
    } else if (!q.answerText.trim()) {
      return `${n} needs a correct answer.`;
    }
  }
  return null;
};

const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};

function QuizEditorModal({
  subjectId,
  chapters,
  quizId,
  onClose,
  onSaved,
}: {
  subjectId: string;
  chapters: ChapterListItem[];
  /** null = creating a new quiz */
  quizId: string | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = React.useState("");
  const [defaultTitle, setDefaultTitle] = React.useState("");
  const [chapterIds, setChapterIds] = React.useState<string[]>([]);
  const [questions, setQuestions] = React.useState<Q[]>([]);
  const [attempts, setAttempts] = React.useState(0);
  const [hasDeadline, setHasDeadline] = React.useState(false);
  const [deadlineLocal, setDeadlineLocal] = React.useState("");
  const [mode, setMode] = React.useState<DeadlineMode>("STRICT");
  const [extendLocal, setExtendLocal] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const locked = attempts > 0;

  const orderedChapters = React.useMemo(
    () => [...chapters].sort((a, b) => a.chapterNo - b.chapterNo),
    [chapters],
  );

  React.useEffect(() => {
    let cancelled = false;
    const load = quizId
      ? manageApi.getQuiz(quizId).then((quiz) => {
          if (cancelled) return;
          setTitle(quiz.title);
          setDefaultTitle(`${quiz.subjectTitle} Quiz ${quiz.quizNo}`);
          setChapterIds(quiz.chapterIds);
          setAttempts(quiz.attemptCount);
          setHasDeadline(!!quiz.deadline);
          setDeadlineLocal(quiz.deadline ? toLocalInput(quiz.deadline) : "");
          setMode(quiz.deadlineMode);
          setQuestions(
            quiz.questions.map((q) => ({
              type: q.type,
              question: q.question,
              choices: q.type === "multiple_choice" ? q.choices : ["", ""],
              correctIndex: Math.max(0, q.choices.indexOf(q.correctAnswer)),
              answerText: q.type === "identification" ? q.correctAnswer : "",
            })),
          );
        })
      : manageApi.quizDefaults(subjectId).then((d) => {
          if (cancelled) return;
          setTitle(d.title);
          setDefaultTitle(d.title);
          setQuestions([blankQ()]);
        });
    load.catch((e) => !cancelled && setError(errText(e))).finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [quizId, subjectId]);

  const patch = (i: number, p: Partial<Q>) =>
    setQuestions((qs) => qs.map((q, j) => (j === i ? { ...q, ...p } : q)));

  const removeChoice = (i: number, ci: number) => {
    const q = questions[i];
    const correctIndex = ci === q.correctIndex ? 0 : ci < q.correctIndex ? q.correctIndex - 1 : q.correctIndex;
    patch(i, { choices: q.choices.filter((_, k) => k !== ci), correctIndex });
  };

  const toggleChapter = (id: string) =>
    setChapterIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const save = async () => {
    if (chapterIds.length === 0) {
      setError("Select at least one chapter this quiz covers.");
      return;
    }
    const problem = questionProblem(questions);
    if (problem) {
      setError(problem);
      return;
    }
    if (hasDeadline) {
      if (!deadlineLocal) {
        setError("Pick a deadline date and time, or turn the deadline off.");
        return;
      }
      if (new Date(deadlineLocal).getTime() <= Date.now()) {
        setError("Pick a deadline in the future.");
        return;
      }
    }

    const input: QuizInput = {
      title: title.trim() || undefined, // blank = default title
      chapterIds,
      questions: questions.map(toPayload),
      deadline: hasDeadline ? new Date(deadlineLocal).toISOString() : null, // null = no deadline
      deadlineMode: mode,
    };

    setBusy(true);
    setError(null);
    try {
      if (quizId) await manageApi.updateQuiz(quizId, input);
      else await manageApi.createQuiz(subjectId, input);
      onSaved();
    } catch (e) {
      setError(errText(e));
      setBusy(false);
    }
  };

  // quizzes that students already took: only the deadline can be moved, and only later
  const extend = async () => {
    if (!quizId) return;
    if (!extendLocal) {
      setError("Pick the new deadline first.");
      return;
    }
    const next = new Date(extendLocal);
    if (next.getTime() <= Date.now()) {
      setError("Pick a deadline in the future.");
      return;
    }
    if (hasDeadline && deadlineLocal && next.getTime() < new Date(deadlineLocal).getTime()) {
      setError("The new deadline can't be earlier than the current one.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await manageApi.updateDeadline(quizId, next.toISOString());
      onSaved();
    } catch (e) {
      setError(errText(e));
      setBusy(false);
    }
  };

  return (
    <Modal title={quizId ? "Edit quiz" : "New quiz"} wide onClose={onClose}>
      {loading ? (
        <p>{error ?? "Loading…"}</p>
      ) : (
        <div className="manage__form">
          {locked && (
            <p className="manage__note">
              {attempts} student(s) already took this quiz, so everything is locked except the deadline,
              which you can only extend (see "Extend deadline" below). To rebuild the quiz, delete it from
              the list (this also deletes their scores).
            </p>
          )}

          <label>
            Title
            <input
              disabled={locked}
              value={title}
              maxLength={120}
              placeholder={defaultTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
            <small className="manage__hint">Leave blank to use "{defaultTitle}".</small>
          </label>

          <div className="manage__question">
            <strong>Covers these chapters</strong>
            {orderedChapters.length === 0 ? (
              <p className="manage__note">This subject has no chapters yet.</p>
            ) : (
              <div className="manage__coverage">
                {orderedChapters.map((c) => (
                  <label key={c.id} className="manage__check">
                    <input
                      type="checkbox"
                      disabled={locked}
                      checked={chapterIds.includes(c.id)}
                      onChange={() => toggleChapter(c.id)}
                    />
                    <span>
                      <b>Ch {c.chapterNo}</b> {c.title}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="manage__question">
            <label className="manage__check">
              <input
                type="checkbox"
                disabled={locked}
                checked={hasDeadline}
                onChange={(e) => setHasDeadline(e.target.checked)}
              />
              <span>Set a deadline</span>
            </label>
            {hasDeadline ? (
              <>
                <input
                  type="datetime-local"
                  disabled={locked}
                  value={deadlineLocal}
                  onChange={(e) => setDeadlineLocal(e.target.value)}
                />
                <select disabled={locked} value={mode} onChange={(e) => setMode(e.target.value as DeadlineMode)}>
                  <option value="STRICT">Strict: no submissions after the deadline</option>
                  <option value="LATE">Late: accept late submissions (marked late)</option>
                </select>
              </>
            ) : (
              <p className="manage__note">No deadline: students can take it anytime.</p>
            )}

            {locked && (
              <>
                <strong>Extend deadline</strong>
                <input
                  type="datetime-local"
                  min={hasDeadline && deadlineLocal ? deadlineLocal : undefined}
                  value={extendLocal}
                  onChange={(e) => setExtendLocal(e.target.value)}
                />
                <MetallicBlueButton type="button" onClick={extend} disabled={busy}>
                  {busy ? "Saving…" : "Extend deadline"}
                </MetallicBlueButton>
              </>
            )}
          </div>

          {questions.map((q, i) => (
            <div key={i} className="manage__question">
              <div className="manage__question-head">
                <strong>Question {i + 1}</strong>
                <select disabled={locked} value={q.type} onChange={(e) => patch(i, { type: e.target.value as QType })}>
                  <option value="multiple_choice">Multiple choice</option>
                  <option value="identification">Identification</option>
                </select>
                {!locked && questions.length > 1 && (
                  <button
                    type="button"
                    className="manage__link"
                    onClick={() => setQuestions((qs) => qs.filter((_, j) => j !== i))}
                  >
                    Remove
                  </button>
                )}
              </div>

              <textarea
                rows={2}
                disabled={locked}
                value={q.question}
                placeholder="Question"
                onChange={(e) => patch(i, { question: e.target.value })}
              />

              {q.type === "multiple_choice" ? (
                <div className="manage__choices">
                  {q.choices.map((c, ci) => (
                    <div key={ci} className="manage__choice-row">
                      <input
                        type="radio"
                        name={`correct-${i}`}
                        title="Correct answer"
                        disabled={locked}
                        checked={q.correctIndex === ci}
                        onChange={() => patch(i, { correctIndex: ci })}
                      />
                      <input
                        disabled={locked}
                        value={c}
                        placeholder={`Choice ${ci + 1}`}
                        onChange={(e) =>
                          patch(i, { choices: q.choices.map((x, k) => (k === ci ? e.target.value : x)) })
                        }
                      />
                      {!locked && q.choices.length > 2 && (
                        <button type="button" className="manage__link" onClick={() => removeChoice(i, ci)}>
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {!locked && q.choices.length < 6 && (
                    <button
                      type="button"
                      className="manage__link"
                      onClick={() => patch(i, { choices: [...q.choices, ""] })}
                    >
                      + Add choice
                    </button>
                  )}
                </div>
              ) : (
                <input
                  className="manage__caps"
                  disabled={locked}
                  value={q.answerText}
                  placeholder="CORRECT ANSWER (ALL CAPS)"
                  onChange={(e) => patch(i, { answerText: e.target.value.toUpperCase() })}
                />
              )}
            </div>
          ))}

          {!locked && (
            <button type="button" className="manage__link" onClick={() => setQuestions((qs) => [...qs, blankQ()])}>
              + Add question
            </button>
          )}

          {error && <p className="manage__error">{error}</p>}
          <div className="manage__actions">
            <LiquidGlass as="button" type="button" onClick={onClose}>
              {locked ? "Close" : "Cancel"}
            </LiquidGlass>
            {!locked && (
              <MetallicBlueButton type="button" onClick={save} disabled={busy}>
                {busy ? "Saving…" : quizId ? "Save quiz" : "Create quiz"}
              </MetallicBlueButton>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ---------- page ---------- */

export default function SubjectTeacher() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [subjects, setSubjects] = React.useState<ManagedSubject[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [detail, setDetail] = React.useState<ManagedSubjectDetail | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [chapterModal, setChapterModal] = React.useState<{ id: string | null } | null>(null);

  // quizzes of the open subject
  const [quizzes, setQuizzes] = React.useState<ManagedQuizCard[]>([]);
  const [quizModal, setQuizModal] = React.useState<{ id: string | null } | null>(null);
  const [quizToDelete, setQuizToDelete] = React.useState<ManagedQuizCard | null>(null);
  const [deletingQuiz, setDeletingQuiz] = React.useState(false);
  const [deleteQuizError, setDeleteQuizError] = React.useState<string | null>(null);

  const fail = React.useCallback(
    (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) navigate("/auth");
      else setError(errText(e));
    },
    [navigate],
  );

  const loadList = React.useCallback(async () => {
    try {
      setSubjects((await manageApi.listSubjects()).subjects);
      setError(null);
    } catch (e) {
      fail(e);
    } finally {
      setLoading(false);
    }
  }, [fail]);

  const openSubject = React.useCallback(
    async (id: string) => {
      try {
        setDetail((await manageApi.getSubject(id)).subject);
        setError(null);
      } catch (e) {
        fail(e);
      }
    },
    [fail],
  );

  const loadQuizzes = React.useCallback(
    async (id: string) => {
      try {
        setQuizzes(await manageApi.listQuizzes(id));
      } catch (e) {
        fail(e);
      }
    },
    [fail],
  );

  /** chapter and quiz changes affect each other (a quiz covers chapters), so refresh both */
  const refreshDetail = React.useCallback(
    async (id: string) => {
      await Promise.all([openSubject(id), loadQuizzes(id)]);
    },
    [openSubject, loadQuizzes],
  );

  // load the quiz list whenever a subject is opened; clear it when going back
  const detailId = detail?.id;
  React.useEffect(() => {
    if (detailId) loadQuizzes(detailId);
    else setQuizzes([]);
  }, [detailId, loadQuizzes]);

  // teachers only; other roles go to their own page
  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) {
        setError(authError.message);
        setLoading(false);
      } else navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "TEACHER") navigate(homeFor(user.role), { replace: true });
    else loadList();
  }, [authLoading, user, authError, navigate, loadList]);

  const removeSubject = async (s: ManagedSubject) => {
    if (!window.confirm(`Delete "${s.title}"? Its chapters, quizzes and student progress are deleted too.`)) return;
    try {
      await manageApi.deleteSubject(s.id);
      await loadList();
    } catch (e) {
      fail(e);
    }
  };

  const removeChapter = async (c: ChapterListItem) => {
    if (
      !detail ||
      !window.confirm(`Delete "${c.title}"? Quizzes that cover it will lose this chapter from their coverage.`)
    )
      return;
    try {
      await manageApi.deleteChapter(c.id);
      await refreshDetail(detail.id);
    } catch (e) {
      fail(e);
    }
  };

  const closeDeleteQuiz = () => {
    setQuizToDelete(null);
    setDeleteQuizError(null);
  };

  const confirmDeleteQuiz = async () => {
    if (!quizToDelete || !detail) return;
    setDeletingQuiz(true);
    setDeleteQuizError(null);
    try {
      await manageApi.deleteQuiz(quizToDelete.id);
      setQuizToDelete(null);
      await refreshDetail(detail.id);
    } catch (e) {
      setDeleteQuizError(errText(e));
    } finally {
      setDeletingQuiz(false);
    }
  };

  /* ----- workspace for one subject ----- */
  if (detail) {
    const nextNo = Math.max(0, ...detail.chapters.map((c) => c.chapterNo)) + 1;
    return (
      <div className="manage">
        <button
          type="button"
          className="manage__link"
          onClick={() => {
            setDetail(null);
            loadList();
          }}
        >
          ← Back to my subjects
        </button>

        <h2 className="manage__heading">{detail.title}</h2>
        {detail.code && (
          <p className="manage__note">
            Join code: <strong className="manage__code">{detail.code}</strong>
          </p>
        )}
        {error && <p className="manage__error">{error}</p>}

        <LiquidGlass className="manage__panel">
          <div className="manage__panel-body">
            <h3>Details</h3>
            <SubjectForm
              key={detail.id}
              initial={{
                title: detail.title,
                description: detail.description,
                mediaUrl: detail.mediaUrl,
                visibility: detail.visibility,
              }}
              submitLabel="Save changes"
              onSubmit={async (v) => {
                const { subject } = await manageApi.updateSubject(detail.id, v);
                setDetail((d) => d && { ...d, ...subject });
              }}
            />
          </div>
        </LiquidGlass>

        <div className="manage__row-head">
          <h3>Chapters</h3>
          <MetallicBlueButton onClick={() => setChapterModal({ id: null })}>+ Add chapter</MetallicBlueButton>
        </div>

        {detail.chapters.length === 0 && <p className="manage__note">No chapters yet.</p>}
        {detail.chapters.map((c) => (
          <LiquidGlass key={c.id} className="manage__panel">
            <div className="manage__chapter-row">
              <span>
                <strong>Ch {c.chapterNo}.</strong> {c.title} · {c.durationMinutes} min
              </span>
              <span className="manage__chapter-actions">
                <MetallicBlueButton onClick={() => setChapterModal({ id: c.id })}>Edit</MetallicBlueButton>
                <LiquidGlass as="button" className="manage__danger" onClick={() => removeChapter(c)}>
                  Delete
                </LiquidGlass>
              </span>
            </div>
          </LiquidGlass>
        ))}

        <div className="manage__row-head">
          <h3>Quizzes</h3>
          <MetallicBlueButton onClick={() => setQuizModal({ id: null })} disabled={detail.chapters.length === 0}>
            + New quiz
          </MetallicBlueButton>
        </div>

        {detail.chapters.length === 0 ? (
          <p className="manage__note">Add a chapter first: every quiz covers at least one chapter.</p>
        ) : quizzes.length === 0 ? (
          <p className="manage__note">No quizzes yet.</p>
        ) : (
          <div className="manage__quiz-grid">
            {quizzes.map((q) => (
              <QuizCard
                key={q.id}
                quiz={q}
                footer={
                  <>
                    <MetallicBlueButton onClick={() => setQuizModal({ id: q.id })}>Edit</MetallicBlueButton>
                    <LiquidGlass as="button" className="manage__danger" onClick={() => setQuizToDelete(q)}>
                      Delete
                    </LiquidGlass>
                  </>
                }
              />
            ))}
          </div>
        )}

        {chapterModal && (
          <ChapterModal
            subjectId={detail.id}
            chapterId={chapterModal.id}
            nextNo={nextNo}
            onClose={() => setChapterModal(null)}
            onSaved={() => {
              setChapterModal(null);
              refreshDetail(detail.id);
            }}
          />
        )}

        {quizModal && (
          <QuizEditorModal
            key={quizModal.id ?? "new"}
            subjectId={detail.id}
            chapters={detail.chapters}
            quizId={quizModal.id}
            onClose={() => setQuizModal(null)}
            onSaved={() => {
              setQuizModal(null);
              refreshDetail(detail.id);
            }}
          />
        )}

        {quizToDelete && (
          <ConfirmModal
            title="Delete this quiz?"
            message={
              quizToDelete.attemptCount > 0
                ? `"${quizToDelete.title}" will be permanently deleted, together with ${quizToDelete.attemptCount} student record(s). Their subject progress will change. This can't be undone.`
                : `"${quizToDelete.title}" will be permanently deleted. This can't be undone.`
            }
            confirmLabel="Delete"
            danger
            busy={deletingQuiz}
            error={deleteQuizError}
            onConfirm={confirmDeleteQuiz}
            onCancel={closeDeleteQuiz}
          />
        )}
      </div>
    );
  }

  /* ----- subject list ----- */
  return (
    <div className="manage">
      <div className="manage__row-head">
        <h2 className="manage__heading">My Subjects</h2>
        <MetallicBlueButton onClick={() => setCreating(true)}>+ New subject</MetallicBlueButton>
      </div>

      {error && <p className="manage__error">{error}</p>}
      {loading ? (
        <p className="manage__note">Loading subjects…</p>
      ) : subjects.length === 0 ? (
        <p className="manage__note">You haven't created any subjects yet.</p>
      ) : (
        <div className="manage__grid">
          {subjects.map((s) => (
            <SubjectCard
              key={s.id}
              title={s.title}
              description={s.description}
              mediaUrl={s.mediaUrl}
              studentCount={s.studentCount}
              badge={s.visibility === "PRIVATE" ? `Private · ${s.code}` : "Public"}
              actions={
                <>
                  <MetallicBlueButton onClick={() => openSubject(s.id)}>Edit</MetallicBlueButton>
                  <LiquidGlass as="button" className="manage__danger" onClick={() => removeSubject(s)}>
                    Delete
                  </LiquidGlass>
                </>
              }
            />
          ))}
        </div>
      )}

      {creating && (
        <Modal title="New subject" onClose={() => setCreating(false)}>
          <SubjectForm
            initial={{ title: "", description: "", mediaUrl: "", visibility: "PUBLIC" }}
            submitLabel="Create subject"
            onSubmit={async (v) => {
              await manageApi.createSubject(v);
              setCreating(false);
              await loadList();
            }}
          />
        </Modal>
      )}
    </div>
  );
}