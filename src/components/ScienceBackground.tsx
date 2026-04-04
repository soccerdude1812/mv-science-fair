const icons = [
  // Erlenmeyer Flask
  { d: "M10 2v6l-6 10a2 2 0 001.7 3h12.6a2 2 0 001.7-3L14 8V2M8.5 2h7M7 16h10", x: "7%", y: "10%", size: 56, rotate: -12, o: 0.10 },
  // Atom with orbits
  { d: "M12 12m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0M12 4a16 16 0 018 2c1.5 1 1.5 3 0 4a16 16 0 01-8 2 16 16 0 01-8-2c-1.5-1-1.5-3 0-4a16 16 0 018-2z", x: "87%", y: "6%", size: 64, rotate: 25, o: 0.11 },
  // Test Tube
  { d: "M15 3l-7 7v8a3 3 0 006 0V10l-7-7M8 3h8M10 14h4", x: "74%", y: "32%", size: 44, rotate: 30, o: 0.09 },
  // Microscope
  { d: "M6 21h12M12 21v-3M14 4l2 2-6 6M10 14c-2.5 0-4-1.5-4-4s1.5-4 4-4M14 6v8c0 2.5-1.5 4-4 4", x: "12%", y: "50%", size: 52, rotate: -5, o: 0.10 },
  // DNA Helix
  { d: "M5 3c2 4 5 6 7 6s5-2 7-6M5 21c2-4 5-6 7-6s5 2 7 6M7 7h10M7 12h10M7 17h10", x: "92%", y: "55%", size: 60, rotate: 10, o: 0.09 },
  // Molecule structure
  { d: "M7 7a2.5 2.5 0 105 0 2.5 2.5 0 10-5 0M12 17a2.5 2.5 0 105 0 2.5 2.5 0 10-5 0M3 17a2.5 2.5 0 105 0 2.5 2.5 0 10-5 0M9.5 9l3 5.5M8.5 9l-3 5.5M10 17h4.5", x: "42%", y: "72%", size: 54, rotate: -18, o: 0.11 },
  // Beaker
  { d: "M5 3h14M6 3v13a3 3 0 003 3h6a3 3 0 003-3V3M8 10h8M8 14h8", x: "28%", y: "15%", size: 42, rotate: 8, o: 0.09 },
  // Planet with orbit ring
  { d: "M12 12m-5 0a5 5 0 1010 0 5 5 0 10-10 0M2.5 9c2-1 5.5-1.5 9.5-1.5s7.5.5 9.5 1.5M2.5 15c2 1 5.5 1.5 9.5 1.5s7.5-.5 9.5-1.5", x: "58%", y: "3%", size: 58, rotate: -20, o: 0.10 },
  // Magnifying Glass
  { d: "M11 11m-7 0a7 7 0 1014 0 7 7 0 10-14 0M21 21l-4.35-4.35", x: "4%", y: "80%", size: 44, rotate: 10, o: 0.09 },
  // Light Bulb
  { d: "M9 18h6M10 22h4M12 2a7 7 0 00-4.5 12.4V17h9v-2.6A7 7 0 0012 2z", x: "80%", y: "76%", size: 48, rotate: -8, o: 0.10 },
  // Star / Sparkle
  { d: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z", x: "50%", y: "40%", size: 32, rotate: 15, o: 0.11 },
  // Second flask (different angle)
  { d: "M9 2h6M10 2v6l-6 10a1.5 1.5 0 001.3 2.2h13.4a1.5 1.5 0 001.3-2.2L14 8V2M8 14h8", x: "22%", y: "38%", size: 38, rotate: -15, o: 0.09 },
  // Small atom
  { d: "M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0M12 7c3.5 0 6 1 6 2.5S15.5 12 12 12 6 11 6 9.5 8.5 7 12 7", x: "35%", y: "90%", size: 36, rotate: 40, o: 0.11 },
  // Small molecule
  { d: "M6 6a2 2 0 104 0 2 2 0 10-4 0M14 18a2 2 0 104 0 2 2 0 10-4 0M10 8l4 8", x: "66%", y: "60%", size: 36, rotate: -30, o: 0.09 },
  // Tiny beaker bottom-right
  { d: "M7 3h10M8 3v11a2 2 0 002 2h4a2 2 0 002-2V3M9 10h6", x: "93%", y: "88%", size: 34, rotate: 12, o: 0.11 },
  // Sparkle star
  { d: "M12 3l1.8 5.4L20 12l-6.2 3.6L12 21l-1.8-5.4L4 12l6.2-3.6z", x: "16%", y: "93%", size: 26, rotate: -10, o: 0.09 },
  // Gear/cog (engineering)
  { d: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z", x: "52%", y: "18%", size: 40, rotate: 30, o: 0.11 },
  // Ruler (measurement)
  { d: "M3 5h18v14H3zM3 9h4M3 13h2M3 17h4M7 5v14M11 5v2M15 5v4M19 5v2", x: "70%", y: "90%", size: 32, rotate: -45, o: 0.11 },
];

export default function ScienceBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {icons.map((icon, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute text-white"
          style={{
            left: icon.x,
            top: icon.y,
            width: icon.size,
            height: icon.size,
            opacity: icon.o,
            transform: `rotate(${icon.rotate}deg)`,
          }}
        >
          <path d={icon.d} />
        </svg>
      ))}
    </div>
  );
}
