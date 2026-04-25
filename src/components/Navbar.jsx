/**
 * Navbar — reusable across all pages except auth pages
 * Usage: <Navbar currentPage="home" onNavigate={setPage} />
 */
import React, { useState } from "react";
import { LOGO_SRC } from "../logoData.js";
import { RED, DARK_BLUE, BLUE, DARK_RED, ORANGE, GOLD } from "../tokens.js";

const navItems = [
  { label: "गृहपृष्ठ",    page: "home" },
  { label: "खेलहरू",       page: "sports" },
  { label: "कार्यक्रम",   page: "programs" },
  { label: "तालिम",        page: "training" },
  { label: "समाचार",       page: "news" },
  { label: "प्रतियोगिता", page: "competition" },
  { label: "हाम्रो बारे", page: "about" },
  { label: "सम्पर्क",     page: "contact" },
];

const NAV_CSS = `
.kn-nav{
  position:sticky;top:0;z-index:999;
  background:linear-gradient(110deg,${DARK_BLUE} 0%,${BLUE} 45%,#1e5799 70%,${DARK_RED} 100%);
  box-shadow:0 4px 28px rgba(0,0,0,0.38);
}
.kn-nav-inner{
  max-width:1400px;margin:0 auto;padding:0 24px;
  display:flex;align-items:center;justify-content:space-between;height:68px;
}
.kn-logo{display:flex;align-items:center;gap:12px;text-decoration:none;cursor:pointer;border:none;background:transparent}
.kn-logo img{width:48px;height:48px;border-radius:50%;object-fit:cover;
  box-shadow:0 0 0 3px rgba(255,255,255,0.22),0 4px 14px rgba(192,57,43,0.45);flex-shrink:0;}
.kn-logo-text{display:flex;flex-direction:column;line-height:1.1}
.kn-logo-text .main{font-size:21px;font-weight:800;color:#fff;letter-spacing:.5px}
.kn-logo-text .sub{font-size:9.5px;color:rgba(255,255,255,.65);letter-spacing:2px;text-transform:uppercase}
.kn-nav-links{display:flex;align-items:center;gap:2px}
.kn-nav-link{
  color:rgba(255,255,255,.82);text-decoration:none;
  padding:7px 12px;border-radius:8px;font-size:13.5px;font-weight:500;
  transition:all .2s;cursor:pointer;border:none;background:transparent;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.kn-nav-link:hover{background:rgba(255,255,255,.16);color:#fff}
.kn-nav-link.active{background:rgba(255,255,255,.2);color:#fff;font-weight:700}
.kn-nav-right{display:flex;align-items:center;gap:10px}
.kn-nav-login{
  background:rgba(255,255,255,.12);color:#fff;border:1.5px solid rgba(255,255,255,.35);
  padding:8px 18px;border-radius:22px;font-size:13px;font-weight:600;cursor:pointer;
  transition:all .2s;font-family:'Noto Sans Devanagari',sans-serif;
}
.kn-nav-login:hover{background:rgba(255,255,255,.22);border-color:#fff}
.kn-nav-cta{
  background:linear-gradient(135deg,${ORANGE},${GOLD});
  color:#fff;border:none;padding:9px 20px;border-radius:22px;
  font-size:13.5px;font-weight:700;cursor:pointer;
  box-shadow:0 4px 14px rgba(230,126,34,.5);
  transition:transform .2s,box-shadow .2s;
  font-family:'Noto Sans Devanagari',sans-serif;
}
.kn-nav-cta:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(230,126,34,.65)}
.kn-hamburger{display:none;background:transparent;border:none;cursor:pointer;padding:8px}
.kn-hamburger span{display:block;width:24px;height:2px;background:#fff;margin:5px 0;border-radius:2px;transition:.3s}
@media(max-width:920px){
  .kn-nav-links{display:none}
  .kn-nav-links.open{
    display:flex;flex-direction:column;position:absolute;
    top:68px;left:0;right:0;
    background:linear-gradient(180deg,${DARK_BLUE},${BLUE});
    padding:14px 20px 20px;gap:4px;
    box-shadow:0 10px 30px rgba(0,0,0,.35);
  }
  .kn-hamburger{display:block}
  .kn-nav-cta{display:none}
  .kn-nav-login{display:none}
}
`;

export default function Navbar({ currentPage = "home", onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (page) => {
    setMenuOpen(false);
    onNavigate && onNavigate(page);
  };

  return (
    <>
      <style>{NAV_CSS}</style>
      <nav className="kn-nav">
        <div className="kn-nav-inner">
          <button className="kn-logo" onClick={() => go("home")}>
            <img src="/logo.png" alt="खेलौँ नेपाल" />
            <div className="kn-logo-text">
              <span className="main">खेलौँ नेपाल</span>
              <span className="sub">Khelaun NEPAL</span>
            </div>
          </button>

          <div className={`kn-nav-links${menuOpen ? " open" : ""}`}>
            {navItems.map((item, i) => (
              <button
                key={i}
                className={`kn-nav-link${currentPage === item.page ? " active" : ""}`}
                onClick={() => go(item.page)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="kn-nav-right">
            <button className="kn-nav-login" onClick={() => go("login")}>
              🔑 लगइन
            </button>
            <button className="kn-nav-cta" onClick={() => go("register")}>
              दर्ता गर्नुहोस् 🚀
            </button>
            <button className="kn-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}