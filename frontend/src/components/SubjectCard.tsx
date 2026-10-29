import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import "./SubjectCard.css";

const YT_RE =
  /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([\w-]{11})/;

export const youTubeId = (url: string) => url.match(YT_RE)?.[1] ?? null;

export interface SubjectCardProps {
  title: string;
  description: string;
  /** direct video file URL or a YouTube link/embed link */
  mediaUrl: string;
  studentCount: number;
  actionLabel?: string;
  busy?: boolean;
  className?: string;
  badge?: string;
  /** replaces the default single button (e.g. Edit / Delete) */
  actions?: React.ReactNode;
  onAction?: () => void;
}

export default function SubjectCard({
  title,
  description,
  mediaUrl,
  studentCount,
  actionLabel = "Learn Today",
  busy = false,
  className,
  badge,
  actions,
  onAction,
}: SubjectCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = React.useState(false);
  const yt = React.useMemo(() => youTubeId(mediaUrl), [mediaUrl]);

  const play = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {
      /* autoplay blocked or interrupted */
    });
  };
  const stop = () => {
    setHovered(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <LiquidGlass
      className={["subject-card", className].filter(Boolean).join(" ")}
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <div className="subject-card__inner">
        {badge && <span className="subject-card__badge">{badge}</span>}

        {yt ? (
          <div className="subject-card__media subject-card__media--yt">
            {hovered ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=1&controls=0&loop=1&playlist=${yt}&playsinline=1&modestbranding=1`}
                title={title}
                allow="autoplay; encrypted-media"
                tabIndex={-1}
              />
            ) : (
              <img src={`https://img.youtube.com/vi/${yt}/hqdefault.jpg`} alt="" loading="lazy" />
            )}
          </div>
        ) : (
          <video
            ref={videoRef}
            className="subject-card__media"
            src={mediaUrl}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        <div className="subject-card__body">
          <h3 className="subject-card__title">{title}</h3>
          <p className="subject-card__desc">{description}</p>
          <span className="subject-card__count">
            <strong>{studentCount}</strong> currently taking students
          </span>
          {actions ? (
            <div className="subject-card__actions">{actions}</div>
          ) : (
            <MetallicBlueButton className="subject-card__btn" disabled={busy} onClick={onAction}>
              {actionLabel}
            </MetallicBlueButton>
          )}
        </div>
      </div>
    </LiquidGlass>
  );
}