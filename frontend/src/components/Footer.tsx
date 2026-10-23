import Reveal from "./Reveal";
import { NAV_LINKS } from "../data/navLinks";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Reveal className="site-footer__brand">
          <p className="site-footer__name">Information Assurance &amp; Security</p>
          <p className="site-footer__tagline">
            Learn the fundamentals and best practices of cybersecurity.
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

      <Reveal className="site-footer__bottom" delay={200}>
        <p>
          © {year} Information Assurance &amp; Security. All rights reserved.
        </p>
      </Reveal>
    </footer>
  );
}