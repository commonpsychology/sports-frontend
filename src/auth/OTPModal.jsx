/**
 * OTP Modal — pops up after registration
 * Props:
 *   email      — string, the email OTP was sent to
 *   onVerify   — callback when OTP verified successfully
 *   onClose    — callback to close/dismiss
 */
import React, { useState, useRef, useEffect } from "react";
import { GREEN, BLUE } from "../tokens.js";

const OTP_LENGTH = 6;

export default function OTPModal({ email, onVerify, onClose }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const inputs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    setError("");
    if (val && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(""));
      inputs.current[OTP_LENGTH - 1]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("कृपया सबै अंकहरू भर्नुहोस्।");
      return;
    }
    setLoading(true);
    setError("");
    // ── INTEGRATE YOUR API HERE ─────────────────────────────
    // const res = await fetch("/api/auth/verify-otp", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, otp: code })
    // });
    // const data = await res.json();
    // if (!res.ok) { setError(data.message); setLoading(false); return; }
    // ────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 1400)); // remove when real API connected
    setLoading(false);
    setSuccess(true);
    setTimeout(() => onVerify && onVerify(), 1800);
  };

  const handleResend = () => {
    setCountdown(59);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputs.current[0]?.focus();
    // ── INTEGRATE YOUR API HERE ─────────────────────────────
    // await fetch("/api/auth/resend-otp", { method: "POST", body: JSON.stringify({ email }) });
    // ────────────────────────────────────────────────────────
  };

  return (
    <div className="otp-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="otp-card">
        {success ? (
          <div className="otp-success">
            <div className="otp-success-icon">✅</div>
            <div className="otp-title" style={{ color: "#1a5c38" }}>प्रमाणित भयो!</div>
            <p style={{ fontSize: 14, color: "#6B7280" }}>तपाईंको खाता सफलतापूर्वक बन्यो। स्वागत छ!</p>
          </div>
        ) : (
          <>
            <div className="otp-icon">📱</div>
            <div className="otp-title">OTP प्रमाणीकरण</div>
            <p className="otp-sub">
              हामीले <strong>{email || "तपाईंको इमेल"}</strong> मा
              {OTP_LENGTH}-अंकको प्रमाणीकरण कोड पठाएका छौं।
            </p>

            <div className="otp-boxes">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputs.current[i] = el}
                  className={`otp-box${digit ? " filled" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && <p style={{ color: "#C0392B", fontSize: 13, marginBottom: 12 }}>{error}</p>}

            <button
              className="otp-verify-btn"
              onClick={handleVerify}
              disabled={loading || otp.join("").length < OTP_LENGTH}
            >
              {loading ? "प्रमाणित गर्दै..." : "✓ प्रमाणीकरण गर्नुहोस्"}
            </button>

            <div className="otp-resend">
              {countdown > 0 ? (
                <span>पुनः पठाउनुहोस् ({countdown}s)</span>
              ) : (
                <>
                  कोड आएन?{" "}
                  <button onClick={handleResend}>पुनः पठाउनुहोस्</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}