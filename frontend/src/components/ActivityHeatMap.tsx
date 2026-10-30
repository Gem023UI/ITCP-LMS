import * as React from "react";
import "./ActivityHeatmap.css";

type Cell = { date: string; count: number } | null;
type Column = { cells: Cell[]; month: string; quarter: string | null; gap: boolean };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]; // rows are Sun..Sat
const DAY_MS = 86_400_000;

const parse = (d: string) => new Date(`${d}T00:00:00Z`);
const addDays = (d: string, n: number) =>
  new Date(parse(d).getTime() + n * DAY_MS).toISOString().slice(0, 10);

const levelOf = (n: number) => (n <= 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4);

const prettyDate = (d: string) =>
  parse(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** one column per week, covering the 365 days ending on `today` */
function buildColumns(today: string, activity: Record<string, number>): Column[] {
  const start = addDays(today, -364);
  const gridStart = addDays(start, -parse(start).getUTCDay()); // back up to Sunday
  const days = Math.round((parse(today).getTime() - parse(gridStart).getTime()) / DAY_MS) + 1;
  const weeks = Math.ceil(days / 7);

  const columns: Column[] = [];
  let prevMonth = -1;
  let prevQuarter = -1;

  for (let w = 0; w < weeks; w++) {
    const cells: Cell[] = [];
    let anchor: string | null = null; // first in-range day of this week
    for (let r = 0; r < 7; r++) {
      const date = addDays(gridStart, w * 7 + r);
      if (date < start || date > today) {
        cells.push(null);
        continue;
      }
      if (anchor === null) anchor = date;
      cells.push({ date, count: activity[date] ?? 0 });
    }

    const month = parse(anchor ?? start).getUTCMonth();
    const quarter = Math.floor(month / 3);
    columns.push({
      cells,
      month: month !== prevMonth ? MONTHS[month] : "",
      quarter: quarter !== prevQuarter ? `Q${quarter + 1}` : null,
      gap: prevQuarter !== -1 && quarter !== prevQuarter,
    });
    prevMonth = month;
    prevQuarter = quarter;
  }
  return columns;
}

export interface ActivityHeatmapProps {
  /** today (YYYY-MM-DD) - the last day shown */
  today: string;
  /** YYYY-MM-DD -> activity count */
  activity: Record<string, number>;
}

export default function ActivityHeatmap({ today, activity }: ActivityHeatmapProps) {
  const columns = React.useMemo(() => buildColumns(today, activity), [today, activity]);

  return (
    <div className="heatmap">
      <div className="heatmap__scroll">
        <div className="heatmap__body">
          <div className="heatmap__days" aria-hidden="true">
            <span className="heatmap__head-spacer" />
            {DAY_LABELS.map((d, i) => (
              <span key={i} className="heatmap__day">
                {d}
              </span>
            ))}
          </div>

          {columns.map((col, i) => (
            <div key={i} className={`heatmap__col${col.gap ? " heatmap__col--gap" : ""}`}>
              <div className="heatmap__head">
                <span className="heatmap__month">{col.month}</span>
                <strong className="heatmap__quarter">{col.quarter}</strong>
              </div>
              {col.cells.map((cell, j) =>
                cell ? (
                  <div
                    key={j}
                    className="heatmap__cell"
                    data-level={levelOf(cell.count)}
                    title={`${cell.count} ${cell.count === 1 ? "activity" : "activities"} on ${prettyDate(cell.date)}`}
                  />
                ) : (
                  <div key={j} className="heatmap__cell heatmap__cell--empty" />
                ),
              )}
            </div>
          ))}
        </div>
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