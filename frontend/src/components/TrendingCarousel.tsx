import * as React from "react";
import ArticleCard from "./ArticleCard";
import type { Article } from "../data/articles";
import "./TrendingCarousel.css";

interface Props {
  articles: Article[];
  onOpen: (article: Article) => void;
}

export default function TrendingCarousel({ articles, onOpen }: Props) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const update = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, articles]);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="trending">
      <button
        type="button"
        className="trending__nav"
        aria-label="Previous articles"
        disabled={!canPrev}
        onClick={() => scrollBy(-1)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      <div className="trending__track" ref={trackRef} onScroll={update}>
        {articles.map((a) => (
          <ArticleCard
            key={a.id}
            className="article-card--slide"
            title={a.title}
            description={a.description}
            coverUrl={a.coverUrl}
            readMinutes={a.readMinutes}
            likes={a.likes}
            onOpen={() => onOpen(a)}
          />
        ))}
      </div>

      <button
        type="button"
        className="trending__nav"
        aria-label="Next articles"
        disabled={!canNext}
        onClick={() => scrollBy(1)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}