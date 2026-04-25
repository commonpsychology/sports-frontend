/**
 * Homepage — content only (no Navbar/Footer, those come from Layout)
 */
import React, { useState, useEffect, useCallback } from "react";
import { RED, DARK_RED, BLUE, DARK_BLUE, ORANGE, GREEN, GOLD, MUTED, LIGHT } from "../tokens.js";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Noto Sans Devanagari',sans-serif;color:#1a1a2e;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#f0f0f0}
::-webkit-scrollbar-thumb{background:${BLUE};border-radius:3px}

/* ─ HERO ─ */
.kn-hero{position:relative;overflow:hidden;height:88vh;min-height:480px;max-height:800px}
.kn-slide{position:absolute;inset:0;opacity:0;transition:opacity 1s ease;background-size:cover;background-position:center;}
.kn-slide.active{opacity:1}
.kn-slide-overlay{position:absolute;inset:0;background:linear-gradient(120deg,rgba(13,31,60,.88) 0%,rgba(26,58,107,.55) 45%,rgba(139,26,26,.52) 100%);}
.kn-slide-content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 8%;max-width:860px;}
.kn-slide-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.28);color:#fff;padding:6px 16px;border-radius:20px;font-size:12.5px;font-weight:600;margin-bottom:18px;width:fit-content;letter-spacing:.8px;}
.kn-slide-title{font-size:clamp(1.9rem,4.8vw,3.7rem);font-weight:800;color:#fff;line-height:1.18;margin-bottom:16px;text-shadow:0 2px 24px rgba(0,0,0,.45);}
.kn-slide-title em{color:${GOLD};font-style:normal}
.kn-slide-desc{font-size:clamp(13px,1.9vw,17px);color:rgba(255,255,255,.88);line-height:1.75;margin-bottom:30px;max-width:560px;}
.kn-slide-btns{display:flex;gap:12px;flex-wrap:wrap}
.kn-btn-p{background:linear-gradient(135deg,${RED},${ORANGE});color:#fff;border:none;padding:13px 30px;border-radius:28px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 6px 22px rgba(192,57,43,.48);transition:transform .2s,box-shadow .2s;font-family:'Noto Sans Devanagari',sans-serif;}
.kn-btn-p:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(192,57,43,.6)}
.kn-btn-s{background:rgba(255,255,255,.14);backdrop-filter:blur(8px);color:#fff;border:1.5px solid rgba(255,255,255,.48);padding:11px 26px;border-radius:28px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Noto Sans Devanagari',sans-serif;}
.kn-btn-s:hover{background:rgba(255,255,255,.26);border-color:#fff}
.kn-dots{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);display:flex;gap:8px;}
.kn-dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.38);border:none;cursor:pointer;transition:.3s;}
.kn-dot.active{background:${GOLD};width:26px;border-radius:5px}
.kn-arrows{position:absolute;top:50%;transform:translateY(-50%);width:100%;display:flex;justify-content:space-between;padding:0 14px;pointer-events:none}
.kn-arrow{width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.16);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.28);color:#fff;font-size:18px;cursor:pointer;pointer-events:all;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.kn-arrow:hover{background:rgba(255,255,255,.3)}

