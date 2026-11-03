/** Calendar-day helpers in the app's timezone (streaks, "due today", daily charts). */
export const TZ = process.env.APP_TZ || "Asia/Manila";
export const DAY_MS = 86_400_000;

const dayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}); // -> YYYY-MM-DD

/** YYYY-MM-DD of an instant, in TZ */
export const toDay = (d: Date) => dayFmt.format(d);

/** shifts a YYYY-MM-DD string by n calendar days */
export const shiftDay = (day: string, n: number) =>
  new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);

/** `date` column value for a YYYY-MM-DD day */
export const toDbDate = (day: string) => new Date(`${day}T00:00:00Z`);

const partsFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** TZ offset from UTC (ms) at the given instant */
function offsetMs(at: Date) {
  const parts = partsFmt.formatToParts(at);
  const v = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asUtc = Date.UTC(v("year"), v("month") - 1, v("day"), v("hour"), v("minute"), v("second"));
  return asUtc - Math.floor(at.getTime() / 1000) * 1000;
}

/** the instant a YYYY-MM-DD day starts in TZ */
export function dayStart(day: string) {
  const guess = new Date(`${day}T00:00:00Z`);
  return new Date(guess.getTime() - offsetMs(guess));
}

/** [start, end) instants of a YYYY-MM-DD day in TZ */
export const dayRange = (day: string) => ({ start: dayStart(day), end: dayStart(shiftDay(day, 1)) });
