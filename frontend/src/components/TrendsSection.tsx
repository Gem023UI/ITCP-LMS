import CardSwap from "./CardSwap";
import Reveal from "./Reveal";
import "./TrendsSection.css";

/* EDIT THESE ------------------------------------------------------------ */
const TITLE = "Stay up to date with the latest trend and news.";
const TEXT =
  "Stay up to date with the latest trend and news. View our curated articles to catch up and familiarize oneself about the current events in the field of cybersecurity.";

/* Placeholder generator. Delete it once you use real image paths. */
const ph = (label: string, from: string, to: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><text x="600" y="430" font-family="Poppins, Arial, sans-serif" font-size="80" font-weight="700" fill="white" text-anchor="middle">${label}</text></svg>`,
  )}`;

// image: "/photos/xyz.jpg" (file in public/photos/) or an imported asset
const ITEMS = [
  { title: "Threat watch", image: ph("Threat watch", "#be123c", "#fda4af") },
  { title: "Data breaches", image: ph("Data breaches", "#1e3fd8", "#38bdf8") },
  { title: "Best practices", image: ph("Best practices", "#7c3aed", "#c4b5fd") },
  { title: "Tools & tech", image: ph("Tools & tech", "#0f766e", "#5eead4") },
];
/* ----------------------------------------------------------------------- */

export default function TrendsSection() {
  return (
    <section className="trends">
      <div className="trends__text">
        <Reveal as="h2" className="trends__title">
          {TITLE}
        </Reveal>
        <Reveal as="p" className="trends__body" delay={150}>
          {TEXT}
        </Reveal>
      </div>

      <Reveal className="trends__cards" delay={250}>
        <CardSwap
          items={ITEMS}
          delay={4000}
          cardDistance={60}
          verticalDistance={70}
          depth={90}
          skewAmount={6}
          visibleCards={4}
          cardRadius={18}
          speed={1}
          bounce={0.35}
          parallax={0.5}
          hoverSpread={0.12}
          dim={0.5}
          autoplay
          pauseOnHover
          draggable
        />
      </Reveal>
    </section>
  );
}