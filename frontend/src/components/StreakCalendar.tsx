import * as React from "react";
import "./StreakCalendar.css";

type Cell = { date: string; day: number; count: number; future: boolean } | null;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // rows are Sun..Sat
const DAY_MS = 86_400_000;

const pad = (n: number) => String(n).padStart(2, "0");
const parse = (d: string) => new Date(`${d}T00:00:00Z`);
const addDays = (d: string, n: number) =>
  new Date(parse(d).getTime() + n * DAY_MS).toISOString().slice(0, 10);

const levelOf = (n: number) => (n <= 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4);

const prettyDate = (d: string) =>
  parse(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

type View = { y: number; m: number }; // m is 0-based

/** one column per week for a single month */
function buildMonth(
  { y, m }: View,
  today: string,
  activity: Record<string, number>,
): Cell[][] {
  const first = `${y}-${pad(m + 1)}-01`;
  const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const offset = parse(first).getUTCDay(); // Sunday = 0
  const weeks = Math.ceil((offset + daysInMonth) / 7);

  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, r): Cell => {
      const day = w * 7 + r - offset + 1;
      if (day < 1 || day > daysInMonth) return null;
      const date = `${y}-${pad(m + 1)}-${pad(day)}`;
      return { date, day, count: activity[date] ?? 0, future: date > today };
    }),
  );
}

export interface ActivityHeatmapProps {
  /** today (YYYY-MM-DD) - the last day shown */
  today: string;
  /** YYYY-MM-DD -> activity count */
  activity: Record<string, number>;
}

export default function ActivityHeatmap({ today, activity }: ActivityHeatmapProps) {
  const current: View = React.useMemo(
    () => ({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 }),
    [today],
  );
  const [view, setView] = React.useState<View>(current);

  const windowStart = addDays(today, -364); // the API only returns the last 365 days
  const firstOfView = `${view.y}-${pad(view.m + 1)}-01`;
  const canPrev = addDays(firstOfView, -1) >= windowStart;
  const canNext = view.y * 12 + view.m < current.y * 12 + current.m;

  const go = (delta: -1 | 1) =>
    setView(({ y, m }) => {
      const n = y * 12 + m + delta;
      return { y: Math.floor(n / 12), m: n % 12 };
    });

  const columns = React.useMemo(() => buildMonth(view, today, activity), [view, today, activity]);

  return (
    <div className="heatmap">
      <div className="heatmap__title" aria-live="polite">
        {MONTH_NAMES[view.m]} {view.y}
      </div>

      <div className="heatmap__row">
        <button
          type="button"
          className="heatmap__nav"
          aria-label="Previous month"
          disabled={!canPrev}
          onClick={() => go(-1)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="heatmap__body">
          <div className="heatmap__days" aria-hidden="true">
            {DAY_LABELS.map((d) => (
              <span key={d} className="heatmap__day">
                {d}
              </span>
            ))}
          </div>

          {columns.map((week, i) => (
            <div key={i} className="heatmap__col">
              {week.map((cell, j) =>
                cell ? (
                  <div
                    key={j}
                    className={`heatmap__cell${cell.future ? " heatmap__cell--future" : ""}`}
                    data-level={cell.future ? 0 : levelOf(cell.count)}
                    title={
                      cell.future
                        ? prettyDate(cell.date)
                        : `${cell.count} ${cell.count === 1 ? "activity" : "activities"} on ${prettyDate(cell.date)}`
                    }
                  >
                    {cell.day}
                  </div>
                ) : (
                  <div key={j} className="heatmap__cell heatmap__cell--empty" />
                ),
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="heatmap__nav"
          aria-label="Next month"
          disabled={!canNext}
          onClick={() => go(1)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="heatmap__legend" aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <i key={l} className="heatmap__cell heatmap__cell--legend" data-level={l} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}