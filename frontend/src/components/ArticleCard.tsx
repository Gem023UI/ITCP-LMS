import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import "./ArticleCard.css";

export interface ArticleCardProps {
  title: string;
  description: string;
  coverUrl: string;
  readMinutes: number;
  likes: number;
  className?: string;
  onOpen?: () => void;
}

export default function ArticleCard({
  title,
  description,
  coverUrl,
  readMinutes,
  likes,
  className,
  onOpen,
}: ArticleCardProps) {
  const onKeyDown = (e: React.KeyboardEvent) => {
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
            <span>{readMinutes} MIN READ</span>
            <span>
              <strong>{likes.toLocaleString()}</strong> LIKES
            </span>
          </div>
        </div>
      </div>
    </LiquidGlass>
  );
}