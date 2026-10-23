export type NavLink = { label: string; href: string };

/* EDIT: header + footer links (plain anchors for now; swap for <Link> once routing exists) */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "About", href: "/about" },
];

export const CTA_LINK: NavLink = { label: "Learn Today", href: "/learn" };