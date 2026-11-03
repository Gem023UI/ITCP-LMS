import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import type { QuizCardData, StudentQuizCard } from "../services/learningApi";
import "./QuizCard.css";

export type QuizCardQuiz = QuizCardData & Partial<Pick<StudentQuizCard, "taken" | "result" | "closed">>;

export interface QuizCardProps {
  quiz: QuizCardQuiz;
  className?: string;
  /** open the quiz; leave out (or pass undefined) to make the card non-clickable */
  onOpen?: () => void;
  /** extra content under the card body, e.g. the teacher's Edit / Delete buttons */
  footer?: React.ReactNode;
}

const MAX_CHAPTERS = 3;

export const formatDeadline = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function QuizCard({ quiz, className, onOpen, footer }: QuizCardProps) {
  const { deadline, deadlineMode, chapters } = quiz;
  const overdue = !!deadline && new Date(deadline) <= new Date();
  const defaultTitle = `${quiz.subjectTitle} Quiz ${quiz.quizNo}`;

  // status badge (student side)
  let badge: { text: string; tone: "ok" | "warn" | "bad" } | null = null;
  if (quiz.taken && quiz.result) {
    badge = {
      text: `${quiz.result.isLate ? "Taken late" : "Taken"} · ${quiz.result.score}/${quiz.result.total}`,
      tone: "ok",
    };
  } else if (quiz.closed) {
    badge = { text: "Closed", tone: "bad" };
  } else if (overdue && deadlineMode === "LATE") {
    badge = { text: "Late allowed", tone: "warn" };
  }

  const clickable = !!onOpen;
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.();
    }
  };

  return (
    <LiquidGlass
      className={["quiz-card", clickable ? "is-clickable" : "", className].filter(Boolean).join(" ")}
      role={clickable ? "link" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `Open ${quiz.title}` : undefined}
      onClick={onOpen}
      onKeyDown={clickable ? onKeyDown : undefined}
    >
      <div className="quiz-card__inner">
        <div className="quiz-card__head">
          <h3 className="quiz-card__title">{quiz.title}</h3>
          {badge && <span className={`quiz-card__badge is-${badge.tone}`}>{badge.text}</span>}
        </div>
        {quiz.title !== defaultTitle && (
          <p className="quiz-card__subject">
            {quiz.subjectTitle} · Quiz {quiz.quizNo}
          </p>
        )}

        <div className="quiz-card__covers">
          <span className="quiz-card__label">Covers</span>
          {chapters.length ? (
            <ul>
              {chapters.slice(0, MAX_CHAPTERS).map((c) => (
                <li key={c.id}>
                  <b>Ch {c.chapterNo}</b> {c.title}
                </li>
              ))}
              {chapters.length > MAX_CHAPTERS && <li>+{chapters.length - MAX_CHAPTERS} more</li>}
            </ul>
          ) : (
            <p className="quiz-card__none">No chapters</p>
          )}
        </div>

        <div className="quiz-card__meta">
          <span>{deadline ? `Due ${formatDeadline(deadline)}` : "No deadline"}</span>
          {deadline && <span>{deadlineMode === "STRICT" ? "Strict" : "Late allowed"}</span>}
        </div>

        {footer && (
          <div
            className="quiz-card__footer"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {footer}
          </div>
        )}
      </div>
    </LiquidGlass>
  );
}
