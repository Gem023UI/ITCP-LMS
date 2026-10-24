import * as React from "react";
import ChapterCarousel from "../components/ChapterCarousel";
import ChapterCard from "../components/ChapterCard";
import ChapterDetails from "../components/ChapterDetails";
import { CARD_W, CARD_H } from "../data/chaptercardsize";
import { getChapterCards, type ChapterCardData } from "../data/chapters";
import { useNavigate } from "react-router-dom";
import "../styles/Chapters.css";

type Phase = "carousel" | "opening" | "details" | "closing";
type Pose = { x: number; y: number; s: number; animate: boolean };

const MOVE_MS = 800; // card travel (carousel <-> left side)
const SHOW_BACK_MS = 700; // card flips to the back (description), then settles front-facing
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const poseFromRect = (r: DOMRect, animate: boolean): Pose => ({
  x: r.left,
  y: r.top,
  s: r.width / CARD_W,
  animate,
});

export default function Chapters() {
  const navigate = useNavigate();
  const cards = React.useMemo(() => getChapterCards(), []);

  const [phase, setPhase] = React.useState<Phase>("carousel");
  const [selected, setSelected] = React.useState<ChapterCardData | null>(null);
  const [pose, setPose] = React.useState<Pose | null>(null);
  const [flipped, setFlipped] = React.useState(false);

  const slotRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);

  const open = (card: ChapterCardData, rect: DOMRect) => {
    if (phase !== "carousel") return;
    setSelected(card);
    setPose(poseFromRect(rect, false));
    setFlipped(false);
    setPhase("opening");
  };

  // opening: measure the slot on the left, then fly + flip the hero card into it
  React.useLayoutEffect(() => {
    if (phase !== "opening" || !slotRef.current) return;
    const to = poseFromRect(slotRef.current.getBoundingClientRect(), true);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPose(to);
        setFlipped(true);
      });
    });
    const t1 = window.setTimeout(() => setFlipped(false), SHOW_BACK_MS);
    const t2 = window.setTimeout(() => setPhase("details"), MOVE_MS);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase]);

  // keep the hero glued to its slot if the window is resized
  React.useEffect(() => {
    if (phase !== "details") return;
    const onResize = () => {
      if (slotRef.current) setPose(poseFromRect(slotRef.current.getBoundingClientRect(), false));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [phase]);

  const close = React.useCallback(() => {
    if (phase !== "details" || !selected) return;
    const el = stageRef.current?.querySelector(`[data-chapter-id="${CSS.escape(selected.id)}"]`);
    setPhase("closing");
    setFlipped(false);
    if (el) setPose(poseFromRect(el.getBoundingClientRect(), true));
    window.setTimeout(() => {
      setSelected(null);
      setPose(null);
      setPhase("carousel");
    }, MOVE_MS);
  }, [phase, selected]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const away = phase === "opening" || phase === "details";

  return (
    <div className="chapters" style={{ background: "transparent" }}>
      <div
        ref={stageRef}
        className={`chapters__stage${away ? " is-away" : ""}`}
        style={{ position: "absolute", inset: 0, margin: 0, padding: 0 }}
      >
        {cards.length ? (
          <ChapterCarousel
            cards={cards}
            hiddenId={selected?.id ?? null}
            disabled={phase !== "carousel"}
            onSelect={open}
          />
        ) : (
          <p className="chapters__empty">No chapters available yet.</p>
        )}
      </div>

      {selected && (
        <div className="chapters__detail">
          <div ref={slotRef} className="chapters__slot" />
          <ChapterDetails
            chapter={selected.chapter}
            chapterNo={selected.chapterNo}
            leaving={phase === "closing"}
            onClose={close}
            onProceed={() =>
              navigate(`/chapters/lesson${String(selected.chapterNo).padStart(2, "0")}`)
            }
            onQuiz={() => console.log("Quiz", selected.id)}
          />
        </div>
      )}

      {selected && pose && (
        <div
          className="chapters__hero"
          style={{
            width: CARD_W,
            height: CARD_H,
            transform: `translate3d(${pose.x}px, ${pose.y}px, 0) scale(${pose.s})`,
            transition: pose.animate ? `transform ${MOVE_MS}ms ${EASE}` : "none",
            pointerEvents: phase === "details" ? "auto" : "none",
          }}
        >
          <ChapterCard data={selected} flipped={flipped} intro={false} />
        </div>
      )}
    </div>
  );
}