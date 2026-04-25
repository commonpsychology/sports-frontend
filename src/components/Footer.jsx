import React from "react";
import { DARK_BLUE, DARK_RED, GOLD } from "../tokens.js";

const FOOTER_CSS = `
.kn-footer{
  background:linear-gradient(110deg,${DARK_BLUE} 0%,#0a1628 50%,${DARK_RED} 100%);
  color:rgba(255,255,255,.78);padding:60px 0 0;
}
.kn-footer-inner{
  max-width:1400px;margin:0 auto;padding:0 24px;
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;
}
@media(max-width:900px){.kn-footer-inner{grid-template-columns:1fr 1fr}}
@media(max-width:500px){.kn-footer-inner{grid-template-columns:1fr}}
.kn-footer-logo-btn{display:flex;align-items:center;gap:12px;background:transparent;border:none;cursor:pointer;margin-bottom:14px}
.kn-footer-logo-btn img{width:44px;height:44px;border-radius:50%;object-fit:cover}
.kn-footer-socials{display:flex;gap:10px;margin-top:16px}
.kn-soc-btn{
  width:36px;height:36px;border-radius:9px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);
  color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:background .2s,transform .2s;text-decoration:none;
}
.kn-soc-btn:hover{transform:translateY(-2px)}
.kn-soc-btn.fb:hover{background:#1877F2}
.kn-soc-btn.xtwit:hover{background:#000}
.kn-soc-btn.ig:hover{background:#E1306C}
.kn-soc-btn.yt:hover{background:#FF0000}
.kn-footer-col h4{font-size:14.5px;font-weight:700;color:#fff;margin-bottom:18px}
.kn-footer-col a,.kn-footer-col button.kn-fcol-link{
  display:block;color:rgba(255,255,255,.62);text-decoration:none;font-size:13.5px;margin-bottom:9px;
  transition:color .2s;background:transparent;border:none;cursor:pointer;padding:0;
  font-family:'Noto Sans Devanagari',sans-serif;text-align:left;
}
.kn-footer-col a:hover,.kn-footer-col button.kn-fcol-link:hover{color:${GOLD}}
.kn-footer-bottom{
  border-top:1px solid rgba(255,255,255,.1);margin-top:48px;padding:22px 24px;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;
  max-width:1400px;margin-left:auto;margin-right:auto;
}
.kn-footer-bottom p{font-size:12.5px;color:rgba(255,255,255,.45)}
.kn-footer-bottom-links{display:flex;gap:18px}
.kn-footer-bottom-links a{font-size:12.5px;color:rgba(255,255,255,.45);text-decoration:none}
.kn-footer-bottom-links a:hover{color:${GOLD}}
.kn-logo-text-f{display:flex;flex-direction:column;line-height:1.1;text-align:left}
.kn-logo-text-f .main{font-size:19px;font-weight:800;color:#fff;letter-spacing:.5px}
.kn-logo-text-f .sub{font-size:9px;color:rgba(255,255,255,.55);letter-spacing:2px;text-transform:uppercase}
.kn-footer-desc{font-size:13.5px;line-height:1.8;margin:14px 0 6px;color:rgba(255,255,255,.65)}
.kn-fcol-sport-btn{display:block;color:rgba(255,255,255,.62);font-size:13.5px;margin-bottom:9px;transition:color .2s;background:transparent;border:none;cursor:pointer;padding:0;font-family:'Noto Sans Devanagari',sans-serif;text-align:left;}
.kn-fcol-sport-btn:hover{color:${GOLD}}
`;

var FB_PATH = "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.931-1.956 1.887v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z";
var X_PATH = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z";
var IG_PATH = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";
var YT_PATH = "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";

var SOCIALS = [
  { cls: "fb",    path: FB_PATH, size: 16, href: "https://facebook.com/khelaunnepal",  label: "Facebook"  },
  { cls: "xtwit", path: X_PATH,  size: 15, href: "https://x.com/khelaunnepal",         label: "X"         },
  { cls: "ig",    path: IG_PATH, size: 16, href: "https://instagram.com/khelaunnepal", label: "Instagram" },
  { cls: "yt",    path: YT_PATH, size: 17, href: "https://youtube.com/@khelaunnepal",  label: "YouTube"   },
];

