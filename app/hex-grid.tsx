"use client";

const hexCells = [
  {
    label: "WEB DEV",
    x: 0, y: -155,
    icon: <path d="M9 8l-5 5 5 5M17 8l5 5-5 5" />,
  },
  {
    label: "MOBILE",
    x: 148, y: -48,
    icon: <><rect x="7" y="3" width="12" height="20" rx="2.5" /><path d="M11 19h4" /></>,
  },
  {
    label: "AI",
    x: 91, y: 126,
    highlight: true,
    icon: <><rect x="8" y="8" width="10" height="10" rx="2" /><path d="M11 3v3M15 3v3M11 20v3M15 20v3M3 11h3M3 15h3M20 11h3M20 15h3" /></>,
  },
  {
    label: "SEO",
    x: -91, y: 126,
    icon: <><circle cx="11" cy="11" r="6" /><path d="M16 16l5 5" /></>,
  },
  {
    label: "UI/UX",
    x: -148, y: -48,
    icon: <><path d="M13 3l9 5-9 5-9-5z" /><path d="M4 13l9 5 9-5" /></>,
  },
];

export default function HexGrid() {
  return (
    <div className="hex-container">
      {hexCells.map((h) => (
        <div
          key={h.label}
          className="hex-cell"
          style={{
            transform: `translate(calc(-50% + ${h.x}px), calc(-50% + ${h.y}px))`,
          }}
        >
          <div
            className="hex-border"
            style={h.highlight ? { background: "linear-gradient(160deg, rgba(34,211,238,0.4), rgba(59,130,246,0.12))" } : undefined}
          />
          <div className="hex-inner">
            <span className="hex-icon">
              <svg width="30" height="30" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                {h.icon}
              </svg>
            </span>
            <span className={`hex-label${h.highlight ? " hex-label--accent" : ""}`}>
              {h.label}
            </span>
          </div>
        </div>
      ))}

      {/* Center hex - PRIMAROAS */}
      <div className="hex-cell hex-cell--center">
        <div className="hex-border hex-border--center" />
        <div className="hex-inner hex-inner--center">
          <span className="hex-logo-icon">
            <span className="hex-logo-dot" />
          </span>
          <span className="hex-logo-text">PRIMAROAS</span>
        </div>
      </div>
    </div>
  );
}
