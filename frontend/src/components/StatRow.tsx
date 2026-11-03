import CountUp from "./CountUp";
import Reveal from "./Reveal";
import "./StatsSection.css"; // same row / divider / label styles as the landing stats

export type StatItem = { value: number; label: string; suffix?: string; decimals?: number };

const NUMBER_STYLE: React.CSSProperties = {
  fontFamily: '"League Spartan", sans-serif',
  fontWeight: 900,
  fontSize: "clamp(2.5rem, 4.1vw, 6rem)",
  lineHeight: 1.05,
};

/** the big-number row from the landing page ("10 Units to Learn From | 25 ..."), driven by props */
export default function StatRow({ stats }: { stats: StatItem[] }) {
  return (
    <div className="stats">
      <div className="stats__row">
        {stats.map((stat, i) => {
          const decimals = stat.decimals ?? 0;
          // reserve the final width so the row doesn't jitter while counting
          const width = stat.value.toFixed(decimals).length + (stat.suffix ? 0.6 : 0);
          return (
            <Reveal key={stat.label} className="stat" delay={300 + i * 150}>
              <CountUp
                // remount when the value changes so it counts to the new number
                key={`${stat.label}-${stat.value}`}
                from={0}
                to={stat.value}
                mode="count"
                easing="easeOut"
                format="standard"
                separator=","
                prefix=""
                suffix={stat.suffix ?? ""}
                decimals={decimals}
                direction="up"
                duration={2}
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
