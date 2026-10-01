import React from 'react';

/* Minimal inline SVG icon set — all original, no external assets. */
type P = { size?: number; style?: React.CSSProperties };

const base = (size: number = 24) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const I = {
  user: (p: P) => (
    <svg {...base(p.size)} style={p.style}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></svg>
  ),
  globe: (p: P) => (
    <svg {...base(p.size)} style={p.style}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" /></svg>
  ),
  doc: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 12h6M9 16h6" /></svg>
  ),
  mail: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
  terminal: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M4 17l6-6-6-6M12 19h8" /></svg>
  ),
  trophy: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0z" /><path d="M7 6H4a1 1 0 00-1 1c0 2.5 2 4 4 4M17 6h3a1 1 0 011 1c0 2.5-2 4-4 4" /></svg>
  ),
  gear: (p: P) => (
    <svg {...base(p.size)} style={p.style}><circle cx="12" cy="12" r="3.2" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3h0a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5h0a1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></svg>
  ),
  grid: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
  ),
  search: (p: P) => (
    <svg {...base(p.size)} style={p.style}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.8-3.8" /></svg>
  ),
  star: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
  ),
  lock: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
  ),
  x: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
  minus: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M5 12h14" /></svg>
  ),
  square: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
  ),
  copy: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>
  ),
  external: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M14 4h6v6M20 4L10 14M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h6" /></svg>
  ),
  printer: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M7 8V3h10v5M7 17H4a1 1 0 01-1-1v-6a2 2 0 012-2h14a2 2 0 012 2v6a1 1 0 01-1 1h-3M7 14h10v7H7z" /></svg>
  ),
  chevL: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M14 6l-6 6 6 6" /></svg>
  ),
  chevR: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M10 6l6 6-6 6" /></svg>
  ),
  arrowR: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
  ),
  help: (p: P) => (
    <svg {...base(p.size)} style={p.style}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2.2M12 17.5v.01" /></svg>
  ),
  briefcase: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 12h18" /></svg>
  ),
  calendar: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
  ),
  bug: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="8" y="7" width="8" height="12" rx="4" /><path d="M9 7a3 3 0 016 0M4 10l4 2M4 16l4-2M20 10l-4 2M20 16l-4-2M12 4v3" /></svg>
  ),
  chat: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M21 12a8 8 0 01-8 8H4l2-3a8 8 0 1115-5z" /></svg>
  ),
  zap: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
  ),
  cpu: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
  ),
  layers: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M12 2l10 6-10 6L2 8z" /><path d="M2 14l10 6 10-6" /></svg>
  ),
  gamepad: (p: P) => (
    <svg {...base(p.size)} style={p.style}><path d="M7 8h10a5 5 0 015 5c0 2.5-1.5 5-3.5 5-1.5 0-2.5-1-3.5-2h-6c-1 1-2 2-3.5 2C3.5 18 2 15.5 2 13a5 5 0 015-5z" /><path d="M7 12h4M9 10v4M16 11h.01M18 13h.01" /></svg>
  ),
  github: (p: P) => (
    <svg {...base(p.size)} style={{ ...p.style }} width={p.size ?? 24} height={p.size ?? 24} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 .5A11.5 11.5 0 00.5 12a11.5 11.5 0 007.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .31.2.67.8.55A11.5 11.5 0 0023.5 12 11.5 11.5 0 0012 .5z" /></svg>
  ),
  linkedin: (p: P) => (
    <svg {...base(p.size)} style={{ ...p.style }} width={p.size ?? 24} height={p.size ?? 24} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45z" /></svg>
  ),
  medal: (p: P) => (
    <svg {...base(p.size)} style={p.style}><circle cx="12" cy="14" r="5" /><path d="M8.5 10L5 3h5l2 4 2-4h5l-3.5 7" /></svg>
  ),
  image: (p: P) => (
    <svg {...base(p.size)} style={p.style}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M4 18l5-5 3 3 3-3 5 5" /></svg>
  ),
};
