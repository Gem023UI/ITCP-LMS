import * as React from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Home01Icon,
  Mail01Icon,
  MusicNote03Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import Dock from "../components/Dock";
import ShapeGrid from "../components/ShapeGrid";
import ChapterCarousel from "../components/ChapterCarousel";
import ChapterCard from "../components/ChapterCard";
import ChapterDetails from "../components/ChapterDetails";
import { CARD_W, CARD_H } from "../data/chaptercardsize";
import { getChapterCards, type ChapterCardData } from "../data/chapters";
import "../styles/Chapters.css";

type Phase = "carousel" | "opening" | "details" | "closing";
type Pose = { x: number; y: number; s: number; animate: boolean };

const MOVE_MS = 800; // card travel (carousel <-> left side)
const SHOW_BACK_MS = 700; // card flips to the back (description), then settles front-facing
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const glyph = (icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]) => (
  <HugeiconsIcon icon={icon} size="1em" strokeWidth={1.8} />
);

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

  const dockItems = React.useMemo(
    () => [
      {
        icon: glyph(Home01Icon),
        label: "Home",
        active: true,
        onClick: () => navigate("/"),
        menu: [
          { label: "New Window", onClick: () => console.log("New Window") },
          { separator: true },
          { label: "Options", items: [{ label: "Open at Login", checked: true }, { label: "Show in Finder" }] },
          { separator: true },
          { label: "Quit", onClick: () => console.log("Quit") },
        ],
      },
      { icon: glyph(Mail01Icon), label: "Mail", badge: 3, onClick: () => console.log("Mail") },
      { icon: glyph(MusicNote03Icon), label: "Music", active: true, onClick: () => console.log("Music") },
      { icon: glyph(Settings01Icon), label: "Settings", onClick: () => console.log("Settings") },
      { separator: true },
      { icon: glyph(Delete02Icon), label: "Trash", onClick: () => console.log("Trash") },
    ],
    [navigate],
  );

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
    <div className="chapters">
      <div className="chapters__bg" aria-hidden="true">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#2a2734"
            hoverColor="#ffffff"
            hoverFillColor="#ffffff"
            fillOpacity={0.15}
            cellSize={40}
            speed={0.5}
            tiltX={0}
            tiltY={0}
            rainbow={false}
            lineWidth={1}
            radius={1.5}
            trail={0.6}
            glow={0.35}
            twinkle={0}
            fade={1}
            clickCascade
            intro
          />
        </div>
      </div>

      <div className="chapters__dock">
        <Dock
          items={dockItems}
          baseItemSize={50}
          magnification={70}
          panelHeight={68}
          accentColor="#0a84ff"
          badgeColor="#ff453a"
          position="left"
          distance={200}
          gap={10}
          roundness={0.4}
          bounce
          autoHide
          tiles
          showLabels
          showIndicators={false}
          showBadges
        />
      </div>

      <div ref={stageRef} className={`chapters__stage${away ? " is-away" : ""}`}>
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
            onProceed={() => console.log("Proceed to lesson", selected.id)}
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