import * as React from "react";
import GradientASCII from "../components/GradientASCII";
import TechText from "../components/TechText";
import Reveal from "../components/Reveal";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import ImageCards from "../components/ImageCards";
import StatsSection from "../components/StatsSection";
import { CARD_IMAGES } from "../data/cardImage";
import "../styles/Landing.css";

/* ===================== HERO TITLE: EXPERIMENT HERE ===================== */
const TITLE = {
  text: "Information Assurance & Security",
  fontFamily: '"Anton", sans-serif', // any family loaded in App.css, e.g. '"Poppins", sans-serif'
  fontWeight: 400, // Anton only has 400; Poppins supports 100–900
  fontSize: 150, // MAX size in px; TechText shrinks it to fit the box below
  letterSpacing: -0.02, // in em
  boxHeight: "clamp(110px, 15vw, 230px)", // taller box = room for a bigger title
  maxWidth: "100vw", // wider box = bigger title (it fits to this width)
  align: "center" as const, // "left" | "center" | "right"
  color: "#ffffff",
};

/* Interaction / effect settings for the title */
const TITLE_FX = {
  reveal: "letter",
  dashLength: 4,
  dashGap: 2,
  specks: 15,
  intro: "none",
  introDuration: 2,
  clickKick: true,
  guides: false,
  reach: 200,
  softness: 0.7,
  lineStyle: "dashed",
  strokeWidth: 1.5,
  speed: 1,
  bounce: 0.4,
  selection: true,
  labels: true,
  draggable: true,
  sweep: true,
} as const;
/* ======================================================================= */

const TAGLINE = ["Cybersecurity Fundamentals", "Certifications", "Hands-On Tests"];

const TITLE_FONT_SPEC = `${TITLE.fontWeight} 100px "${TITLE.fontFamily
  .split(",")[0]
  .replace(/["']/g, "")
  .trim()}"`;

/** True once the title font is loaded, so TechText can be remounted with correct glyph metrics */
function useFontReady(spec: string) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    const done = () => {
      if (alive) setReady(true);
    };
    const onLoad = () => {
      if (document.fonts.check(spec)) done();
    };

    document.fonts.load(spec).then((faces) => {
      if (faces.length) done();
    });
    document.fonts.addEventListener("loadingdone", onLoad);
    const timeout = window.setTimeout(done, 2500);

    return () => {
      alive = false;
      window.clearTimeout(timeout);
      document.fonts.removeEventListener("loadingdone", onLoad);
    };
  }, [spec]);

  return ready;
}

export default function Landing() {
  const fontReady = useFontReady(TITLE_FONT_SPEC);

  return (
    <main className="landing">
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <GradientASCII
              colors={["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]}
              shape="horizon"
              characters=" =+xX0S8#@"
              cellSize={18}
              density={0.8}
              glyphOpacity={0.85}
              glow={0.2}
              depthOfField={0}
              flicker={0.2}
              softness={0.5}
              scale={1}
              flow={0.5}
              speed={1}
              gradientOpacity={0.9}
              grain={0.08}
              variation={0}
              mouseInteraction
              scrambleRadius={0.1}
              clickEffect="burst"
              intro
              lightMode={false}
            />
          </div>
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__title">
            <span className="sr-only">Information Assurance &amp; Security</span>
            <Reveal
              aria-hidden="true"
              style={{
                height: TITLE.boxHeight,
                width: "100%",
                maxWidth: TITLE.maxWidth,
                margin: "0 auto",
              }}
            >
              <TechText
                key={fontReady ? "ready" : "pending"}
                text={TITLE.text}
                fontFamily={TITLE.fontFamily}
                fontWeight={TITLE.fontWeight}
                fontSize={TITLE.fontSize}
                letterSpacing={TITLE.letterSpacing}
                align={TITLE.align}
                color={TITLE.color}
                accentColor={TITLE.color}
                {...TITLE_FX}
              />
            </Reveal>
          </h1>

          <Reveal as="p" className="hero__tagline" delay={200}>
            {TAGLINE.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && (
                  <span className="hero__dot" aria-hidden="true">
                    •
                  </span>
                )}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </Reveal>

          <Reveal as="p" className="hero__sub" delay={350}>
            <strong>Learn the fundamentals and best practices in Cybersecurity.</strong> 
            <br></br>Discover how to protect data, secure systems, manage risk, and respond to threats. Build the skills the digital world depends on, starting today.
          </Reveal>

          <div className="hero__actions">
            <Reveal delay={550}>
              <LiquidGlass as="button" className="hero__btn">
                See Full Curriculum
              </LiquidGlass>
            </Reveal>
            <Reveal delay={700}>
              <MetallicBlueButton className="hero__btn">
                Learn Today
              </MetallicBlueButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="showcase">
        <ImageCards images={CARD_IMAGES} />
        <StatsSection />
      </section>
    </main>
  );
}