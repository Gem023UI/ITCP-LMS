import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Chapters from "./pages/Chapters";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chapters" element={<Chapters />} />
      </Routes>
    </BrowserRouter>
  );
}