import * as React from "react";
import GradientASCII from "../components/GradientASCII";
import TechText from "../components/TechText";
import Reveal from "../components/Reveal";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import "../styles/Landing.css";

const TITLE_LINES = ["Information", "Assurance &", "Security"];

/** Responsive title size (px) */
function useTitleSize() {
  const get = () =>
    Math.round(Math.min(150, Math.max(56, window.innerWidth * 0.11)));
  const [size, setSize] = React.useState(get);

  React.useEffect(() => {
    const onResize = () => setSize(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

/** True once Anton is loaded, so TechText can be remounted with correct glyph metrics */
function useAntonReady() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    const done = () => alive && setReady(true);
    const onLoad = () => {
      if (document.fonts.check("400 100px Anton")) done();
    };

    document.fonts.load("400 100px Anton").then((faces) => {
      if (faces.length) done();
    });
    document.fonts.addEventListener("loadingdone", onLoad);
    const timeout = window.setTimeout(done, 2500);

    return () => {
      alive = false;
      window.clearTimeout(timeout);
      document.fonts.removeEventListener("loadingdone", onLoad);
    };
  }, []);

  return ready;
}

export default function LandingPage() {
  const size = useTitleSize();
  const fontReady = useAntonReady();

  return (
    <main className="landing">
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
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
        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__title">
            <span className="sr-only">Information Assurance &amp; Security</span>
            {TITLE_LINES.map((line, i) => (
              <Reveal
                key={line}
                className="hero__line"
                delay={i * 150}
                style={{ height: size * 1.05 }}
                aria-hidden="true"
              >
                <TechText
                  key={fontReady ? "ready" : "pending"}
                  text={line}
                  fontWeight={400}
                  fontSize={size}
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  intro="none"
                  introDuration={2}
                  clickKick
                  guides={false}
                  fontFamily="Anton, sans-serif"
                  letterSpacing={-0.05}
                  accentColor="#ffffff"
                  reach={200}
                  softness={0.7}
                  lineStyle="dashed"
                  strokeWidth={1.5}
                  speed={1}
                  bounce={0.4}
                  selection
                  labels
                  color="#ffffff"
                  align="center"
                  draggable
                  sweep
                />
              </Reveal>
            ))}
          </h1>

          <Reveal as="p" className="hero__sub" delay={550}>
            Learn the fundamentals and best practices of cybersecurity: how to
            protect data, secure systems, manage risk, and respond to threats.
            Build the skills the digital world depends on, starting today.
          </Reveal>

          <div className="hero__actions">
            <Reveal delay={750}>
              <LiquidGlass as="button" className="hero__btn">
                See Full Curriculum
              </LiquidGlass>
            </Reveal>
            <Reveal delay={900}>
              <MetallicBlueButton className="hero__btn">
                Learn Today
              </MetallicBlueButton>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}