import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import "./ArticleCard.css";

export interface ArticleCardProps {
  title: string;
  description: string;
  coverUrl: string;
  author: string;
  likes: number;
  className?: string;
  onOpen?: () => void;
  /** extra content at the bottom of the card, e.g. a delete button. Clicking it never opens the article */
  footer?: React.ReactNode;
  /** the current user liked this article: the heart is filled red */
  liked?: boolean;
  /** false (e.g. an admin) = the heart is shown but can't be clicked */
  canLike?: boolean;
  onToggleLike?: () => void;
}

const stop = (e: React.SyntheticEvent) => e.stopPropagation();

export default function ArticleCard({
  title,
  description,
  coverUrl,
  author,
  likes,
  className,
  onOpen,
  footer,
  liked = false,
  canLike = false,
  onToggleLike,
}: ArticleCardProps) {
  const [pop, setPop] = React.useState(false);
  const interactive = canLike && !!onToggleLike;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return; // keys pressed on the footer / heart button are their own
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.();
    }
  };

  // never opens the article (click) and never starts a carousel drag (pointer down)
  const onHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!interactive) return;
    if (!liked) setPop(true); // pop animation only when liking
    onToggleLike?.();
  };

  return (
    <LiquidGlass
      className={["article-card", className].filter(Boolean).join(" ")}
      role="link"
      tabIndex={0}
      aria-label={`Read ${title}`}
      onClick={onOpen}
      onKeyDown={onKeyDown}
    >
      <div className="article-card__inner">
        <img className="article-card__media" src={coverUrl} alt="" loading="lazy" />

        <button
          type="button"
          className={[
            "article-card__heart",
            liked ? "is-liked" : "",
            pop ? "is-pop" : "",
            interactive ? "" : "is-readonly",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={interactive ? (liked ? "Unlike this article" : "Like this article") : "Likes"}
          aria-pressed={interactive ? liked : undefined}
          tabIndex={interactive ? 0 : -1}
          onPointerDown={stop}
          onClick={onHeartClick}
          onAnimationEnd={() => setPop(false)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <div className="article-card__body">
          <h3 className="article-card__title">{title}</h3>
          <p className="article-card__desc">{description}</p>
          <div className="article-card__meta">
            <span>{author}</span>
            <span>
              <strong>{(likes ?? 0).toLocaleString()}</strong> LIKES
            </span>
          </div>
          {footer && (
            <div
              className="article-card__footer"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </LiquidGlass>
  );
}