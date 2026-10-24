import TiltedCard, { TiltedCardLayer } from "./TiltedCard";
import type { ChapterCardData } from "../data/chapters";
import { CARD_W, CARD_H } from "../data/chaptercardsize";
import "./ChapterCard.css";

interface ChapterCardProps {
  data: ChapterCardData;
  flipped?: boolean;
  intro?: boolean;
  /** Play button clicked: opens the chapter details */
  onPlay?: () => void;
}

export default function ChapterCard({ data, flipped = false, intro = true, onPlay }: ChapterCardProps) {
  return (
    <TiltedCard
      imageSrc={data.image}
      altText={`Chapter ${data.chapterNo}: ${data.title}`}
      containerWidth={CARD_W}
      containerHeight={CARD_H}
      imageWidth={CARD_W}
      imageHeight={CARD_H}
      radius={22}
      rotateAmplitude={10}
      scaleOnHover={1.04}
      glare={0.45}
      shadow={0.5}
      showTooltip={false}
      gyroscope={false}
      intro={intro}
      flipped={flipped}
      flipOnClick={false}
      backContent={
        <div className="chapter-card__back">
          <span className="chapter-card__back-no">Chapter {data.chapterNo}</span>
          <h4 className="chapter-card__back-title">{data.title}</h4>
          <p className="chapter-card__back-desc">{data.description}</p>
        </div>
      }
    >
      <TiltedCardLayer depth={24} className="chapter-card__layer">
        <div className="chapter-card__shade" />
        <div className="chapter-card__meta">
          <h3 className="chapter-card__title">{data.title}</h3>
          <p className="chapter-card__no">Chapter {data.chapterNo}</p>
        </div>
        <button
          type="button"
          className="chapter-card__play"
          aria-label={`Open chapter ${data.chapterNo} details`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
      </TiltedCardLayer>
    </TiltedCard>
  );
}