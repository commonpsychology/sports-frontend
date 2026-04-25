import { useEffect, useState } from "react";

// Place at: src/components/loaders/SportsLoader.jsx
// Logo at:  public/mainpagelogoentrance.png

export default function SportsLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.2;
      });
    }, 28);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#ffffff",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "2.5rem",
    }}>
      <img
        src="/mainpagelogoentrance.png"
        alt="Khelo Nepal"
        style={{ width: "min(320px, 75vw)", height: "auto" }}
      />

      <div style={{
        width: "min(280px, 65vw)", height: 3,
        background: "rgba(26,42,94,0.1)", borderRadius: 99, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: "linear-gradient(90deg, #c8102e, #1a2a5e, #2d7a3a)",
          width: `${progress}%`, transition: "width 0.06s linear",
        }} />
      </div>
    </div>
  );
}