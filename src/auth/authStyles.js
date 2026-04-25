import { RED, DARK_RED, BLUE, DARK_BLUE, ORANGE, GOLD, MUTED, LIGHT, GREEN } from "../tokens.js";

const AUTH_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Sans Devanagari',sans-serif;overflow-x:hidden}

/* ─ AUTH PAGE WRAPPER ─ */
.auth-page{
  min-height:100vh;display:flex;
  background:linear-gradient(135deg,${DARK_BLUE} 0%,${BLUE} 40%,#1e5799 65%,${DARK_RED} 100%);
  position:relative;overflow:hidden;
}
.auth-page::before{
  content:'';position:absolute;inset:0;
  background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='28'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* ─ LEFT PANEL (branding) ─ */
.auth-left{
  flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;
  padding:60px 48px;position:relative;
}
@media(max-width:900px){.auth-left{display:none}}
.auth-left-logo{display:flex;align-items:center;gap:14px;margin-bottom:48px}
.auth-left-logo img{width:72px;height:72px;border-radius:50%;object-fit:cover;
  box-shadow:0 0 0 4px rgba(255,255,255,.2),0 8px 28px rgba(0,0,0,.3)}
.auth-left-logo-text .main{font-size:28px;font-weight:800;color:#fff}
.auth-left-logo-text .sub{font-size:11px;color:rgba(255,255,255,.55);letter-spacing:2px;text-transform:uppercase}
.auth-tagline{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;color:#fff;line-height:1.25;margin-bottom:18px;text-align:center}
.auth-tagline em{color:${GOLD};font-style:normal}
.auth-tagline-sub{font-size:15px;color:rgba(255,255,255,.72);line-height:1.8;text-align:center;max-width:380px}
.auth-left-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:48px;width:100%;max-width:360px}
.auth-stat-pill{
  background:rgba(255,255,255,.1);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.18);border-radius:16px;
  padding:18px 14px;text-align:center;
}
.auth-stat-num{font-size:24px;font-weight:800;color:${GOLD}}
.auth-stat-lbl{font-size:11px;color:rgba(255,255,255,.7);margin-top:4px}

/* ─ RIGHT PANEL (form) ─ */
.auth-right{
  width:480px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  padding:40px 32px;position:relative;
}
@media(max-width:900px){.auth-right{width:100%;padding:32px 20px}}
.auth-card{
  width:100%;max-width:420px;
  background:rgba(255,255,255,.97);backdrop-filter:blur(20px);
  border-radius:28px;padding:40px 36px;
  box-shadow:0 32px 80px rgba(0,0,0,.35);
}
@media(max-width:480px){.auth-card{padding:28px 20px;border-radius:20px}}

/* ─ BACK BUTTON ─ */
.auth-back{
  display:flex;align-items:center;gap:7px;
  background:transparent;border:none;cursor:pointer;
  color:${BLUE};font-size:13.5px;font-weight:600;margin-bottom:24px;padding:0;
  font-family:'Noto Sans Devanagari',sans-serif;transition:opacity .2s;
}
.auth-back:hover{opacity:.7}

/* ─ CARD HEADER ─ */
.auth-card-logo{display:flex;justify-content:center;margin-bottom:20px}
.auth-card-logo img{width:56px;height:56px;border-radius:50%;object-fit:cover;
  box-shadow:0 4px 16px rgba(26,58,107,.25)}
.auth-card-title{font-size:22px;font-weight:800;color:${DARK_BLUE};text-align:center;margin-bottom:6px}
.auth-card-sub{font-size:13px;color:${MUTED};text-align:center;margin-bottom:28px}

/* ─ USER TYPE TABS ─ */
.auth-user-tabs{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap}
.auth-user-tab{
  flex:1;min-width:80px;
  padding:9px 8px;border-radius:10px;border:2px solid #e5e7eb;
  background:#fff;cursor:pointer;text-align:center;
  font-size:12px;font-weight:600;color:${MUTED};transition:all .2s;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.auth-user-tab:hover{border-color:${BLUE};color:${BLUE}}
.auth-user-tab.active{border-color:${BLUE};background:${BLUE};color:#fff}
.auth-user-tab .tab-icon{font-size:18px;display:block;margin-bottom:4px}

/* ─ FORM FIELDS ─ */
.auth-field{margin-bottom:16px}
.auth-field label{display:block;font-size:12.5px;font-weight:600;color:${DARK_BLUE};margin-bottom:6px}
.auth-field-wrap{position:relative}
.auth-field-wrap .f-icon{
  position:absolute;left:13px;top:50%;transform:translateY(-50%);
  font-size:16px;color:${MUTED};pointer-events:none;
}
.auth-input{
  width:100%;padding:12px 14px 12px 40px;
  border:2px solid #e5e7eb;border-radius:12px;
  font-size:14px;font-family:'Noto Sans Devanagari',sans-serif;
  color:${DARK_BLUE};background:#fff;outline:none;transition:border-color .2s,box-shadow .2s;
}
.auth-input:focus{border-color:${BLUE};box-shadow:0 0 0 3px rgba(26,58,107,.1)}
.auth-input.error{border-color:${RED};box-shadow:0 0 0 3px rgba(192,57,43,.1)}
.auth-input-no-icon{padding-left:14px}
.auth-err{font-size:11.5px;color:${RED};margin-top:5px;font-weight:500}

/* ─ PASSWORD TOGGLE ─ */
.auth-eye{
  position:absolute;right:13px;top:50%;transform:translateY(-50%);
  background:transparent;border:none;cursor:pointer;font-size:16px;color:${MUTED};
}

/* ─ SUBMIT BUTTON ─ */
.auth-submit{
  width:100%;padding:14px;border-radius:14px;border:none;cursor:pointer;
  font-size:15px;font-weight:700;color:#fff;margin-top:8px;
  background:linear-gradient(135deg,${DARK_BLUE},${BLUE});
  box-shadow:0 6px 22px rgba(26,58,107,.4);
  transition:transform .2s,box-shadow .2s;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.auth-submit:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(26,58,107,.5)}
.auth-submit:disabled{opacity:.6;cursor:not-allowed;transform:none}

/* ─ DIVIDER ─ */
.auth-divider{display:flex;align-items:center;gap:12px;margin:18px 0}
.auth-divider span{font-size:12px;color:${MUTED}}
.auth-divider hr{flex:1;border:none;border-top:1px solid #e5e7eb}

/* ─ SWITCH LINK ─ */
.auth-switch{text-align:center;font-size:13.5px;color:${MUTED};margin-top:18px}
.auth-switch button{
  background:transparent;border:none;cursor:pointer;
  color:${BLUE};font-weight:700;font-size:13.5px;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.auth-switch button:hover{text-decoration:underline}

/* ─ FORGOT LINK ─ */
.auth-forgot{
  text-align:right;background:transparent;border:none;cursor:pointer;
  color:${BLUE};font-size:12px;font-weight:600;margin-top:4px;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.auth-forgot:hover{text-decoration:underline}

/* ─ OTP MODAL ─ */
.otp-overlay{
  position:fixed;inset:0;z-index:9999;
  background:rgba(0,0,0,.6);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:center;padding:20px;
  animation:fadeIn .3s ease;
}
.otp-card{
  background:#fff;border-radius:28px;padding:40px 36px;width:100%;max-width:400px;
  box-shadow:0 40px 100px rgba(0,0,0,.4);text-align:center;
  animation:slideUp .35s ease;
}
.otp-icon{font-size:52px;margin-bottom:14px}
.otp-title{font-size:22px;font-weight:800;color:${DARK_BLUE};margin-bottom:8px}
.otp-sub{font-size:13.5px;color:${MUTED};line-height:1.7;margin-bottom:28px}
.otp-sub strong{color:${DARK_BLUE}}
.otp-boxes{display:flex;gap:10px;justify-content:center;margin-bottom:24px}
.otp-box{
  width:52px;height:60px;border:2.5px solid #e5e7eb;border-radius:14px;
  font-size:22px;font-weight:700;color:${DARK_BLUE};text-align:center;
  outline:none;transition:border-color .2s,box-shadow .2s;
  font-family:'Noto Sans Devanagari',sans-serif;background:#fff;
}
.otp-box:focus{border-color:${BLUE};box-shadow:0 0 0 3px rgba(26,58,107,.15)}
.otp-box.filled{border-color:${GREEN};background:rgba(39,174,96,.06)}
.otp-verify-btn{
  width:100%;padding:14px;border-radius:14px;border:none;cursor:pointer;
  font-size:15px;font-weight:700;color:#fff;
  background:linear-gradient(135deg,${GREEN},#20c997);
  box-shadow:0 6px 22px rgba(39,174,96,.35);
  transition:transform .2s;font-family:'Noto Sans Devanagari',sans-serif;
}
.otp-verify-btn:hover{transform:translateY(-2px)}
.otp-verify-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}
.otp-resend{margin-top:16px;font-size:13px;color:${MUTED}}
.otp-resend button{
  background:transparent;border:none;cursor:pointer;
  color:${BLUE};font-weight:600;font-size:13px;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.otp-resend button:disabled{color:${MUTED};cursor:not-allowed}
.otp-success{display:flex;flex-direction:column;align-items:center;gap:14px}
.otp-success-icon{font-size:64px;animation:bounceIn .5s ease}

/* ─ PASSWORD STRENGTH ─ */
.pwd-strength{margin-top:8px}
.pwd-bars{display:flex;gap:4px;margin-bottom:5px}
.pwd-bar{height:3px;flex:1;border-radius:2px;background:#e5e7eb;transition:background .3s}
.pwd-bar.s1{background:${RED}}
.pwd-bar.s2{background:${ORANGE}}
.pwd-bar.s3{background:${GOLD}}
.pwd-bar.s4{background:${GREEN}}
.pwd-strength-txt{font-size:11px;color:${MUTED}}

/* ─ CHECKBOX ─ */
.auth-check{display:flex;align-items:flex-start;gap:8px;margin-bottom:16px}
.auth-check input{width:16px;height:16px;margin-top:2px;accent-color:${BLUE};flex-shrink:0}
.auth-check label{font-size:12.5px;color:${MUTED};line-height:1.5;cursor:pointer}
.auth-check label a{color:${BLUE};font-weight:600}

/* ─ SUCCESS STATES ─ */
.auth-success-banner{
  background:rgba(39,174,96,.1);border:1.5px solid rgba(39,174,96,.3);
  border-radius:12px;padding:12px 16px;margin-bottom:18px;
  font-size:13.5px;color:#1a5c38;font-weight:500;text-align:center;
}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes bounceIn{0%{transform:scale(.3)}50%{transform:scale(1.1)}70%{transform:scale(.9)}100%{transform:scale(1)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
`;

export default AUTH_CSS;