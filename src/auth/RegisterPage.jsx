/**
 * RegisterPage (Sign Up)
 * Props: onNavigate(page)
 * Shows OTPModal after successful form submit.
 */
import React, { useState } from "react";
import AUTH_CSS from "./authStyles.js";
import OTPModal from "./OTPModal.jsx";

const USER_TYPES = [
  { id: "player",  icon: "⚽", label: "खेलाडी" },
  { id: "fan",     icon: "📣", label: "प्रशंसक" },
  { id: "staff",   icon: "🏟️", label: "स्टाफ" },
  { id: "coach",   icon: "🎽", label: "प्रशिक्षक" },
];

const SPORTS = ["फुटबल","क्रिकेट","बास्केटबल","ब्याडमिन्टन","टेनिस","पौडी","कुस्ती","मुक्केबाजी","अन्य"];
const PROVINCES = ["कोशी","मधेश","बागमती","गण्डकी","लुम्बिनी","कर्णाली","सुदूरपश्चिम"];

function passwordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthLabel = ["", "कमजोर", "ठीकठाक", "राम्रो", "उत्कृष्ट"];
const strengthColor  = ["", "#C0392B", "#E67E22", "#F39C12", "#27AE60"];

export default function RegisterPage({ onNavigate }) {
  const [userType, setUserType] = useState("player");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", province: "",
    sport: "", password: "", confirmPassword: "", agreeTerms: false,
  });
  const [showPwd, setShowPwd]   = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});
  const [showOTP, setShowOTP]   = useState(false);

  const set = (k) => (e) =>
    setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "नाम आवश्यक छ";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "मान्य इमेल राख्नुहोस्";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "१० अंकको फोन नम्बर राख्नुहोस्";
    if (!form.province) e.province = "प्रदेश छान्नुहोस्";
    if (userType === "player" && !form.sport) e.sport = "खेल छान्नुहोस्";
    if (form.password.length < 8) e.password = "कम्तीमा ८ अक्षर चाहिन्छ";
    if (form.password !== form.confirmPassword) e.confirmPassword = "पासवर्ड मिलेन";
    if (!form.agreeTerms) e.agreeTerms = "सर्तहरूमा सहमत हुनुहोस्";
    return e;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setErrors({});
    // ── INTEGRATE YOUR API HERE ─────────────────────────────
    // const res = await fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...form, userType })
    // });
    // const data = await res.json();
    // if (!res.ok) { setErrors({ submit: data.message }); setLoading(false); return; }
    // After success the API should send OTP to form.email
    // ────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setShowOTP(true);
  };

  const pwd = passwordStrength(form.password);

  return (
    <>
      <style>{AUTH_CSS}</style>
      {showOTP && (
        <OTPModal
          email={form.email}
          onVerify={() => { setShowOTP(false); onNavigate("home"); }}
          onClose={() => setShowOTP(false)}
        />
      )}

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
            <em>नेपालको</em> खेलकुद<br/>परिवारमा जोडिनुहोस्!
          </h1>
          <p className="auth-tagline-sub">
            दर्ता गर्नुहोस् र खेलाडी प्रोफाइल, लाइभ स्कोर, तालिम सामग्री र राष्ट्रिय प्रतियोगितामा पहुँच पाउनुहोस्।
          </p>
          <div className="auth-left-stats">
            {[{n:"निःशुल्क",l:"खाता खोल्न"},{n:"तुरुन्त",l:"पहुँच पाउनुहोस्"},{n:"७५+",l:"जिल्ला केन्द्र"},{n:"५०,०००+",l:"सदस्यहरू"}]
              .map((s,i) => (
                <div key={i} className="auth-stat-pill">
                  <div className="auth-stat-num">{s.n}</div>
                  <div className="auth-stat-lbl">{s.l}</div>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right" style={{ overflowY: "auto", maxHeight: "100vh" }}>
          <div className="auth-card" style={{ margin: "20px 0" }}>
            <button className="auth-back" onClick={() => onNavigate("home")}>
              ← गृहपृष्ठमा फर्कनुहोस्
            </button>

            <div className="auth-card-logo">
              <img src='/logo.png' alt="Logo" />
            </div>
            <div className="auth-card-title">नयाँ खाता बनाउनुहोस्</div>
            <div className="auth-card-sub">तपाईं को हुनुहुन्छ छान्नुहोस्</div>

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

            <form onSubmit={handleRegister} noValidate>
              {/* Full name */}
              <div className="auth-field">
                <label>पूरा नाम</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">👤</span>
                  <input className={`auth-input${errors.fullName ? " error" : ""}`}
                    type="text" placeholder="Ram Bahadur Thapa"
                    value={form.fullName} onChange={set("fullName")} />
                </div>
                {errors.fullName && <p className="auth-err">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="auth-field">
                <label>इमेल ठेगाना</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">✉️</span>
                  <input className={`auth-input${errors.email ? " error" : ""}`}
                    type="email" placeholder="your@email.com"
                    value={form.email} onChange={set("email")} />
                </div>
                {errors.email && <p className="auth-err">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="auth-field">
                <label>फोन नम्बर</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">📞</span>
                  <input className={`auth-input${errors.phone ? " error" : ""}`}
                    type="tel" placeholder="98XXXXXXXX"
                    value={form.phone} onChange={set("phone")} />
                </div>
                {errors.phone && <p className="auth-err">{errors.phone}</p>}
              </div>

              {/* Province */}
              <div className="auth-field">
                <label>प्रदेश</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">🗺️</span>
                  <select className={`auth-input${errors.province ? " error" : ""}`}
                    value={form.province} onChange={set("province")}
                    style={{ paddingLeft: 40, appearance: "none", cursor: "pointer" }}>
                    <option value="">प्रदेश छान्नुहोस्</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                {errors.province && <p className="auth-err">{errors.province}</p>}
              </div>

              {/* Sport (only for player/coach) */}
              {(userType === "player" || userType === "coach") && (
                <div className="auth-field">
                  <label>मुख्य खेल</label>
                  <div className="auth-field-wrap">
                    <span className="f-icon">⚽</span>
                    <select className={`auth-input${errors.sport ? " error" : ""}`}
                      value={form.sport} onChange={set("sport")}
                      style={{ paddingLeft: 40, appearance: "none", cursor: "pointer" }}>
                      <option value="">खेल छान्नुहोस्</option>
                      {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {errors.sport && <p className="auth-err">{errors.sport}</p>}
                </div>
              )}

              {/* Password */}
              <div className="auth-field">
                <label>पासवर्ड</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">🔒</span>
                  <input className={`auth-input${errors.password ? " error" : ""}`}
                    type={showPwd ? "text" : "password"} placeholder="••••••••"
                    value={form.password} onChange={set("password")} />
                  <button type="button" className="auth-eye" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
                {form.password && (
                  <div className="pwd-strength">
                    <div className="pwd-bars">
                      {[1,2,3,4].map(n => (
                        <div key={n} className={`pwd-bar${pwd >= n ? ` s${pwd}` : ""}`} />
                      ))}
                    </div>
                    <span className="pwd-strength-txt" style={{ color: strengthColor[pwd] }}>
                      {strengthLabel[pwd]}
                    </span>
                  </div>
                )}
                {errors.password && <p className="auth-err">{errors.password}</p>}
              </div>

              {/* Confirm password */}
              <div className="auth-field">
                <label>पासवर्ड पुन: टाइप गर्नुहोस्</label>
                <div className="auth-field-wrap">
                  <span className="f-icon">🔒</span>
                  <input className={`auth-input${errors.confirmPassword ? " error" : ""}`}
                    type={showCPwd ? "text" : "password"} placeholder="••••••••"
                    value={form.confirmPassword} onChange={set("confirmPassword")} />
                  <button type="button" className="auth-eye" onClick={() => setShowCPwd(!showCPwd)}>
                    {showCPwd ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.confirmPassword && <p className="auth-err">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div className="auth-check">
                <input type="checkbox" id="terms" checked={form.agreeTerms} onChange={set("agreeTerms")} />
                <label htmlFor="terms">
                  मैले{" "}
                  <button
                    type="button"
                    className="auth-inline-link"
                    onClick={() => onNavigate("terms")}
                  >
                    सेवा सर्तहरू
                  </button>
                  {" "}र{" "}
                  <button
                    type="button"
                    className="auth-inline-link"
                    onClick={() => onNavigate("privacy")}
                  >
                    गोपनीयता नीति
                  </button>
                  {" "}पढेर सहमत छु।
                </label>
              </div>
              {errors.agreeTerms && <p className="auth-err" style={{ marginTop: -10, marginBottom: 10 }}>{errors.agreeTerms}</p>}

              {errors.submit && <p className="auth-err" style={{ marginBottom: 12 }}>⚠️ {errors.submit}</p>}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "खाता बन्दैछ..." : "🚀 खाता बनाउनुहोस्"}
              </button>
            </form>

            <div className="auth-switch">
              पहिले नै खाता छ?{" "}
              <button onClick={() => onNavigate("login")}>लगइन गर्नुहोस् →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}