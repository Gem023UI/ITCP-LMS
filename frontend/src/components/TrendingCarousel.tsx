import * as React from "react";
import ArticleCard from "./ArticleCard";
import { authorName, type ArticleSummary } from "../services/articleApi";
import "./TrendingCarousel.css";

interface Props {
  articles: ArticleSummary[];
  onOpen: (article: ArticleSummary) => void;
}

const DRAG_THRESHOLD = 5; // px of movement before a press becomes a drag
const FRICTION = 0.95; // per ~16ms frame; higher = longer glide
const MIN_VELOCITY = 0.02; // px/ms below which the glide stops

type DragState = {
  down: boolean;
  moved: boolean;
  suppressClick: boolean;
  startX: number;
  startScroll: number;
  pointerId: number;
  lastX: number;
  lastT: number;
  velocity: number; // px/ms, pointer direction
};

export default function TrendingCarousel({ articles, onOpen }: Props) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);
  const drag = React.useRef<DragState>({
    down: false,
    moved: false,
    suppressClick: false,
    startX: 0,
    startScroll: 0,
    pointerId: -1,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const [dragging, setDragging] = React.useState(false);

  const stopGlide = () => {
    cancelAnimationFrame(raf.current);
    raf.current = 0;
  };
  React.useEffect(() => stopGlide, []);

  // keeps moving after release, then slows down smoothly
  const glide = (initial: number) => {
    const el = trackRef.current;
    if (!el) return;
    let v = initial;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      const before = el.scrollLeft;
      el.scrollLeft = before - v * dt;
      v *= Math.pow(FRICTION, dt / 16);
      if (Math.abs(v) > MIN_VELOCITY && el.scrollLeft !== before) {
        raf.current = requestAnimationFrame(step);
      } else {
        raf.current = 0;
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  // mouse / pen only: touch already scrolls natively
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    stopGlide();
    drag.current = {
      down: true,
      moved: false,
      suppressClick: false,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      pointerId: e.pointerId,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.down || !el) return;

    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(d.pointerId); // only once it's a real drag, so plain clicks still reach the cards
    }
    el.scrollLeft = d.startScroll - dx;

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) {
      d.velocity = 0.7 * d.velocity + 0.3 * ((e.clientX - d.lastX) / dt); // smoothed
      d.lastX = e.clientX;
      d.lastT = now;
    }
  };

  const endDrag = () => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.down) return;
    d.down = false;
    if (!d.moved) return;

    if (el?.hasPointerCapture(d.pointerId)) el.releasePointerCapture(d.pointerId);
    setDragging(false);

    // the click that follows a drag must not open an article
    d.suppressClick = true;
    window.setTimeout(() => {
      d.suppressClick = false;
    }, 0);

    // held still before releasing = no glide
    const v = performance.now() - d.lastT > 80 ? 0 : d.velocity;
    if (Math.abs(v) > MIN_VELOCITY) glide(v);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (!drag.current.suppressClick) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current.suppressClick = false;
  };

  return (
    <div className="trending">
      <div
        ref={trackRef}
        className={`trending__track${dragging ? " is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={stopGlide}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        {articles.map((a) => (
          <ArticleCard
            key={a.id}
            className="article-card--slide"
            title={a.title}
            description={a.excerpt}
            coverUrl={a.coverImageUrl}
            author={authorName(a.author)}
            likes={a.likesCount}
            onOpen={() => onOpen(a)}
          />
        ))}
      </div>
    </div>
  );
}