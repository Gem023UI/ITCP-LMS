import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import Reveal from "./Reveal";
import { NAV_LINKS, CTA_LINK } from "../data/navLinks";
import "./Header.css";

export default function SiteHeader() {
  const goToHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hero = document.getElementById("hero");
    if (!hero) return; // falls back to the #hero href
    e.preventDefault();
    hero.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LiquidGlass as="header" className="site-header">
      <Reveal y={-12}>
        <a className="site-header__brand" href="#hero" onClick={goToHero}>
          Information Assurance &amp; Security
        </a>
      </Reveal>

      <Reveal as="nav" className="site-header__nav" aria-label="Main" y={-12} delay={100}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} className="site-header__link" href={link.href}>
            {link.label}
          </a>
        ))}
      </Reveal>

      <Reveal y={-12} delay={200}>
        <MetallicBlueButton
          as="a"
          href={CTA_LINK.href}
          className="site-header__cta"
        >
          {CTA_LINK.label}
        </MetallicBlueButton>
      </Reveal>
    </LiquidGlass>
  );
}