/**
 * App.jsx — Central Router
 *
 * How to wire into your project:
 *   In main.jsx (or index.jsx):
 *     import React from "react";
 *     import { createRoot } from "react-dom/client";
 *     import App from "./App.jsx";
 *     createRoot(document.getElementById("root")).render(<App />);
 *
 * Navigation model:
 *   - `page` state drives which page is shown
 *   - Every component receives `onNavigate(pageName)` to switch pages
 *   - Layout auto-adds Navbar + Footer except on auth pages
 *
 * To add a new page:
 *   1. Create src/pages/MyPage.jsx  (accept { onNavigate } prop)
 *   2. Import it here
 *   3. Add a case in renderPage()
 *   4. If it should NOT have Navbar/Footer, add its name to AUTH_PAGES in Layout.jsx
 */

import React, { useState } from "react";
import Layout        from "./components/Layout.jsx";
import Homepage      from "./pages/Homepage.jsx";
import LoginPage     from "./auth/LoginPage.jsx";
import RegisterPage  from "./auth/RegisterPage.jsx";
import ResetPasswordPage from "./auth/ResetPasswordPage.jsx";

// ── Placeholder pages (replace with real implementations) ────────────────
function Placeholder({ title, onNavigate }) {
  return (
    <div style={{
      minHeight: "60vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16, padding: 40,
      fontFamily: "'Noto Sans Devanagari', sans-serif",
    }}>
      <div style={{ fontSize: 56 }}>🏗️</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0D1F3C" }}>{title}</h2>
      <p style={{ color: "#6B7280", fontSize: 15 }}>यो पृष्ठ छिट्टै आउँदैछ।</p>
      <button onClick={() => onNavigate("home")} style={{
        padding: "10px 24px", borderRadius: 24, border: "none",
        background: "linear-gradient(135deg,#1A3A6B,#C0392B)",
        color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14,
        fontFamily: "'Noto Sans Devanagari', sans-serif",
      }}>← गृहपृष्ठमा फर्कनुहोस्</button>
    </div>
  );
}

const PLACEHOLDER_PAGES = {
  sports:      "खेलहरू",
  programs:    "कार्यक्रमहरू",
  training:    "तालिम",
  news:        "समाचार",
  competition: "प्रतियोगिता",
  about:       "हाम्रो बारे",
  contact:     "सम्पर्क",
};

// ─────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  // Scroll to top on page change
  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":           return <Homepage onNavigate={navigate} />;
      case "login":          return <LoginPage onNavigate={navigate} />;
      case "register":       return <RegisterPage onNavigate={navigate} />;
      case "reset-password": return <ResetPasswordPage onNavigate={navigate} />;
      default:
        if (PLACEHOLDER_PAGES[page]) {
          return <Placeholder title={PLACEHOLDER_PAGES[page]} onNavigate={navigate} />;
        }
        return <Homepage onNavigate={navigate} />;
    }
  };

  return (
    <Layout currentPage={page} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}