import * as React from "react";
import "./PieChart.css";

export type PieSlice = { id: string; label: string; value: number };

/** 10 colors; slices take them in order and the list repeats if there are more subjects than colors */
export const PIE_PALETTE = [
  "#6c63ff",
  "#ffc400",
  "#e040fb",
  "#2ec4b6",
  "#ff6b6b",
  "#4dabf7",
  "#69db7c",
  "#ff922b",
  "#b197fc",
  "#f783ac",
];

interface Props {
  heading: string;
  slices: PieSlice[];
  palette?: string[];
  emptyText?: string;
}

const SIZE = 240;
const C = SIZE / 2;
const R = 108;
const POP = 7; // how far the hovered slice moves outward

export default function PieChart({
  heading,
  slices,
  palette = PIE_PALETTE,
  emptyText = "No students have joined yet.",
}: Props) {
  const [active, setActive] = React.useState<string | null>(null);
  const total = slices.reduce((n, s) => n + s.value, 0);
  const colorOf = (i: number) => palette[i % palette.length];

  // angles for every slice that has students (zero slices stay in the legend only)
  const arcs = React.useMemo(() => {
    let a = -Math.PI / 2;
    return slices.flatMap((s, i) => {
      if (s.value <= 0 || total <= 0) return [];
      const sweep = (s.value / total) * Math.PI * 2;
      const a0 = a;
      const a1 = a + sweep;
      a = a1;
      const x1 = C + R * Math.cos(a0);
      const y1 = C + R * Math.sin(a0);
      const x2 = C + R * Math.cos(a1);
      const y2 = C + R * Math.sin(a1);
      const mid = a0 + sweep / 2;
      return [
        {
          slice: s,
          index: i,
          full: s.value === total, // one slice = the whole disc (an arc can't draw 360 degrees)
          d: `M${C},${C} L${x1},${y1} A${R},${R} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2},${y2} Z`,
          dx: Math.cos(mid) * POP,
          dy: Math.sin(mid) * POP,
        },
      ];
    });
  }, [slices, total]);

  return (
    <div className="pie-chart">
      <h3 className="pie-chart__heading">{heading}</h3>

      <div className="pie-chart__body">
        <div className="pie-chart__disc">
          {total <= 0 ? (
            <p className="pie-chart__empty">{slices.length ? emptyText : "You have no subjects yet."}</p>
          ) : (
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={heading}>
              {arcs.map((a) => {
                const on = active === a.slice.id;
                const style = {
                  transform: on ? `translate(${a.dx}px, ${a.dy}px)` : undefined,
                  opacity: active && !on ? 0.45 : 1,
                };
                return a.full ? (
                  <circle
                    key={a.slice.id}
                    cx={C}
                    cy={C}
                    r={R}
                    fill={colorOf(a.index)}
                    className="pie-chart__slice"
                    style={style}
                    onPointerEnter={() => setActive(a.slice.id)}
                    onPointerLeave={() => setActive(null)}
                  />
                ) : (
                  <path
                    key={a.slice.id}
                    d={a.d}
                    fill={colorOf(a.index)}
                    className="pie-chart__slice"
                    style={style}
                    onPointerEnter={() => setActive(a.slice.id)}
                    onPointerLeave={() => setActive(null)}
                  />
                );
              })}
            </svg>
          )}
        </div>

        <ul className="pie-chart__legend">
          {slices.map((s, i) => (
            <li
              key={s.id}
              className={`pie-chart__row${active === s.id ? " is-active" : ""}`}
              onPointerEnter={() => setActive(s.id)}
              onPointerLeave={() => setActive(null)}
            >
              <i style={{ background: colorOf(i) }} />
              <span className="pie-chart__name" title={s.label}>
                {s.label}
              </span>
              <b>{s.value.toLocaleString()}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}