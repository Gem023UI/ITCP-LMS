import Reveal from "./Reveal";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import { toRoman } from "../data/chapters";
import type { CloudComputingChapter } from "../types/modules";
import "./ChapterDetails.css";

interface ChapterDetailsProps {
  chapter: CloudComputingChapter;
  chapterNo: number;
  /** true while the close transition runs: fades the whole panel out */
  leaving: boolean;
  onClose: () => void;
  onProceed?: () => void;
  onQuiz?: () => void;
}

export default function ChapterDetails({
  chapter,
  chapterNo,
  leaving,
  onClose,
  onProceed,
  onQuiz,
}: ChapterDetailsProps) {
  const terms = chapter.keyTerms.slice(0, 4).map((k) => k.word);
  const keyTerms = terms.length ? `${terms.join(", ")}${chapter.keyTerms.length > 4 ? ", etc.." : ""}` : "";
  const duration = chapter.durationMinutes;

  return (
    <div className={`chapter-details${leaving ? " is-leaving" : ""}`}>
      <Reveal delay={500} className="chapter-details__close-wrap">
        <button type="button" className="chapter-details__close" aria-label="Close chapter details" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </Reveal>

      <Reveal as="h2" className="chapter-details__title" delay={250}>
        Chapter {toRoman(chapterNo)}. {chapter.title}
      </Reveal>

      <Reveal as="p" className="chapter-details__desc" delay={350}>
        {chapter.description}
      </Reveal>

      <Reveal as="ul" className="chapter-details__meta" delay={450}>
        <li>Sub-Topics: {chapter.sections.length} Sections</li>
        {typeof duration === "number" && <li>Duration: {duration} Minutes</li>}
        {keyTerms && <li>Key Terms: {keyTerms}</li>}
      </Reveal>

      <div className="chapter-details__actions">
        <Reveal delay={600}>
          <span className="chapter-details__btnwrap">
            <MetallicBlueButton className="chapter-details__btn" onClick={onProceed}>
              Proceed to Lesson
            </MetallicBlueButton>
          </span>
        </Reveal>
        <Reveal delay={700}>
          <span className="chapter-details__btnwrap">
            <LiquidGlass as="button" className="chapter-details__btn" onClick={onQuiz}>
              Quiz Time!
            </LiquidGlass>
          </span>
        </Reveal>
      </div>
    </div>
  );
}