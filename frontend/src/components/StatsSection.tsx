import * as React from "react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import "./StatsSection.css";

type Stat = { value: number; suffix?: string; label: string };

/* EDIT THESE: values and labels ("\n" = line break) */
const STATS: Stat[] = [
  { value: 7, label: "Units to\nLearn From" },
  { value: 25, label: "Modules to\nPractice" },
  { value: 100, label: "Students\nEducated" },
];

const NUMBER_STYLE: React.CSSProperties = {
  fontFamily: '"Anton", sans-serif',
  fontWeight: 400,
  fontSize: "clamp(2.5rem, 5.1vw, 6rem)",
  lineHeight: 1.35,
};

export default function StatsSection() {
  return (
    <div className="stats">
      <div className="stats__row">
        {STATS.map((stat, i) => {
          // reserve the final width so the row doesn't jitter while counting
          const width = String(stat.value).length + (stat.suffix ? 0.6 : 0);
          return (
            <Reveal key={stat.label} className="stat" delay={300 + i * 150}>
              <CountUp
                from={0}
                to={stat.value}
                mode="count"
                easing="easeOut"
                format="standard"
                separator=","
                prefix=""
                suffix={stat.suffix ?? ""}
                direction="up"
                duration={3}
                delay={0}
                trigger="view"
                replayOnHover
                className="stat__number"
                style={{
                  ...NUMBER_STYLE,
                  display: "inline-block",
                  minWidth: `${width}ch`,
                  textAlign: "left",
                }}
              />
              <p className="stat__label">{stat.label}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}