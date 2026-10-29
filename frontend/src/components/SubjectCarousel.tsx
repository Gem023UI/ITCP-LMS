import * as React from "react";
import SubjectCard from "./SubjectCard";
import LiquidGlass from "./LiquidGlass";
import type { MySubject } from "../services/learningApi";
import "./SubjectCarousel.css";

const DRAG_THRESHOLD = 6;

interface SubjectCarouselProps {
  subjects: MySubject[];
  onLearn: (subject: MySubject) => void;
}

export default function SubjectCarousel({ subjects, onLearn }: SubjectCarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    d.moved = true;
    el.classList.add("is-dragging");
    el.scrollLeft = d.startLeft - dx;
  };

  const end = () => {
    drag.current.down = false;
    trackRef.current?.classList.remove("is-dragging");
  };

  const nudge = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <div className="subject-carousel">
      <LiquidGlass
        as="button"
        className="subject-carousel__nav subject-carousel__nav--prev"
        aria-label="Previous subjects"
        onClick={() => nudge(-1)}
      >
        ‹
      </LiquidGlass>

      <div
        ref={trackRef}
        className="subject-carousel__track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerLeave={end}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.stopPropagation();
            e.preventDefault();
            drag.current.moved = false;
          }
        }}
      >
        {subjects.map((s) => (
          <SubjectCard
            key={s.id}
            title={s.title}
            description={s.description}
            mediaUrl={s.mediaUrl}
            studentCount={s.studentCount}
            actionLabel="Learn Today"
            onAction={() => onLearn(s)}
          />
        ))}
      </div>

      <LiquidGlass
        as="button"
        className="subject-carousel__nav subject-carousel__nav--next"
        aria-label="Next subjects"
        onClick={() => nudge(1)}
      >
        ›
      </LiquidGlass>
    </div>
  );
}