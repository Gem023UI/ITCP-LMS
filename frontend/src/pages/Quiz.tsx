import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import { ApiError } from "../services/authApi";
import { quizApi, type QuizPayload, type QuizResult } from "../services/learningApi";
import "../styles/Quiz.css";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

export default function Quiz() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const [quiz, setQuiz] = React.useState<QuizPayload | null>(null);
  const [result, setResult] = React.useState<QuizResult | null>(null);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!quizId) return;
    let cancelled = false;
    quizApi
      .get(quizId)
      .then(({ quiz }) => {
        if (cancelled) return;
        setQuiz(quiz);
        setResult(quiz.result);
      })
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof ApiError && e.status === 401) navigate("/auth");
        else setError(e.message);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [quizId, navigate]);

  const goBack = () => navigate("/quizzes");

  const allAnswered =
    !!quiz && quiz.questions.every((q) => (answers[q.questionNo] ?? "").trim() !== "");

  const submit = async () => {
    if (!quiz || !quizId || !allAnswered) return;
    if (!window.confirm("You only get one attempt at this quiz. Submit your answers?")) return;
    setSubmitting(true);
    setError(null);
    try {
      const { result } = await quizApi.submit(
        quizId,
        quiz.questions.map((q) => ({ questionNo: q.questionNo, answer: answers[q.questionNo] })),
      );
      setResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="quiz quiz--center">Loading quiz…</div>;
  if (!quiz)
    return (
      <div className="quiz quiz--center">
        <p>{error ?? "Quiz not found."}</p>
        <LiquidGlass as="button" onClick={goBack}>
          Back to Quizzes
        </LiquidGlass>
      </div>
    );

  const covers = quiz.chapters.length
    ? `Covers ${quiz.chapters.map((c) => `Ch ${c.chapterNo}`).join(", ")}`
    : null;

  if (result) {
    return (
      <div className="quiz">
        <div className="quiz__inner">
          <h1 className="quiz__title">{quiz.title}</h1>
          {covers && <p className="quiz__note">{covers}</p>}
          <div className="quiz__score">
            {result.score} / {result.total}
          </div>
          {result.isLate && <p className="quiz__note">Submitted after the deadline (marked late).</p>}
          {result.items.map((item) => {
            const q = quiz.questions.find((x) => x.questionNo === item.questionNo);
            return (
              <LiquidGlass
                key={item.questionNo}
                className={`quiz__card ${item.correct ? "is-correct" : "is-wrong"}`}
              >
                <div className="quiz__card-body">
                  <p className="quiz__q">
                    {item.questionNo}. {q?.question}
                  </p>
                  <p>Your answer: {item.yourAnswer || "—"}</p>
                  {!item.correct && <p>Correct answer: {item.correctAnswer}</p>}
                </div>
              </LiquidGlass>
            );
          })}
          <MetallicBlueButton onClick={goBack}>Back to Quizzes</MetallicBlueButton>
        </div>
      </div>
    );
  }

  if (quiz.closed) {
    return (
      <div className="quiz">
        <div className="quiz__inner">
          <h1 className="quiz__title">{quiz.title}</h1>
          {covers && <p className="quiz__note">{covers}</p>}
          <LiquidGlass className="quiz__card is-wrong">
            <div className="quiz__card-body">
              <p className="quiz__q">This quiz is closed.</p>
              <p>
                The deadline was {quiz.deadline && fmt(quiz.deadline)}, and late submissions aren't
                accepted.
              </p>
            </div>
          </LiquidGlass>
          <MetallicBlueButton onClick={goBack}>Back to Quizzes</MetallicBlueButton>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__inner">
        <h1 className="quiz__title">{quiz.title}</h1>
        {covers && <p className="quiz__note">{covers}</p>}
        {quiz.deadline && (
          <p className="quiz__note">
            Due {fmt(quiz.deadline)} ·{" "}
            {quiz.deadlineMode === "STRICT"
              ? "no submissions after the deadline"
              : "late submissions are accepted and marked late"}
          </p>
        )}
        {quiz.questions.map((q) => (
          <LiquidGlass key={q.questionNo} className="quiz__card">
            <div className="quiz__card-body">
              <p className="quiz__q">
                {q.questionNo}. {q.question}
              </p>

              {q.type === "multiple_choice" ? (
                <div className="quiz__choices">
                  {q.choices.map((choice) => (
                    <LiquidGlass
                      as="button"
                      key={choice}
                      className={`quiz__choice${answers[q.questionNo] === choice ? " is-selected" : ""}`}
                      onClick={() => setAnswers((a) => ({ ...a, [q.questionNo]: choice }))}
                    >
                      {choice}
                    </LiquidGlass>
                  ))}
                </div>
              ) : (
                <input
                  className="quiz__input"
                  value={answers[q.questionNo] ?? ""}
                  placeholder="TYPE YOUR ANSWER IN ALL CAPS"
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [q.questionNo]: e.target.value.toUpperCase() }))
                  }
                />
              )}
            </div>
          </LiquidGlass>
        ))}

        {error && <p className="quiz__error">{error}</p>}
        <MetallicBlueButton disabled={!allAnswered || submitting} onClick={submit}>
          {submitting ? "Submitting…" : "Submit Quiz"}
        </MetallicBlueButton>
      </div>
    </div>
  );
}