function SocialLinks() {
  var links = SOCIALS.map(function(s) {
    var icon = React.createElement(
      "svg",
      { width: s.size, height: s.size, viewBox: "0 0 24 24", fill: "currentColor" },
      React.createElement("path", { d: s.path })
    );
    return React.createElement("a", {
      key: s.cls,
      href: s.href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "kn-soc-btn " + s.cls,
      "aria-label": s.label,
      title: s.label,
    }, icon);
  });
  return React.createElement("div", { className: "kn-footer-socials" }, links);
}

export default function Footer({ onNavigate }) {
  var go = function(page) { if (onNavigate) onNavigate(page); };

  var quickLinks = [
    { label: "गृहपृष्ठ", page: "home" },
    { label: "हाम्रो बारे", page: "about" },
    { label: "खेलहरू", page: "sports" },
    { label: "कार्यक्रम", page: "programs" },
    { label: "समाचार", page: "news" },
    { label: "सम्पर्क", page: "contact" },
  ];

  var sportLinks = ["फुटबल","क्रिकेट","बास्केटबल","ब्याडमिन्टन","पौडी","कुस्ती"];
  var contactLinks = [
    { label: "📍 काठमाडौं, नेपाल",       href: "https://maps.google.com/?q=Kathmandu,Nepal" },
    { label: "📞 ०१-४४४४४४४",            href: "tel:+977-1-4444444" },
    { label: "✉️ info@khelaunnepal.com", href: "mailto:info@khelaunnepal.com" },
    { label: "🕐 सोम–शुक्र: ९–५",        href: null },
  ];

  return (
    <React.Fragment>
      <style>{FOOTER_CSS}</style>
      <footer className="kn-footer">
        <div className="kn-footer-inner">

          <div>
            <button className="kn-footer-logo-btn" onClick={function() { go("home"); }}>
              <img src="/logo.png" alt="खेलौँ नेपाल" />
              <div className="kn-logo-text-f">
                <span className="main">खेलौँ नेपाल</span>
                <span className="sub">Khelaun NEPAL</span>
              </div>
            </button>
            <p className="kn-footer-desc">खेलकुदको माध्यमद्वारा स्वस्थ, सक्रिय र समृद्ध नेपाल निर्माण गर्ने हाम्रो संकल्प।</p>
            <SocialLinks />
          </div>

          <div className="kn-footer-col">
            <h4>द्रुत लिंकहरू</h4>
            {quickLinks.map(function(l, i) {
              return (
                <button key={i} className="kn-fcol-link" onClick={function() { go(l.page); }}>
                  {l.label}
                </button>
              );
            })}
          </div>

          <div className="kn-footer-col">
            <h4>खेलकुद</h4>
            {sportLinks.map(function(l, i) {
              return (
                <button key={i} className="kn-fcol-sport-btn" onClick={function() { go("sports"); }}>
                  {l}
                </button>
              );
            })}
          </div>

          <div className="kn-footer-col">
            <h4>सम्पर्क</h4>
            {contactLinks.map(function(c, i) {
              if (c.href) {
                return React.createElement("a", {
                  key: i,
                  href: c.href,
                  target: c.href.startsWith("http") ? "_blank" : undefined,
                  rel: c.href.startsWith("http") ? "noopener noreferrer" : undefined,
                }, c.label);
              }
              return (
                <span key={i} style={{ display: "block", color: "rgba(255,255,255,.62)", fontSize: 13.5, marginBottom: 9 }}>
                  {c.label}
                </span>
              );
            })}
          </div>

        </div>

        <div className="kn-footer-bottom">
          <p>© २०८१ खेलौँ नेपाल। सर्वाधिकार सुरक्षित।</p>
          <div className="kn-footer-bottom-links">
            <button className="kn-fcol-link" onClick={function() { go("privacy"); }}>गोपनीयता नीति</button>
            <button className="kn-fcol-link" onClick={function() { go("terms"); }}>सेवा सर्तहरू</button>
            <button className="kn-fcol-link" onClick={function() { go("sitemap"); }}>साइटम्याप</button>
          </div>
        </div>

      </footer>
    </React.Fragment>
  );
}