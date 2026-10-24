import * as React from "react";
import ChapterCard from "./ChapterCard";
import { CARD_W, CARD_H } from "../data/chaptercardsize";
import type { ChapterCardData } from "../data/chapters";
import "./ChapterCarousel.css";

const GAP = 56;
const STEP = CARD_W + GAP;
const SIDE_SCALE = 0.72;
const DRAG_THRESHOLD = 6;
const RUBBER = 0.35;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function rubber(raw: number, count: number) {
  const max = Math.max(0, count - 1);
  if (raw < 0) return raw * RUBBER;
  if (raw > max) return max + (raw - max) * RUBBER;
  return raw;
}

interface ChapterCarouselProps {
  cards: ChapterCardData[];
  /** Card hidden in the track while its "hero" copy is travelling */
  hiddenId?: string | null;
  disabled?: boolean;
  onSelect: (card: ChapterCardData, rect: DOMRect) => void;
}

export default function ChapterCarousel({
  cards,
  hiddenId = null,
  disabled = false,
  onSelect,
}: ChapterCarouselProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const countRef = React.useRef(cards.length);
  const disabledRef = React.useRef(disabled);
  countRef.current = cards.length;
  disabledRef.current = disabled;

  const st = React.useRef({
    pos: 0,
    target: 0,
    vel: 0,
    pressing: false,
    dragging: false,
    moved: false,
    startX: 0,
    startPos: 0,
    lastX: 0,
    lastT: 0,
    raf: 0,
    lastFrame: 0,
  });

  const paint = React.useCallback(() => {
    const { pos } = st.current;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = i - pos;
      const a = Math.min(Math.abs(d), 1);
      const scale = 1 - (1 - SIDE_SCALE) * a;
      el.style.transform = `translate3d(${(d * STEP).toFixed(2)}px,0,0) scale(${scale.toFixed(4)})`;
      el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
    });
  }, []);

  const tick = React.useCallback(
    (now: number) => {
      const s = st.current;
      s.raf = 0;
      const dt = Math.min(0.05, (now - s.lastFrame) / 1000 || 0.016);
      s.lastFrame = now;
      if (!s.dragging) {
        const diff = s.target - s.pos;
        if (Math.abs(diff) < 0.0008) s.pos = s.target;
        else s.pos += diff * (1 - Math.exp(-dt * 9));
      }
      paint();
      if (s.dragging || s.pos !== s.target) s.raf = requestAnimationFrame(tick);
    },
    [paint],
  );

  const wake = React.useCallback(() => {
    const s = st.current;
    if (s.raf) return;
    s.lastFrame = performance.now();
    s.raf = requestAnimationFrame(tick);
  }, [tick]);

  React.useLayoutEffect(() => {
    const s = st.current;
    const max = Math.max(0, cards.length - 1);
    s.target = clamp(Math.round(s.target), 0, max);
    s.pos = clamp(s.pos, 0, max);
    paint();
  }, [cards.length, paint]);

  React.useEffect(() => {
    const s = st.current;
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabledRef.current || e.button !== 0) return;
    const s = st.current;
    s.pressing = true;
    s.moved = false;
    s.startX = e.clientX;
    s.startPos = s.pos;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.vel = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.pressing) return;
    const dx = e.clientX - s.startX;
    if (!s.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      s.moved = true;
      s.dragging = true;
      rootRef.current?.setPointerCapture(e.pointerId);
      rootRef.current?.classList.add("is-dragging");
    }
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT) / 1000;
    s.vel = s.vel * 0.7 + (-((e.clientX - s.lastX) / STEP) / dt) * 0.3;
    s.lastX = e.clientX;
    s.lastT = now;
    s.pos = rubber(s.startPos - dx / STEP, countRef.current);
    wake();
  };

  const release = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.pressing) return;
    s.pressing = false;
    if (!s.moved) return;
    s.dragging = false;
    rootRef.current?.classList.remove("is-dragging");
    try {
      rootRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    const vel = performance.now() - s.lastT > 80 ? 0 : clamp(s.vel, -6, 6);
    s.target = clamp(Math.round(s.pos + vel * 0.18), 0, Math.max(0, countRef.current - 1));
    wake();
  };

  const select = (i: number) => {
    const el = itemRefs.current[i];
    if (!el || disabledRef.current) return;
    onSelect(cards[i], el.getBoundingClientRect());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabledRef.current) return;
    const s = st.current;
    const max = Math.max(0, countRef.current - 1);
    if (e.key === "ArrowRight") s.target = clamp(Math.round(s.target) + 1, 0, max);
    else if (e.key === "ArrowLeft") s.target = clamp(Math.round(s.target) - 1, 0, max);
    else if (e.key === "Enter") select(Math.round(s.pos));
    else return;
    e.preventDefault();
    wake();
  };

  return (
    <div
      ref={rootRef}
      className="chapter-carousel"
      tabIndex={0}
      role="listbox"
      aria-label="Chapters"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onKeyDown={onKeyDown}
      onClickCapture={(e) => {
        if (st.current.moved) {
          e.stopPropagation();
          e.preventDefault();
          st.current.moved = false;
        }
      }}
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          data-chapter-id={card.id}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={`chapter-carousel__item${hiddenId === card.id ? " is-hidden" : ""}`}
          style={{ width: CARD_W, height: CARD_H, marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2 }}
          onClick={() => select(i)}
        >
          <ChapterCard data={card} />
        </div>
      ))}
    </div>
  );
}