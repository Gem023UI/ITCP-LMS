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

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <main>
        <section className="hero" id="hero">
          {/* 951 x 535 reference canvas, scaled to fit the viewport */}
          <div className="hero__canvas">
            <h1 className="hero__title" aria-label="Cloud Computing">
              <Reveal as="span" className="hero__line hero__line--1" delay={0}>
                <span className="hero__word" aria-hidden="true">
                  Cloud
                </span>
              </Reveal>
              <Reveal as="span" className="hero__line hero__line--2" delay={150}>
                <span className="hero__word" aria-hidden="true">
                  Computing
                </span>
              </Reveal>
            </h1>

            <div className="hero__img hero__img--aws">
              <Reveal delay={300}>
                <img src="/aws-color.png" alt="" draggable={false} />
              </Reveal>
            </div>
            <div className="hero__img hero__img--azure">
              <Reveal delay={400}>
                <img src="/azure.png" alt="" draggable={false} />
              </Reveal>
            </div>
            <div className="hero__img hero__img--gcp">
              <Reveal delay={500}>
                <img src="/gcp.png" alt="" draggable={false} />
              </Reveal>
            </div>
            <div className="hero__img hero__img--server">
              <Reveal delay={450}>
                <img src="/server.png" alt="" draggable={false} />
              </Reveal>
            </div>
            <div className="hero__img hero__img--datacenter">
              <Reveal delay={550}>
                <img src="/datacenter.png" alt="" draggable={false} />
              </Reveal>
            </div>

            <div className="hero__subwrap">
              <Reveal as="p" className="hero__sub" delay={350}>
                Learn the fundamentals of cloud infrastructure and
                <br />
                services - along with a growing community
              </Reveal>
            </div>

            <div className="hero__actions">
              <div className="hero__actions-row">
                <Reveal delay={650} threshold={0}>
                  <LiquidGlass as="button" className="hero__btn">
                    See Full Curriculum
                  </LiquidGlass>
                </Reveal>
                <Reveal delay={800} threshold={0}>
                  <MetallicBlueButton className="hero__btn" onClick={() => navigate("/chapters")}>
                    Learn Today
                  </MetallicBlueButton>
                </Reveal>
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