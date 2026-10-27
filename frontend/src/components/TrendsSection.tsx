import CardSwap from "./CardSwap";
import Reveal from "./Reveal";
import "./TrendsSection.css";

/* EDIT THESE ------------------------------------------------------------ */
const TITLE = "Stay up to date with the latest trend and news.";
const TEXT =
  "Stay up to date with the latest trend and news. View our curated articles to catch up and familiarize oneself about the current events in the field of cybersecurity.";

// image: "/photos/xyz.jpg" (file in public/photos/) or an imported asset
const ITEMS = [
  { title: "Threat watch", image: "/chapters/01.png" },
  { title: "Data breaches", image: "/chapters/02.png" },
  { title: "Best practices", image: "/chapters/03.png" },
  { title: "Tools & tech", image: "/chapters/04.png" },
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