/* ─ STATS ─ */
.kn-stats{background:linear-gradient(110deg,${DARK_BLUE} 0%,${BLUE} 50%,#1e5799 80%,${DARK_RED} 100%);padding:22px 0;}
.kn-stats-inner{max-width:1400px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr);}
.kn-stat{text-align:center;padding:10px;border-right:1px solid rgba(255,255,255,.13)}
.kn-stat:last-child{border-right:none}
.kn-stat-num{font-size:30px;font-weight:800;color:${GOLD};line-height:1}
.kn-stat-lbl{font-size:12px;color:rgba(255,255,255,.72);margin-top:5px;font-weight:500}
@media(max-width:580px){
  .kn-stats-inner{grid-template-columns:repeat(2,1fr)}
  .kn-stat:nth-child(2){border-right:none}
  .kn-stat:nth-child(1),.kn-stat:nth-child(2){border-bottom:1px solid rgba(255,255,255,.1)}
}

/* ─ SECTIONS ─ */
.kn-sec{max-width:1400px;margin:0 auto;padding:68px 24px}
.kn-sec-hd{text-align:center;margin-bottom:48px}
.kn-sec-tag{display:inline-block;background:linear-gradient(135deg,${RED},${ORANGE});color:#fff;padding:5px 15px;border-radius:20px;font-size:11.5px;font-weight:700;letter-spacing:1.2px;margin-bottom:11px;}
.kn-sec-title{font-size:clamp(1.55rem,3.3vw,2.5rem);font-weight:800;color:${DARK_BLUE};margin-bottom:12px}
.kn-sec-title span{color:${RED}}
.kn-divider{width:54px;height:4px;border-radius:2px;background:linear-gradient(90deg,${RED},${ORANGE});margin:12px auto 0}
.kn-sec-desc{font-size:15px;color:${MUTED};max-width:580px;margin:14px auto 0;line-height:1.8}

/* ─ SPORTS ─ */
.kn-sports-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:14px}
.kn-sport-card{background:#fff;border-radius:16px;padding:22px 14px;text-align:center;box-shadow:0 3px 16px rgba(0,0,0,.07);border:2px solid transparent;cursor:pointer;transition:all .28s;}
.kn-sport-card:hover{border-color:${BLUE};transform:translateY(-4px);box-shadow:0 10px 28px rgba(26,58,107,.16)}
.kn-sport-icon{font-size:34px;margin-bottom:9px}
.kn-sport-name{font-size:12.5px;font-weight:600;color:${DARK_BLUE}}

/* ─ FEATURES ─ */
.kn-feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:22px}
.kn-feat-card{background:#fff;border-radius:20px;padding:30px;box-shadow:0 4px 22px rgba(0,0,0,.07);position:relative;overflow:hidden;transition:all .28s;}
.kn-feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px}
.kn-feat-card.c1::before{background:linear-gradient(90deg,${RED},${ORANGE})}
.kn-feat-card.c2::before{background:linear-gradient(90deg,${BLUE},#4A90D9)}
.kn-feat-card.c3::before{background:linear-gradient(90deg,${GREEN},#52D5A0)}
.kn-feat-card.c4::before{background:linear-gradient(90deg,${GOLD},${ORANGE})}
.kn-feat-card:hover{transform:translateY(-5px);box-shadow:0 14px 38px rgba(0,0,0,.11)}
.kn-feat-icon{width:52px;height:52px;border-radius:13px;margin-bottom:18px;display:flex;align-items:center;justify-content:center;font-size:24px}
.kn-feat-icon.c1{background:rgba(192,57,43,.1)}
.kn-feat-icon.c2{background:rgba(26,58,107,.1)}
.kn-feat-icon.c3{background:rgba(39,174,96,.1)}
.kn-feat-icon.c4{background:rgba(243,156,18,.1)}
.kn-feat-title{font-size:16px;font-weight:700;color:${DARK_BLUE};margin-bottom:9px}
.kn-feat-desc{font-size:13.5px;color:${MUTED};line-height:1.7}

/* ─ PROGRAMS ─ */
.kn-prog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:22px}
.kn-prog-card{border-radius:20px;overflow:hidden;box-shadow:0 5px 26px rgba(0,0,0,.09);transition:all .28s;cursor:pointer}
.kn-prog-card:hover{transform:translateY(-5px);box-shadow:0 14px 44px rgba(0,0,0,.16)}
.kn-prog-hd{height:150px;display:flex;align-items:center;justify-content:center;font-size:54px}
.kn-prog-body{background:#fff;padding:22px}
.kn-prog-title{font-size:17px;font-weight:700;color:${DARK_BLUE};margin-bottom:7px}
.kn-prog-desc{font-size:13.5px;color:${MUTED};line-height:1.7;margin-bottom:14px}
.kn-prog-tag{display:inline-block;padding:4px 13px;border-radius:20px;font-size:11.5px;font-weight:600}

/* ─ NEWS ─ */
.kn-news-grid{display:grid;grid-template-columns:2fr 1fr;gap:22px}
@media(max-width:800px){.kn-news-grid{grid-template-columns:1fr}}
.kn-news-main{border-radius:20px;overflow:hidden;box-shadow:0 7px 28px rgba(0,0,0,.11);cursor:pointer;transition:transform .28s}
.kn-news-main:hover{transform:translateY(-4px)}
.kn-news-img{height:240px;display:flex;align-items:center;justify-content:center;font-size:60px;background:linear-gradient(135deg,${DARK_BLUE},${BLUE},${RED})}
.kn-news-body{background:#fff;padding:22px}
.kn-news-cat{display:inline-block;background:${RED};color:#fff;padding:4px 11px;border-radius:12px;font-size:10.5px;font-weight:700;margin-bottom:11px;letter-spacing:.8px}
.kn-news-title{font-size:19px;font-weight:700;color:${DARK_BLUE};margin-bottom:9px;line-height:1.45}
.kn-news-meta{font-size:12.5px;color:${MUTED}}
.kn-news-list{display:flex;flex-direction:column;gap:12px}
.kn-news-item{background:#fff;border-radius:14px;padding:14px;display:flex;gap:12px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06);transition:all .2s}
.kn-news-item:hover{transform:translateX(4px);box-shadow:0 4px 18px rgba(0,0,0,.1)}
.kn-news-item-img{width:68px;height:68px;border-radius:10px;flex-shrink:0;background:linear-gradient(135deg,${BLUE},${DARK_BLUE});display:flex;align-items:center;justify-content:center;font-size:26px}
.kn-news-item-title{font-size:13.5px;font-weight:600;color:${DARK_BLUE};line-height:1.45;margin-bottom:5px}
.kn-news-item-meta{font-size:11.5px;color:${MUTED}}

/* ─ ACHIEVEMENTS ─ */
.kn-ach-bg{background:linear-gradient(110deg,${DARK_BLUE} 0%,${BLUE} 45%,#1e5799 75%,${DARK_RED} 100%);padding:68px 0;}
.kn-ach-inner{max-width:1400px;margin:0 auto;padding:0 24px}
.kn-ach-hd{text-align:center;margin-bottom:48px}
.kn-ach-tag{display:inline-block;background:rgba(255,255,255,.18);color:#fff;padding:5px 15px;border-radius:20px;font-size:11.5px;font-weight:700;letter-spacing:1.2px;margin-bottom:11px}
.kn-ach-title{font-size:clamp(1.55rem,3.3vw,2.5rem);font-weight:800;color:#fff}
.kn-ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:18px}
.kn-ach-card{background:rgba(255,255,255,.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);border-radius:20px;padding:26px 18px;text-align:center;transition:all .28s;}
.kn-ach-card:hover{background:rgba(255,255,255,.18);transform:translateY(-4px)}
.kn-ach-icon{font-size:38px;margin-bottom:10px}
.kn-ach-num{font-size:34px;font-weight:800;color:${GOLD};line-height:1}
.kn-ach-lbl{font-size:13px;color:rgba(255,255,255,.82);margin-top:7px;font-weight:500}

/* ─ TESTIMONIALS ─ */
.kn-testi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:22px}
.kn-testi-card{background:#fff;border-radius:20px;padding:26px;box-shadow:0 4px 22px rgba(0,0,0,.07);border-left:4px solid ${RED};transition:all .28s;}
.kn-testi-card:hover{transform:translateY(-4px);box-shadow:0 10px 36px rgba(0,0,0,.11)}
.kn-testi-q{font-size:44px;color:${RED};line-height:1;margin-bottom:10px}
.kn-testi-txt{font-size:14.5px;color:${MUTED};line-height:1.8;margin-bottom:18px;font-style:italic}
.kn-testi-author{display:flex;align-items:center;gap:11px}
.kn-testi-av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,${BLUE},${RED});display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;flex-shrink:0}
.kn-testi-name{font-size:13.5px;font-weight:700;color:${DARK_BLUE}}
.kn-testi-role{font-size:11.5px;color:${MUTED}}

/* ─ APP ─ */
.kn-app-bg{background:linear-gradient(135deg,${LIGHT} 0%,rgba(26,58,107,.06) 100%);padding:68px 0}
.kn-app-inner{max-width:1400px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
@media(max-width:800px){.kn-app-inner{grid-template-columns:1fr}}
.kn-app-title{font-size:clamp(1.7rem,3.8vw,2.9rem);font-weight:800;color:${DARK_BLUE};line-height:1.22;margin-bottom:14px}
.kn-app-title span{color:${RED}}
.kn-app-desc{font-size:15px;color:${MUTED};line-height:1.8;margin-bottom:30px}
.kn-app-btns{display:flex;gap:14px;flex-wrap:wrap}
.kn-store-btn{display:flex;align-items:center;gap:11px;background:${DARK_BLUE};color:#fff;padding:13px 22px;border-radius:13px;cursor:pointer;border:none;font-family:'Noto Sans Devanagari',sans-serif;transition:all .2s;box-shadow:0 4px 14px rgba(0,0,0,.2);}
.kn-store-btn:hover{background:${BLUE};transform:translateY(-2px)}
.kn-store-btn .s-icon{font-size:26px}
.kn-store-btn small{display:block;font-size:9.5px;opacity:.7}
.kn-store-btn strong{display:block;font-size:15px;font-weight:700}
.kn-phone{background:linear-gradient(135deg,${DARK_BLUE},${BLUE});border-radius:30px;padding:18px;max-width:270px;margin:0 auto;box-shadow:0 22px 60px rgba(26,58,107,.32);}
.kn-phone-screen{background:${LIGHT};border-radius:22px;height:390px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:60px;}
.kn-phone-screen p{font-size:15px;font-weight:600;color:${DARK_BLUE};margin-top:14px}

/* ─ PARTNERS ─ */
.kn-partners-bg{background:${LIGHT};padding:48px 0}
.kn-partners-inner{max-width:1400px;margin:0 auto;padding:0 24px;text-align:center}
.kn-partners-title{font-size:13px;font-weight:600;color:${MUTED};letter-spacing:2px;text-transform:uppercase;margin-bottom:28px}
.kn-partners-list{display:flex;flex-wrap:wrap;justify-content:center;gap:16px}
.kn-partner-badge{background:#fff;padding:12px 22px;border-radius:12px;font-size:13.5px;font-weight:600;color:${DARK_BLUE};box-shadow:0 2px 10px rgba(0,0,0,.06);border:1px solid rgba(0,0,0,.05);}

/* ─ CTA BANNER ─ */
.kn-cta-banner{background:linear-gradient(110deg,${DARK_BLUE},${BLUE},${DARK_RED});padding:60px 24px;text-align:center}
.kn-cta-title{font-size:clamp(1.6rem,3.5vw,2.6rem);font-weight:800;color:#fff;margin-bottom:12px}
.kn-cta-title em{color:${GOLD};font-style:normal}
.kn-cta-sub{font-size:15px;color:rgba(255,255,255,.78);margin-bottom:32px}
.kn-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.kn-cta-btn-p{background:linear-gradient(135deg,${ORANGE},${GOLD});color:#fff;border:none;padding:14px 34px;border-radius:28px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 6px 22px rgba(230,126,34,.5);transition:transform .2s;font-family:'Noto Sans Devanagari',sans-serif;}
.kn-cta-btn-p:hover{transform:translateY(-3px)}
.kn-cta-btn-s{background:rgba(255,255,255,.14);color:#fff;border:1.5px solid rgba(255,255,255,.45);padding:12px 28px;border-radius:28px;font-size:16px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Noto Sans Devanagari',sans-serif;}
.kn-cta-btn-s:hover{background:rgba(255,255,255,.25)}

@keyframes fadeInUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeInUp .65s ease both}
`;

const heroSlides = [
  { img: "/homepage1.png", tag: "🇳🇵 राष्ट्रिय खेलकुद अभियान",
    title: <>नेपालको खेलकुद <em>क्रान्ति</em> सुरु होस्</>,
    desc: "खेलौँ नेपाल — राष्ट्रिय खेलकुद विकास, स्वास्थ्य संवर्धन र युवा प्रतिभा उत्थानको लागि समर्पित मञ्च।",
    btn1: "अहिले सुरु गर्नुहोस्", btn2: "थप जान्नुहोस्" },
  { img: "/homepage3.png", tag: "🏅 युवा प्रतिभा विकास",
    title: <>युवा खेलाडीको <em>सपना</em> पूरा गरौं</>,
    desc: "देशभरका प्रतिभाशाली युवा खेलाडीहरूलाई उचित तालिम, सुविधा र अवसर प्रदान गरेर राष्ट्रिय मञ्चमा पुर्‍याउने लक्ष्य।",
    btn1: "खेलाडी दर्ता", btn2: "कार्यक्रम हेर्नुस्" },
  { img: "/homepage.png", tag: "💪 स्वास्थ्य र समृद्धि",
    title: <><em>स्वस्थ</em> नागरिक, <em>समृद्ध</em> नेपाल</>,
    desc: "खेलकुदको माध्यमबाट शारीरिक तन्दुरुस्ती, मानसिक स्वास्थ्य र सामाजिक एकताको भावना जागृत गर्ने मिसन।",
    btn1: "स्वास्थ्य केन्द्र", btn2: "हाम्रो कार्यक्रम" },
];

const sports = [
  {icon:"⚽",name:"फुटबल"},{icon:"🏏",name:"क्रिकेट"},{icon:"🏀",name:"बास्केटबल"},
  {icon:"🏸",name:"ब्याडमिन्टन"},{icon:"🎾",name:"टेनिस"},{icon:"🏊",name:"पौडी"},
  {icon:"🚴",name:"साइकलिङ"},{icon:"🏋️",name:"भारोत्तोलन"},{icon:"🤼",name:"कुस्ती"},
  {icon:"🥊",name:"मुक्केबाजी"},{icon:"🏃",name:"दौड"},{icon:"♟️",name:"शतरञ्ज"},
  {icon:"🏹",name:"तीरन्दाजी"},{icon:"🛶",name:"डुंगा"},{icon:"🧗",name:"पर्वतारोहण"},{icon:"🤸",name:"जिम्नास्टिक"},
];

const features = [
  {cls:"c1",icon:"🏟️",title:"खेल पूर्वाधार विकास",desc:"देशभरका खेल मैदान, स्टेडियम र तालिम केन्द्रहरूको आधुनिकीकरण।"},
  {cls:"c2",icon:"📚",title:"खेलकुद शिक्षा",desc:"विद्यालय तहमा खेलकुद पाठ्यक्रम समावेश र छात्रवृत्ति कार्यक्रम।"},
  {cls:"c3",icon:"🌿",title:"स्वास्थ्य र पोषण",desc:"वैज्ञानिक आहार योजना, स्वास्थ्य परीक्षण र मानसिक स्वास्थ्य सेवा।"},
  {cls:"c4",icon:"🏆",title:"प्रतियोगिता व्यवस्थापन",desc:"जिल्ला, प्रदेश र राष्ट्रिय स्तरका खेलकुद प्रतियोगिताको सञ्चालन।"},
  {cls:"c1",icon:"💻",title:"डिजिटल खेलकुद",desc:"अनलाइन दर्ता, लाइभ स्कोरिङ, तालिम भिडियो र खेलाडी प्रोफाइल।"},
  {cls:"c2",icon:"🤝",title:"समुदाय र साझेदारी",desc:"निजी क्षेत्र, अन्तर्राष्ट्रिय संस्था र स्थानीय सरकारसँगको साझेदारी।"},
];

const programs = [
  {emoji:"🌟",grad:"linear-gradient(135deg,#1a3a6b,#4A90D9)",title:"युवा खेल अकादेमी",desc:"१२–१८ वर्षका प्रतिभाशाली युवाहरूका लागि व्यावसायिक खेलकुद तालिम।",tag:"भर्ना खुला",tagC:"#27ae60",tagBg:"rgba(39,174,96,.1)"},
  {emoji:"💪",grad:"linear-gradient(135deg,#c0392b,#e67e22)",title:"सामुदायिक खेल केन्द्र",desc:"सबै उमेरका नागरिकका लागि नजिकै रहेको खेल सुविधा र फिटनेस।",tag:"निःशुल्क",tagC:"#c0392b",tagBg:"rgba(192,57,43,.1)"},
  {emoji:"🏅",grad:"linear-gradient(135deg,#f39c12,#e67e22)",title:"राष्ट्रिय खेलकुद महोत्सव",desc:"वार्षिक राष्ट्रिय खेलकुद महोत्सव — उत्कृष्ट खेलाडीहरूको प्रतिस्पर्धा।",tag:"२०८२ मा हुँदैछ",tagC:"#f39c12",tagBg:"rgba(243,156,18,.1)"},
];

const newsList = [
  {emoji:"🏆",cat:"राष्ट्रिय",title:"नेपाली क्रिकेट टोलीले एशिया कप क्वालिफाइर जित्यो",date:"२०८१ चैत्र १५"},
  {emoji:"⚽",cat:"खेलकुद",title:"काठमाडौंमा नयाँ फुटबल स्टेडियम निर्माण शुरु",date:"२०८१ चैत्र १२"},
  {emoji:"🏋️",cat:"उपलब्धि",title:"नेपाली भारोत्तोलकले अन्तर्राष्ट्रिय पदक जितेर इतिहास रच्यो",date:"२०८१ चैत्र ८"},
];

const achievements = [
  {icon:"🏟️",num:"७५+",lbl:"जिल्लामा खेल केन्द्र"},{icon:"👥",num:"५०,०००+",lbl:"दर्ता खेलाडीहरू"},
  {icon:"🏆",num:"२५०+",lbl:"राष्ट्रिय पदक"},{icon:"📚",num:"१,२००+",lbl:"तालिम प्राप्त प्रशिक्षक"},
  {icon:"🌍",num:"३२+",lbl:"अन्तर्राष्ट्रिय अवार्ड"},{icon:"🏫",num:"८५०+",lbl:"सम्बद्ध विद्यालय"},
];

const testimonials = [
  {text:"खेलौँ नेपालले मेरो खेलकुद जीवन बदलिदियो। यहाँको तालिम र सुविधाले मलाई राष्ट्रिय टोलीसम्म पुर्‍याउन मद्दत गर्‍यो।",name:"अर्जुन श्रेष्ठ",role:"राष्ट्रिय क्रिकेटर",init:"अ"},
  {text:"हाम्रो समुदायमा खेलौँ नेपालको खेल केन्द्र आएपछि युवाहरूमा खेलकुदप्रतिको रुचि र स्वास्थ्य सुधार भएको छ।",name:"सविता थापा",role:"समुदाय प्रतिनिधि, पोखरा",init:"स"},
  {text:"यस प्लेटफर्मको एपले मेरो दैनिक फिटनेस दिनचर्या व्यवस्थित गर्न र खेलकुद समाचारसँग जोडिन सहज भएको छ।",name:"रमेश गुरुङ",role:"फिटनेस उत्साही",init:"र"},
];

function SecHeader({ tag, title, desc }) {
  return (
    <div className="kn-sec-hd">
      <div className="kn-sec-tag">{tag}</div>
      <h2 className="kn-sec-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="kn-divider" />
      {desc && <p className="kn-sec-desc">{desc}</p>}
    </div>
  );
}

function HeroSlider({ onNavigate }) {
  const [active, setActive] = useState(0);
  const go = useCallback(idx => setActive((idx + heroSlides.length) % heroSlides.length), []);
  useEffect(() => {
    const t = setInterval(() => go(active + 1), 5500);
    return () => clearInterval(t);
  }, [active, go]);

  return (
    <div className="kn-hero">
      {heroSlides.map((slide, i) => (
        <div key={i} className={`kn-slide${i === active ? " active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}>
          <div className="kn-slide-overlay" />
          <div className="kn-slide-content fade-in">
            <div className="kn-slide-tag">{slide.tag}</div>
            <h1 className="kn-slide-title">{slide.title}</h1>
            <p className="kn-slide-desc">{slide.desc}</p>
            <div className="kn-slide-btns">
              <button className="kn-btn-p" onClick={() => onNavigate("register")}>{slide.btn1}</button>
              <button className="kn-btn-s" onClick={() => onNavigate("programs")}>{slide.btn2}</button>
            </div>
          </div>
        </div>
      ))}
      <div className="kn-arrows">
        <button className="kn-arrow" onClick={() => go(active - 1)}>&#9664;</button>
        <button className="kn-arrow" onClick={() => go(active + 1)}>&#9654;</button>
      </div>
      <div className="kn-dots">
        {heroSlides.map((_, i) => (
          <button key={i} className={`kn-dot${i === active ? " active" : ""}`} onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Homepage({ onNavigate }) {
  return (
    <>
      <style>{CSS}</style>
      <HeroSlider onNavigate={onNavigate} />

      {/* STATS */}
      <div className="kn-stats">
        <div className="kn-stats-inner">
          {[{n:"७५+",l:"जिल्ला खेल केन्द्र"},{n:"५०,०००+",l:"दर्ता खेलाडी"},{n:"२५०+",l:"राष्ट्रिय पदक"},{n:"३२+",l:"अन्तर्राष्ट्रिय सम्मान"}]
            .map((s, i) => (
              <div key={i} className="kn-stat">
                <div className="kn-stat-num">{s.n}</div>
                <div className="kn-stat-lbl">{s.l}</div>
              </div>
            ))}
        </div>
      </div>

      {/* SPORTS */}
      <div className="kn-sec">
        <SecHeader tag="🏅 खेलकुद विविधता" title="नेपालका <span>प्रमुख खेलहरू</span>"
          desc="खेलौँ नेपालले विभिन्न प्रकारका खेलकुदहरूको विकास र प्रवर्धन गर्दछ।" />
        <div className="kn-sports-grid">
          {sports.map((s, i) => (
            <div key={i} className="kn-sport-card">
              <div className="kn-sport-icon">{s.icon}</div>
              <div className="kn-sport-name">{s.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: LIGHT, padding: "68px 0" }}>
        <div className="kn-sec" style={{ padding: "0 24px" }}>
          <SecHeader tag="⚡ हाम्रा सेवाहरू" title="<span>खेलौँ नेपाल</span> ले के गर्दछ?"
            desc="राष्ट्रिय खेलकुद विकासका लागि हामी विभिन्न क्षेत्रमा एकसाथ काम गर्दछौं।" />
          <div className="kn-feat-grid">
            {features.map((f, i) => (
              <div key={i} className={`kn-feat-card ${f.cls}`}>
                <div className={`kn-feat-icon ${f.cls}`}>{f.icon}</div>
                <div className="kn-feat-title">{f.title}</div>
                <div className="kn-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROGRAMS */}
      <div className="kn-sec">
        <SecHeader tag="📋 हाम्रा कार्यक्रम" title="विशेष <span>खेलकुद कार्यक्रमहरू</span>"
          desc="सबै उमेर र स्तरका नागरिकका लागि विशेष रूपमा तयार गरिएका कार्यक्रमहरू।" />
        <div className="kn-prog-grid">
          {programs.map((p, i) => (
            <div key={i} className="kn-prog-card">
              <div className="kn-prog-hd" style={{ background: p.grad }}>{p.emoji}</div>
              <div className="kn-prog-body">
                <div className="kn-prog-title">{p.title}</div>
                <div className="kn-prog-desc">{p.desc}</div>
                <span className="kn-prog-tag" style={{ color: p.tagC, background: p.tagBg }}>● {p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWS */}
      <div style={{ background: LIGHT, padding: "68px 0" }}>
        <div className="kn-sec" style={{ padding: "0 24px" }}>
          <SecHeader tag="📰 ताजा समाचार" title="खेलकुद <span>समाचार र अपडेट</span>" />
          <div className="kn-news-grid">
            <div className="kn-news-main">
              <div className="kn-news-img">🏆</div>
              <div className="kn-news-body">
                <span className="kn-news-cat">मुख्य समाचार</span>
                <div className="kn-news-title">नेपाल खेलकुद परिषद्को नयाँ नीति: हरेक जिल्लामा आधुनिक खेल केन्द्र बनाइनेछ</div>
                <div className="kn-news-meta">📅 २०८१ चैत्र १५ • ✍️ खेलौँ नेपाल सम्पादकीय</div>
              </div>
            </div>
            <div className="kn-news-list">
              {newsList.map((n, i) => (
                <div key={i} className="kn-news-item">
                  <div className="kn-news-item-img">{n.emoji}</div>
                  <div>
                    <div className="kn-news-item-title">{n.title}</div>
                    <div className="kn-news-item-meta">📅 {n.date} • <span style={{ color: RED }}>{n.cat}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="kn-ach-bg">
        <div className="kn-ach-inner">
          <div className="kn-ach-hd">
            <div className="kn-ach-tag">🏅 हाम्रा उपलब्धिहरू</div>
            <h2 className="kn-ach-title">संख्याहरूमा <span style={{ color: GOLD }}>खेलौँ नेपाल</span></h2>
          </div>
          <div className="kn-ach-grid">
            {achievements.map((a, i) => (
              <div key={i} className="kn-ach-card">
                <div className="kn-ach-icon">{a.icon}</div>
                <div className="kn-ach-num">{a.num}</div>
                <div className="kn-ach-lbl">{a.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="kn-sec">
        <SecHeader tag="💬 अनुभव र प्रतिक्रिया" title="हाम्रा <span>सदस्यहरू के भन्छन्?</span>" />
        <div className="kn-testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="kn-testi-card">
              <div className="kn-testi-q">"</div>
              <p className="kn-testi-txt">{t.text}</p>
              <div className="kn-testi-author">
                <div className="kn-testi-av">{t.init}</div>
                <div>
                  <div className="kn-testi-name">{t.name}</div>
                  <div className="kn-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APP DOWNLOAD */}
      <div className="kn-app-bg">
        <div className="kn-app-inner">
          <div>
            <div style={{ display:"inline-block",background:`linear-gradient(135deg,${RED},${ORANGE})`,color:"#fff",padding:"5px 15px",borderRadius:20,fontSize:11.5,fontWeight:700,letterSpacing:"1.2px",marginBottom:14 }}>📱 मोबाइल एप</div>
            <h2 className="kn-app-title">खेलौँ नेपाल <span>एप</span> डाउनलोड गर्नुहोस्</h2>
            <p className="kn-app-desc">खेलाडी दर्ता, लाइभ स्कोर, तालिम भिडियो, स्वास्थ्य ट्र्याकर र थपका सुविधाहरू एउटै एपमा।</p>
            <div className="kn-app-btns">
              {[{icon:"🍎",store:"App Store",sub:"iOS मा डाउनलोड"},{icon:"🤖",store:"Google Play",sub:"Android मा डाउनलोड"}].map((b,i) => (
                <button key={i} className="kn-store-btn">
                  <span className="s-icon">{b.icon}</span>
                  <span><small>{b.sub}</small><strong>{b.store}</strong></span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <div style={{ position: "relative", width: 240 }}>
    {/* Phone body */}
    <div style={{ background: "#1a1a2e", borderRadius: 36, padding: 10, boxShadow: "0 8px 40px rgba(0,0,0,.35), inset 0 0 0 1.5px #333" }}>
      <div style={{ position: "relative", background: "#0d1f3c", borderRadius: 28, overflow: "hidden", height: 480, display: "flex", flexDirection: "column" }}>

        {/* Notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 22, background: "#1a1a2e", borderRadius: "0 0 14px 14px", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 28, height: 4, borderRadius: 2, background: "#222" }} />
        </div>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#1a3a6b,#c0392b)", padding: "28px 14px 14px", flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginBottom: 2 }}>🇳🇵 खेलौँ नेपाल</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>नमस्ते, राजन 👋</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)", marginTop: 2 }}>तपाईंको आजको खेलकुद</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {[{ n: "७", l: "दिन सक्रिय", c: GOLD }, { n: "३", l: "खेल दर्ता", c: GREEN }, { n: "🏅", l: "पदक", c: RED }].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.12)", borderRadius: 10, padding: 8, flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 16, color: s.c, fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.65)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ background: "#f4f6fb", flex: 1, padding: 12, overflow: "hidden" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: DARK_BLUE, marginBottom: 8 }}>🔴 लाइभ खेल</div>
          <div style={{ background: "#fff", borderRadius: 10, padding: 10, marginBottom: 8, borderLeft: `3px solid ${RED}` }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: DARK_BLUE }}>Nepal vs India • क्रिकेट</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: RED }}>१४५/४</span>
              <span style={{ fontSize: 8, background: "#e74c3c", color: "#fff", padding: "2px 6px", borderRadius: 6 }}>LIVE</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: DARK_BLUE }}>१३२/७</span>
            </div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, color: DARK_BLUE, marginBottom: 8 }}>📋 आजको तालिम</div>
          {[{ icon: "⚽", t: "फुटबल तालिम", s: "बिहान ६:०० • तुसाल मैदान", bg: "rgba(26,58,107,.1)" },
            { icon: "🏋️", t: "भारोत्तोलन सत्र", s: "बेलुका ५:३० • जिम केन्द्र", bg: "rgba(192,57,43,.1)" }].map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 10, marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: DARK_BLUE }}>{item.t}</div>
                  <div style={{ fontSize: 8, color: "#888" }}>{item.s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ background: "#fff", padding: "10px 16px", display: "flex", justifyContent: "space-around", borderTop: "0.5px solid #eee", flexShrink: 0 }}>
          {[{ icon: "🏠", l: "गृह", active: true }, { icon: "🏅", l: "खेल" }, { icon: "📰", l: "समाचार" }, { icon: "👤", l: "प्रोफाइल" }].map((n, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16 }}>{n.icon}</div>
              <div style={{ fontSize: 7, color: n.active ? RED : "#888", fontWeight: n.active ? 600 : 400 }}>{n.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Side buttons */}
    <div style={{ position: "absolute", right: -8, top: 80, width: 3, height: 28, background: "#333", borderRadius: 2 }} />
    <div style={{ position: "absolute", left: -8, top: 70, width: 3, height: 22, background: "#333", borderRadius: 2 }} />
    <div style={{ position: "absolute", left: -8, top: 100, width: 3, height: 22, background: "#333", borderRadius: 2 }} />
  </div>
</div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="kn-partners-bg">
        <div className="kn-partners-inner">
          <p className="kn-partners-title">हाम्रा आधिकारिक साझेदारहरू</p>
          <div className="kn-partners-list">
            {["नेपाल खेलकुद परिषद्","राष्ट्रिय ओलम्पिक समिति","युवा तथा खेलकुद मन्त्रालय","नेपाल क्रिकेट संघ","ANFA","नेपाल ओलम्पिक एसोसिएसन"].map((p,i) => (
              <div key={i} className="kn-partner-badge">{p}</div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="kn-cta-banner">
        <h2 className="kn-cta-title">अहिले नै <em>खेलौँ नेपाल</em> परिवारमा जोडिनुहोस्!</h2>
        <p className="kn-cta-sub">निःशुल्क दर्ता गर्नुहोस् र हजारौं खेलाडीहरूसँग जोडिनुहोस्।</p>
        <div className="kn-cta-btns">
          <button className="kn-cta-btn-p" onClick={() => onNavigate("register")}>🚀 अहिले दर्ता गर्नुहोस्</button>
          <button className="kn-cta-btn-s" onClick={() => onNavigate("login")}>🔑 लगइन गर्नुहोस्</button>
        </div>
      </div>
    </>
  );
}