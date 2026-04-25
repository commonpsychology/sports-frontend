/**
 * LoginPage
 * Props: onNavigate(page) — router callback
 */
import React, { useState } from "react";
import AUTH_CSS from "./authStyles.js";

const USER_TYPES = [
  { id: "player",  icon: "⚽", label: "खेलाडी" },
  { id: "fan",     icon: "📣", label: "प्रशंसक" },
  { id: "staff",   icon: "🏟️", label: "स्टाफ" },
  { id: "coach",   icon: "🎽", label: "प्रशिक्षक" },
];

export default function LoginPage({ onNavigate }) {
  const [userType, setUserType] = useState("player");
  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("सबै फिल्डहरू भर्नुहोस्।"); return; }
    setLoading(true); setError("");
    // ── INTEGRATE YOUR API HERE ─────────────────────────────
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...form, userType })
    // });
    // const data = await res.json();
    // if (!res.ok) { setError(data.message); setLoading(false); return; }
    // localStorage.setItem("token", data.token);
    // ────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onNavigate && onNavigate("home");
  };

  return (
    <>
      <style>{AUTH_CSS}</style>
      <div className="auth-page">
        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-logo">
            <img src='/logo.png' alt="Logo" />
            <div className="auth-left-logo-text">
              <div className="main">खेलौँ नेपाल</div>
              <div className="sub">Khelaun NEPAL</div>
            </div>
          </div>
          <h1 className="auth-tagline">
            खेलकुदको <em>नयाँ युग</em><br/>सुरु होस्!
          </h1>
          <p className="auth-tagline-sub">
            नेपालको सबैभन्दा ठूलो खेलकुद प्लेटफर्ममा साइन इन गर्नुहोस् र हजारौं खेलाडीहरूसँग जोडिनुहोस्।
          </p>
          <div className="auth-left-stats">
            {[{n:"५०,०००+",l:"सक्रिय खेलाडी"},{n:"७५+",l:"जिल्ला केन्द्र"},{n:"२५०+",l:"राष्ट्रिय पदक"},{n:"३२+",l:"अन्तर्राष्ट्रिय सम्मान"}]
              .map((s,i) => (
                <div key={i} className="auth-stat-pill">
                  <div className="auth-stat-num">{s.n}</div>
                  <div className="auth-stat-lbl">{s.l}</div>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-card">
            <button className="auth-back" onClick={() => onNavigate("home")}>
              ← गृहपृष्ठमा फर्कनुहोस्
            </button>

            <div className="auth-card-logo">
              <img src='/logo.png' alt="Logo" />
            </div>
            <div className="auth-card-title">स्वागत छ! 🙏</div>
            <div className="auth-card-sub">आफ्नो खाता प्रयोग गरेर लगइन गर्नुहोस्</div>

            {/* User type */}
            <div className="auth-user-tabs">
              {USER_TYPES.map(t => (
                <button
                  key={t.id}
                  className={`auth-user-tab${userType === t.id ? " active" : ""}`}
                  onClick={() => setUserType(t.id)}
                >
                  <span className="tab-icon">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} noValidate>
              <div className="auth-field">
                <label>इमेल ठेगाना</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">✉️</span>
                  <input className="auth-input" type="email" placeholder="your@email.com"
                    value={form.email} onChange={set("email")} />
                </div>
              </div>

              <div className="auth-field">
                <label>पासवर्ड</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">🔒</span>
                  <input className="auth-input" type={showPwd ? "text" : "password"}
                    placeholder="••••••••" value={form.password} onChange={set("password")} />
                  <button type="button" className="auth-eye" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <button type="button" className="auth-forgot" onClick={() => onNavigate("reset-password")}>
                  पासवर्ड बिर्सनुभयो?
                </button>
              </div>

              {error && <p className="auth-err" style={{ marginBottom: 12 }}>⚠️ {error}</p>}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "लगइन हुँदैछ..." : "🔑 लगइन गर्नुहोस्"}
              </button>
            </form>

            <div className="auth-switch">
              खाता छैन?{" "}
              <button onClick={() => onNavigate("register")}>अहिले दर्ता गर्नुहोस् →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}