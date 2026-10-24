import * as React from "react";
import Reveal from "../components/Reveal";
import LiquidGlass from "../components/LiquidGlass";
import MetallicBlueButton from "../components/MetallicBlueButton";
import ImageCards from "../components/ImageCards";
import StatsSection from "../components/StatsSection";
import TrendsSection from "../components/TrendsSection";
import FolderSection from "../components/FolderSection";
import Footer from "../components/Footer";
import { CARD_IMAGES } from "../data/cardImage";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const TITLE_LINES = ["Cloud", "Computing"];

/* Parallax: writes --sy (scroll) and --mx/--my (pointer) onto the hero element.
   No React state, so scrolling never re-renders. Elements opt in with the .px class. */
function useHeroParallax(ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--sy", String(Math.min(window.scrollY, window.innerHeight)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", String((e.clientX / window.innerWidth - 0.5) * 2));
      el.style.setProperty("--my", String((e.clientY / window.innerHeight - 0.5) * 2));
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ref]);
}

type PxStyle = React.CSSProperties & { "--speed"?: number; "--depth"?: number };
const px = (speed: number, depth = 0): PxStyle => ({ "--speed": speed, "--depth": depth });

/* Every letter gets its own scroll speed + pointer depth, so the title ripples. */
function Letters({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {text.split("").map((ch, i) => {
        const n = offset + i;
        const speed = 0.04 + (((n * 7 + 3) % 11) / 11) * 0.14;
        const depth = (((n * 5) % 9) - 4) * 1.6;
        return (
          <span key={n} className="px hero__letter" style={px(speed, depth)} aria-hidden="true">
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = React.useRef<HTMLElement>(null);
  useHeroParallax(heroRef);

  return (
    <div className="landing">
      <main>
        <section className="hero" id="hero" ref={heroRef}>
          <div className="hero__content">
            <div className="hero__stage">
              {/* title + logos */}
              <div className="hero__titleblock">
                <h1 className="hero__title" aria-label="Cloud Computing">
                  <Reveal as="span" className="hero__line" delay={0}>
                    <Letters text={TITLE_LINES[0]} offset={0} />
                  </Reveal>
                  <Reveal as="span" className="hero__line" delay={150}>
                    <Letters text={TITLE_LINES[1]} offset={TITLE_LINES[0].length} />
                  </Reveal>
                </h1>

                <div className="hero__logo hero__logo--aws">
                  <div className="px" style={px(0.2, 14)}>
                    <Reveal delay={300}>
                      <img src="/aws-color.png" alt="" draggable={false} />
                    </Reveal>
                  </div>
                </div>
                <div className="hero__logo hero__logo--azure">
                  <div className="px" style={px(0.28, -16)}>
                    <Reveal delay={400}>
                      <img src="/azure.png" alt="" draggable={false} />
                    </Reveal>
                  </div>
                </div>
                <div className="hero__logo hero__logo--gcp">
                  <div className="px" style={px(0.38, 20)}>
                    <Reveal delay={500}>
                      <img src="/gcp.png" alt="" draggable={false} />
                    </Reveal>
                  </div>
                </div>
              </div>

              {/* subtext, flanking images, buttons */}
              <div className="hero__lower">
                <div className="hero__art hero__art--left">
                  <div className="px" style={px(0.26, 16)}>
                    <Reveal delay={450}>
                      <img src="/server.png" alt="" draggable={false} />
                    </Reveal>
                  </div>
                </div>
                <div className="hero__art hero__art--right">
                  <div className="px" style={px(0.32, -16)}>
                    <Reveal delay={550}>
                      <img src="/datacenter.png" alt="" draggable={false} />
                    </Reveal>
                  </div>
                </div>

                <div className="px" style={px(0.14)}>
                  <Reveal as="p" className="hero__sub" delay={350}>
                    Learn the fundamentals of cloud infrastructure and services - along with a
                    growing community
                  </Reveal>
                </div>

                <div className="px hero__actions" style={px(0.1)}>
                  <Reveal delay={650}>
                    <LiquidGlass as="button" className="hero__btn">
                      See Full Curriculum
                    </LiquidGlass>
                  </Reveal>
                  <Reveal delay={800}>
                    <MetallicBlueButton className="hero__btn" onClick={() => navigate("/chapters")}>
                      Learn Today
                    </MetallicBlueButton>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase">
          <ImageCards images={CARD_IMAGES} />
          <StatsSection />
        </section>

        <TrendsSection />
        <FolderSection />
      </main>

      <Footer />
    </div>
  );
}