/**
 * ResetPasswordPage — 3-step flow:
 *   Step 1: Enter email → get OTP
 *   Step 2: Enter OTP (inline, not modal)
 *   Step 3: Enter new password
 *
 * Props: onNavigate(page)
 */
import React, { useState, useRef, useEffect } from "react";
import AUTH_CSS from "./authStyles.js";
import { LOGO_SRC } from "../logoData.js";
import { BLUE, DARK_BLUE, GREEN, RED, GOLD } from "../tokens.js";

const OTP_LENGTH = 6;

function passwordStrength(pwd) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s;
}
const strengthLabel = ["","कमजोर","ठीकठाक","राम्रो","उत्कृष्ट"];
const strengthColor  = ["","#C0392B","#E67E22","#F39C12","#27AE60"];

export default function ResetPasswordPage({ onNavigate }) {
  const [step, setStep]           = useState(1); // 1 | 2 | 3 | 4(success)
  const [email, setEmail]         = useState("");
  const [otp, setOtp]             = useState(Array(OTP_LENGTH).fill(""));
  const [pwd, setPwd]             = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd]     = useState(false);
  const [showCPwd, setShowCPwd]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [countdown, setCountdown] = useState(0);
  const otpInputs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  // Step 1 — Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError("मान्य इमेल राख्नुहोस्"); return; }
    setLoading(true); setError("");
    // ── API: POST /api/auth/forgot-password { email }
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setCountdown(59);
    setStep(2);
  };

  // Step 2 — Verify OTP
  const handleOTP = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val; setOtp(next); setError("");
    if (val && idx < OTP_LENGTH - 1) otpInputs.current[idx + 1]?.focus();
  };
  const handleOTPKey = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpInputs.current[idx - 1]?.focus();
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.join("").length < OTP_LENGTH) { setError("सबै अंकहरू भर्नुहोस्"); return; }
    setLoading(true); setError("");
    // ── API: POST /api/auth/verify-reset-otp { email, otp: otp.join("") }
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep(3);
  };

  // Step 3 — Set new password
  const handleNewPwd = async (e) => {
    e.preventDefault();
    if (pwd.length < 8) { setError("कम्तीमा ८ अक्षर चाहिन्छ"); return; }
    if (pwd !== confirmPwd) { setError("पासवर्ड मिलेन"); return; }
    setLoading(true); setError("");
    // ── API: POST /api/auth/reset-password { email, otp: otp.join(""), password: pwd }
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep(4);
  };

  const pwdStrength = passwordStrength(pwd);

  const stepTitles = {
    1: { icon: "🔑", title: "पासवर्ड रिसेट", sub: "दर्ता गरिएको इमेल राख्नुहोस्" },
    2: { icon: "📱", title: "OTP प्रमाणीकरण", sub: `${email} मा पठाइएको कोड" ` },
    3: { icon: "🔒", title: "नयाँ पासवर्ड", sub: "नयाँ पासवर्ड बनाउनुहोस्" },
    4: { icon: "✅", title: "सफल!", sub: "पासवर्ड सफलतापूर्वक परिवर्तन भयो" },
  };
  const current = stepTitles[step];

  return (
    <>
      <style>{AUTH_CSS}</style>
      <div className="auth-page">
        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-logo">
            <img src='/logo.png'  alt="Logo" />
            <div className="auth-left-logo-text">
              <div className="main">खेलौँ नेपाल</div>
              <div className="sub">Khelaun NEPAL</div>
            </div>
          </div>
          <h1 className="auth-tagline">
            तपाईंको खाता<br/><em>सुरक्षित</em> छ
          </h1>
          <p className="auth-tagline-sub">
            पासवर्ड बिर्सनु स्वाभाविक हो। केही चरणमा पुनः पहुँच पाउनुहोस्।
          </p>
          {/* Step indicators */}
          <div style={{ display: "flex", gap: 14, marginTop: 40, alignItems: "center" }}>
            {[1,2,3].map(n => (
              <React.Fragment key={n}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: step > n ? "#27AE60" : step === n ? "#fff" : "rgba(255,255,255,.2)",
                  color: step === n ? DARK_BLUE : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 15,
                  border: step === n ? "3px solid #fff" : "none",
                  transition: "all .3s",
                }}>
                  {step > n ? "✓" : n}
                </div>
                {n < 3 && <div style={{ flex: 1, height: 2, background: step > n ? "#27AE60" : "rgba(255,255,255,.2)", transition: "background .3s" }} />}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 200, marginTop: 8 }}>
            {["इमेल","OTP","पासवर्ड"].map((l,i) => (
              <span key={i} style={{ fontSize: 11, color: "rgba(255,255,255,.65)", textAlign: "center" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-card">
            {step < 4 && (
              <button className="auth-back" onClick={() => step === 1 ? onNavigate("login") : setStep(s => s - 1)}>
                ← {step === 1 ? "लगइनमा फर्कनुहोस्" : "पछाडि"}
              </button>
            )}

            <div className="auth-card-logo">
              <img src='/logo.png' alt="Logo" />
            </div>
            <div className="auth-card-title" style={{ fontSize: 36 }}>{current.icon}</div>
            <div className="auth-card-title">{current.title}</div>
            <div className="auth-card-sub">{current.sub}</div>

            {/* ── STEP 1: EMAIL ── */}
            {step === 1 && (
              <form onSubmit={handleSendOTP} noValidate>
                <div className="auth-field">
                  <label>इमेल ठेगाना</label>
                  <div className="auth-field-wrap">
                    <span className="f-icon">✉️</span>
                    <input className={`auth-input${error ? " error" : ""}`}
                      type="email" placeholder="your@email.com"
                      value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                      autoFocus />
                  </div>
                  {error && <p className="auth-err">{error}</p>}
                </div>
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? "पठाउँदैछ..." : "📨 OTP पठाउनुहोस्"}
                </button>
              </form>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} noValidate>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
                    📧 <strong style={{ color: DARK_BLUE }}>{email}</strong> मा OTP पठाइएको छ
                  </p>
                  <div className="otp-boxes" style={{ justifyContent: "center" }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => otpInputs.current[i] = el}
                        className={`otp-box${digit ? " filled" : ""}`}
                        type="text" inputMode="numeric" maxLength={1}
                        value={digit}
                        onChange={e => handleOTP(i, e.target.value)}
                        onKeyDown={e => handleOTPKey(i, e)}
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                  {error && <p className="auth-err" style={{ textAlign: "center" }}>{error}</p>}
                  <p style={{ fontSize: 12, color: "#6B7280", marginTop: 8 }}>
                    {countdown > 0
                      ? `पुनः पठाउनुहोस् (${countdown}s)`
                      : <button type="button" onClick={() => { setCountdown(59); setOtp(Array(OTP_LENGTH).fill("")); }}
                          style={{ background: "none", border: "none", color: BLUE, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                          पुनः OTP पठाउनुहोस्
                        </button>
                    }
                  </p>
                </div>
                <button type="submit" className="auth-submit" disabled={loading || otp.join("").length < OTP_LENGTH}>
                  {loading ? "जाँच्दैछ..." : "✓ OTP प्रमाणित गर्नुहोस्"}
                </button>
              </form>
            )}

            {/* ── STEP 3: NEW PASSWORD ── */}
            {step === 3 && (
              <form onSubmit={handleNewPwd} noValidate>
                <div className="auth-field">
                  <label>नयाँ पासवर्ड</label>
                  <div className="auth-field-wrap">
                    <span className="f-icon">🔒</span>
                    <input className={`auth-input${error && !confirmPwd ? " error" : ""}`}
                      type={showPwd ? "text" : "password"} placeholder="••••••••"
                      value={pwd} onChange={e => { setPwd(e.target.value); setError(""); }} />
                    <button type="button" className="auth-eye" onClick={() => setShowPwd(!showPwd)}>
                      {showPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {pwd && (
                    <div className="pwd-strength">
                      <div className="pwd-bars">
                        {[1,2,3,4].map(n => (
                          <div key={n} className={`pwd-bar${pwdStrength >= n ? ` s${pwdStrength}` : ""}`} />
                        ))}
                      </div>
                      <span className="pwd-strength-txt" style={{ color: strengthColor[pwdStrength] }}>
                        {strengthLabel[pwdStrength]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="auth-field">
                  <label>पासवर्ड पुन: टाइप गर्नुहोस्</label>
                  <div className="auth-field-wrap">
                    <span className="f-icon">🔒</span>
                    <input className={`auth-input${error ? " error" : ""}`}
                      type={showCPwd ? "text" : "password"} placeholder="••••••••"
                      value={confirmPwd} onChange={e => { setConfirmPwd(e.target.value); setError(""); }} />
                    <button type="button" className="auth-eye" onClick={() => setShowCPwd(!showCPwd)}>
                      {showCPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {error && <p className="auth-err">{error}</p>}
                </div>
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? "परिवर्तन हुँदैछ..." : "🔐 पासवर्ड परिवर्तन गर्नुहोस्"}
                </button>
              </form>
            )}

            {/* ── STEP 4: SUCCESS ── */}
            {step === 4 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 14, animation: "bounceIn .5s ease" }}>🎉</div>
                <div className="auth-success-banner">
                  पासवर्ड सफलतापूर्वक परिवर्तन भयो!
                </div>
                <p style={{ fontSize: 13.5, color: "#6B7280", marginBottom: 24, lineHeight: 1.7 }}>
                  अब नयाँ पासवर्ड प्रयोग गरेर लगइन गर्न सक्नुहुन्छ।
                </p>
                <button className="auth-submit" onClick={() => onNavigate("login")}>
                  🔑 लगइन गर्नुहोस्
                </button>
              </div>
            )}

            {step < 4 && (
              <div className="auth-switch">
                <button onClick={() => onNavigate("login")}>लगइनमा फर्कनुहोस्</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}