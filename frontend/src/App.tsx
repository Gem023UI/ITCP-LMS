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
  DashboardSquareEditIcon,
  EditUser02Icon,
  LicenseDraftIcon,
  UserCircleIcon,
  BookEditIcon,
  ArrowLeftBigIcon,
} from "@hugeicons/core-free-icons";
import ShapeGrid from "./components/ShapeGrid";
import Dock from "./components/Dock";
import LandingPage from "./pages/Landing";
import Auth from "./pages/Auth";
import Chapters from "./pages/Chapters";
import Lessons from "./pages/Lessons";
import Subjects from "./pages/Subjects";
import Quiz from "./pages/Quiz";
import SubjectTeacher from "./pages/Teacher";
import UsersAdmin from "./pages/Admin";
import Home from "./pages/Home";
import { authApi, type User } from "./services/authApi";

const glyph = (icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]) => (
  <HugeiconsIcon icon={icon} size="1em" strokeWidth={1.8} />
);

const SHOW_AFTER_MS = 350; // beat before the dock slides in
const VISIBLE_FOR_MS = 3200; // how long it stays before auto-hiding

function Shell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [autoHide, setAutoHide] = React.useState(true);
  React.useEffect(() => {
    const t1 = window.setTimeout(() => setAutoHide(false), SHOW_AFTER_MS);
    const t2 = window.setTimeout(() => setAutoHide(true), SHOW_AFTER_MS + VISIBLE_FOR_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  const [role, setRole] = React.useState<User["role"] | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    authApi
      .me()
      .then(({ user }) => !cancelled && setRole(user.role))
      .catch(() => !cancelled && setRole(null));
    return () => {
      cancelled = true;
    };
  }, [pathname]); // re-check after login/logout navigation

    const handleLogout = React.useCallback(async () => {
    try {
      await authApi.logout(); // clears the httpOnly cookie server-side
    } catch {
      // ignore: still reset the UI below
    } finally {
      setRole(null);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const dockItems = React.useMemo(() => {
    const demoMenu = [
      { label: "New Window", onClick: () => console.log("New Window") },
      { separator: true },
      { label: "Options", items: [{ label: "Open at Login", checked: true }, { label: "Show in Finder" }] },
      { separator: true },
      { label: "Quit", onClick: () => console.log("Quit") },
    ];

    const student = [
      { icon: glyph(Home09Icon), label: "Home", active: true, onClick: () => navigate("/home"), menu: demoMenu },
      { icon: glyph(Book03Icon), label: "Subjects", active: true, onClick: () => navigate("/subjects"), menu: demoMenu },
      { icon: glyph(NoteIcon), label: "Articles", active: true, onClick: () => console.log("/articles") },
      { icon: glyph(UserCircleIcon), label: "Profile", onClick: () => console.log("/profile") },
      { separator: true},
      { icon: glyph(ArrowLeftBigIcon), label: "Log Out", onClick: handleLogout },
    ];

    const teacher = [
      { icon: glyph(DashboardSquareEditIcon), label: "Dashboard", onClick: () => console.log("/teacher/dashboard") },
      { icon: glyph(BookEditIcon), label: "Subjects", onClick: () => navigate("/teacher/subjects") },
      { icon: glyph(UserAccountIcon), label: "Profile", onClick: () => console.log("/teacher/profile") },
      { separator: true},
      { icon: glyph(ArrowLeftBigIcon), label: "Log Out", onClick: handleLogout },
    ];

    const admin = [
      { icon: glyph(DashboardCircleEditIcon), label: "Dashboard", onClick: () => console.log("admin/dashboard") },
      { icon: glyph(EditUser02Icon), label: "Users", onClick: () => navigate("/admin/users") },
      { icon: glyph(LicenseDraftIcon), label: "Subjects", onClick: () => console.log("admin/subjects") },
      { separator: true},
      { icon: glyph(ArrowLeftBigIcon), label: "Log Out", onClick: handleLogout },
    ];

    switch (role) {
      case "STUDENT":
        return student;
      case "TEACHER":
        return teacher;
      case "ADMIN":
        return admin;
      default:
        return student.slice(0, 1); // guest: Home only
    }
    }, [navigate, role, handleLogout]);

  return (
    <>
      <div className="app-bg" aria-hidden="true">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#00396b"
            hoverColor="#0060af"
            hoverFillColor="#00396b"
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
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/teacher/subjects" element={<SubjectTeacher />} />
          <Route path="/admin/users" element={<UsersAdmin />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/chapters/:lessonId" element={<Lessons />} />
          <Route path="/quiz/:chapterId" element={<Quiz />} />
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