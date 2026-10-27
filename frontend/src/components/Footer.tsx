import Reveal from "./Reveal";
import { NAV_LINKS } from "../data/navLinks";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Reveal className="site-footer__brand">
          <p className="site-footer__name">Cloud Computing</p>
          <p className="site-footer__tagline">
            Learn the fundamentals and best practices of cloud development.
          </p>
          <br></br>
          <p className="site-footer__tagline">
            Cloud Computing LMS - All Rights Reserved 2026.
          </p>
        </Reveal>

        <Reveal as="nav" className="site-footer__nav" aria-label="Footer" delay={100}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} className="site-footer__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </Reveal>
      </div>
    </footer>
  );
}