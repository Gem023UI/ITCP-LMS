import * as React from "react";
import { monotonePath } from "./charts/Curve";
import "./SparklineCard.css";

export type SparkVariant = "area" | "line" | "bars";

interface Props {
  label: string;
  /** the big number */
  value: number;
  /** small text next to the number, e.g. "today" */
  note?: string;
  /** one value per day, oldest -> today */
  series: number[];
  /** YYYY-MM-DD for every value in `series` */
  days: string[];
  today: number;
  yesterday: number;
  variant: SparkVariant;
  color: string;
  height?: number;
}

const PAD = { l: 6, r: 6, t: 10, b: 8 };

/** "2026-11-03" -> "Tue, Nov 3" (parsed as a plain date, so the viewer's timezone can't shift it) */
const dayLabel = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

/** today vs yesterday */
function change(today: number, yesterday: number): { text: string; tone: "up" | "down" | "flat" } {
  if (yesterday === 0) return today === 0 ? { text: "0%", tone: "flat" } : { text: "New", tone: "up" };
  const pct = Math.round(((today - yesterday) / yesterday) * 100);
  return { text: `${Math.abs(pct)}%`, tone: pct > 0 ? "up" : pct < 0 ? "down" : "flat" };
}

export default function SparklineCard({
  label,
  value,
  note,
  series,
  days,
  today,
  yesterday,
  variant,
  color,
  height = 84,
}: Props) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [W, setW] = React.useState(280);
  const [active, setActive] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = (w: number) => setW(Math.max(120, Math.round(w)));
    if (el.clientWidth) measure(el.clientWidth);
    const ro = new ResizeObserver(([e]) => measure(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = series.length;
  const H = height;
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const baseline = PAD.t + plotH;
  const yMax = Math.max(1, ...series) * 1.1;
  const yOf = (v: number) => PAD.t + (1 - v / yMax) * plotH;
  const xOf = (i: number) => (n <= 1 ? PAD.l + plotW / 2 : PAD.l + (i / (n - 1)) * plotW);
  const slot = plotW / Math.max(1, n);

  const geo = React.useMemo(() => {
    const pts = series.map((v, i) => [xOf(i), yOf(v)] as [number, number]);
    const line = monotonePath(pts);
    const area =
      pts.length > 1 ? `${line}L${pts[pts.length - 1][0]},${baseline}L${pts[0][0]},${baseline}Z` : "";
    return { pts, line, area };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, W, H, yMax]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!n) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const raw = variant === "bars" ? Math.floor((x - PAD.l) / slot) : Math.round(((x - PAD.l) / plotW) * (n - 1));
    setActive(Math.min(n - 1, Math.max(0, raw)));
  };

  const delta = change(today, yesterday);
  const arrow = delta.tone === "up" ? "▲" : delta.tone === "down" ? "▼" : "–";
  const lastIdx = n - 1;
  const shown = active ?? lastIdx;
  const dayText =
    active == null
      ? `Today · ${days[lastIdx] ? dayLabel(days[lastIdx]) : ""}`
      : `${days[active] ? dayLabel(days[active]) : ""} · ${series[active].toLocaleString()}`;

  return (
    <div className="spark-card">
      <div className="spark-card__top">
        <span className="spark-card__label">{label}</span>
        <span className={`spark-card__delta is-${delta.tone}`} title="Today vs yesterday">
          {arrow} {delta.text}
        </span>
      </div>

      <div className="spark-card__value">
        <strong>{value.toLocaleString()}</strong>
        {note && <small>{note}</small>}
      </div>
      <div className="spark-card__day">{dayText}</div>

      <div className="spark-card__chart" ref={wrapRef}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${label}, last ${n} days`}
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {variant === "bars" &&
            series.map((v, i) => {
              const bw = Math.max(2, slot * 0.62);
              const h = v > 0 ? Math.max(3, baseline - yOf(v)) : 2;
              const highlighted = i === shown;
              return (
                <rect
                  key={i}
                  x={PAD.l + slot * i + (slot - bw) / 2}
                  y={baseline - h}
                  width={bw}
                  height={h}
                  rx={Math.min(3, bw / 2)}
                  fill={color}
                  opacity={v === 0 ? 0.22 : highlighted ? 1 : 0.55}
                />
              );
            })}

          {variant !== "bars" && (
            <>
              {variant === "area" && geo.area && <path d={geo.area} fill={`url(#${uid}-g)`} />}
              {geo.line && (
                <path d={geo.line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
              )}
              {n === 1 && <circle cx={geo.pts[0][0]} cy={geo.pts[0][1]} r="4" fill={color} />}

              {/* line with end dot: the last point always carries the dot */}
              {variant === "line" && n > 1 && (
                <>
                  <circle cx={geo.pts[lastIdx][0]} cy={geo.pts[lastIdx][1]} r="9" fill={color} opacity="0.22" />
                  <circle cx={geo.pts[lastIdx][0]} cy={geo.pts[lastIdx][1]} r="4.5" fill={color} />
                </>
              )}

              {/* hover: guide line + dot */}
              {active != null && geo.pts[active] && (
                <g pointerEvents="none">
                  <line
                    x1={geo.pts[active][0]}
                    x2={geo.pts[active][0]}
                    y1={PAD.t - 4}
                    y2={baseline}
                    className="spark-card__guide"
                  />
                  <circle cx={geo.pts[active][0]} cy={geo.pts[active][1]} r="4.5" fill={color} />
                </g>
              )}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}