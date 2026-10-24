import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import MetallicBlueButton from "../components/MetallicBlueButton";
import LiquidGlass from "../components/LiquidGlass";
import { getChapterCards, toRoman } from "../data/chapters";
import "../styles/Lessons.css";

export default function Lessons() {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  // "lesson01" -> 1
  const chapterNo = Number(lessonId?.match(/^lesson(\d+)$/i)?.[1]);
  const card = React.useMemo(
    () => getChapterCards().find((c) => c.chapterNo === chapterNo),
    [chapterNo],
  );
  const chapter = card?.chapter;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  const goBack = React.useCallback(() => navigate("/chapters"), [navigate]);
  const onQuiz = () => console.log("Quiz", lessonId);

  const update = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const pct = max <= 0 ? 100 : (el.scrollTop / max) * 100;
    setProgress(Math.min(100, Math.max(0, Math.round(pct))));
  }, []);

  React.useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, chapter]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && goBack();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goBack]);

  if (!chapter) {
    return (
      <div className="lessons" style={{ placeItems: "center", display: "grid" }}>
        <p>
          Lesson not found. <a href="/chapters" onClick={(e) => { e.preventDefault(); goBack(); }}>Back to chapters</a>
        </p>
      </div>
    );
  }

  return (
    <div className="lessons">
      <div className="lessons__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="lessons__track">
          <div className="lessons__fill" style={{ width: `${progress}%` }} />
          <span className="lessons__dot lessons__dot--start" />
          <span className="lessons__dot" style={{ left: `${progress}%` }} />
        </div>
        <span className="lessons__pct">{progress}%</span>
      </div>

      <div className="lessons__body">
        <div ref={scrollRef} className="lessons__details" onScroll={update}>
          <h1 className="lessons__title">
            Chapter {toRoman(chapterNo)}. {chapter.title}
          </h1>

          <ul className="lessons__objectives">
            {chapter.objectives.map((o, i) => (
              <li key={i}>{o.objective}</li>
            ))}
          </ul>

          {chapter.sections.map((s) => (
            <section key={s.sectionNo} className="lessons__section">
              <h2 className="lessons__section-title">{s.header}</h2>
              {s.imageUrl.map((img, i) => (
                <figure key={i} className="lessons__figure">
                  <img src={img.url} alt={s.header} loading="lazy" />
                  {s.imageSource[i]?.source && (
                    <figcaption>{s.imageSource[i].source}</figcaption>
                  )}
                </figure>
              ))}
              {s.content.map((c, i) => (
                <p key={i} className="lessons__para">
                  {c.paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="lessons__cta">
            <MetallicBlueButton className="lessons__cta-btn" onClick={onQuiz}>
              Learned Enough? Take on the Quiz!
            </MetallicBlueButton>
            <LiquidGlass as="button" className="lessons__cta-btn" onClick={goBack}>
              Next Lesson
            </LiquidGlass>
          </div>
        </div>

        <aside className="lessons__materials">
          <Reveal className="lessons__material" delay={200}>
            <iframe
              src={chapter.videoUrl}
              title={`${chapter.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Reveal>
          <Reveal className="lessons__material" delay={400}>
            <iframe src={chapter.slideUrl} title={`${chapter.title} slides`} allowFullScreen />
          </Reveal>
        </aside>
      </div>
    </div>
  );
}