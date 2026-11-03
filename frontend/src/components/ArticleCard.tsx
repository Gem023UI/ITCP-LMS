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
}

export default function ArticleCard({
  title,
  description,
  coverUrl,
  author,
  likes,
  className,
  onOpen,
  footer,
}: ArticleCardProps) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return; // keys pressed on the footer button are its own
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.();
    }
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
