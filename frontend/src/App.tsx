import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home09Icon,
  Book03Icon,
  NoteIcon,
  UserAccountIcon,
  DashboardCircleEditIcon,
  EditUser02Icon,
  LicenseDraftIcon,
} from "@hugeicons/core-free-icons";
import ShapeGrid from "./components/ShapeGrid";
import Dock from "./components/Dock";
import LandingPage from "./pages/Landing";
import Chapters from "./pages/Chapters";

const glyph = (icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]) => (
  <HugeiconsIcon icon={icon} size="1em" strokeWidth={1.8} />
);

const SHOW_AFTER_MS = 350; // beat before the dock slides in
const VISIBLE_FOR_MS = 3200; // how long it stays before auto-hiding

function Shell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // starts hidden -> slides in -> hands over to the Dock's own autoHide
  const [autoHide, setAutoHide] = React.useState(true);
  React.useEffect(() => {
    const t1 = window.setTimeout(() => setAutoHide(false), SHOW_AFTER_MS);
    const t2 = window.setTimeout(() => setAutoHide(true), SHOW_AFTER_MS + VISIBLE_FOR_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  const dockItems = React.useMemo(
    () => [
      {
        icon: glyph(Home09Icon),
        label: "Home",
        active: true,
        onClick: () => navigate("/"),
        menu: [
          { label: "New Window", onClick: () => console.log("New Window") },
          { separator: true },
          { label: "Options", items: [{ label: "Open at Login", checked: true }, { label: "Show in Finder" }] },
          { separator: true },
          { label: "Quit", onClick: () => console.log("Quit") },
        ],
      },
      {
        icon: glyph(Book03Icon),
        label: "Chapters",
        active: true,
        onClick: () => navigate("/chapters"),
        menu: [
          { label: "New Window", onClick: () => console.log("New Window") },
          { separator: true },
          { label: "Options", items: [{ label: "Open at Login", checked: true }, { label: "Show in Finder" }] },
          { separator: true },
          { label: "Quit", onClick: () => console.log("Quit") },
        ],
      },
      { icon: glyph(NoteIcon), label: "Articles", active: true, onClick: () => console.log("Articles") },
      { icon: glyph(UserAccountIcon), label: "Profile", onClick: () => console.log("Profile") },
      { separator: true },
      { icon: glyph(DashboardCircleEditIcon), label: "Dashboard", onClick: () => console.log("Dashboard") },
      { icon: glyph(EditUser02Icon), label: "Users", onClick: () => console.log("Users") },
      { icon: glyph(LicenseDraftIcon), label: "Licenses", onClick: () => console.log("Licenses") },
    ],
    [navigate],
  );

  return (
    <>
      <div className="app-bg" aria-hidden="true">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#003d72"
            hoverColor="#ffffff"
            hoverFillColor="#003d72"
            fillOpacity={0.15}
            cellSize={40}
            speed={0.5}
            tiltX={0}
            tiltY={0}
            rainbow={false}
            lineWidth={1}
            radius={1.8}
            trail={0.6}
            glow={0.35}
            twinkle={0}
            fade={1}
            clickCascade
            intro
          />
        </div>
      </div>

      <div className="app-dock">
        <Dock
          items={dockItems}
          baseItemSize={50}
          magnification={70}
          panelHeight={68}
          accentColor="#0a84ff"
          badgeColor="#ff453a"
          position="left"
          distance={200}
          gap={10}
          roundness={0.4}
          bounce
          tiles
          showLabels
          showIndicators={false}
          showBadges={false}
          autoHide={autoHide}
        />
      </div>

      <div className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chapters" element={<Chapters />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}