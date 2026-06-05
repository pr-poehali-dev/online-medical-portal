/* ============================================================
   Loaders — коллекция анимаций загрузки
   Использование: <DotsLoader /> / <SpinnerLoader /> / etc.
   Все принимают необязательный prop size?: "sm"|"md"|"lg"
   и color?: string (CSS-цвет, по умолчанию brand-cyan)
   ============================================================ */

type Size = "sm" | "md" | "lg";

const sizeMap = {
  dots:    { sm: 6,  md: 9,  lg: 12 },
  spinner: { sm: 24, md: 40, lg: 56 },
  ring:    { sm: 24, md: 40, lg: 56 },
  bars:    { sm: 4,  md: 6,  lg: 8  },
  pulse:   { sm: 32, md: 48, lg: 64 },
  wave:    { sm: 4,  md: 6,  lg: 8  },
  orbit:   { sm: 32, md: 48, lg: 64 },
};

/* ── 1. Точки ─────────────────────────────────────────────── */
export function DotsLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.dots[size];
  return (
    <div className="flex items-center gap-[0.4em]" style={{ fontSize: d }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "1em", height: "1em",
            borderRadius: "50%",
            background: color ?? "var(--brand-cyan)",
            animation: "dots-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes dots-bounce {
          0%,80%,100% { transform: scale(0.6); opacity: 0.4 }
          40%          { transform: scale(1);   opacity: 1   }
        }
      `}</style>
    </div>
  );
}

/* ── 2. Кружок (spinner) ──────────────────────────────────── */
export function SpinnerLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.spinner[size];
  const c = color ?? "var(--brand-cyan)";
  return (
    <svg width={d} height={d} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke={c} strokeOpacity=".2" strokeWidth="4" />
      <circle
        cx="20" cy="20" r="16"
        stroke={c} strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="60 44"
        style={{ animation: "spin 0.9s linear infinite", transformOrigin: "center" }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </svg>
  );
}

/* ── 3. Двойное кольцо ────────────────────────────────────── */
export function RingLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.ring[size];
  const c = color ?? "var(--brand-cyan)";
  return (
    <svg width={d} height={d} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={c} strokeOpacity=".15" strokeWidth="3" />
      <circle
        cx="20" cy="20" r="14"
        stroke={c} strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="22 66"
        style={{ animation: "ring-spin 1.2s cubic-bezier(0.5,0,0.5,1) infinite", transformOrigin: "center" }}
      />
      <circle
        cx="20" cy="20" r="8"
        stroke={c} strokeOpacity=".4" strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="14 38"
        style={{ animation: "ring-spin 0.8s cubic-bezier(0.5,0,0.5,1) infinite reverse", transformOrigin: "center" }}
      />
      <style>{`@keyframes ring-spin { to { transform: rotate(360deg) } }`}</style>
    </svg>
  );
}

/* ── 4. Полоски (bars) ────────────────────────────────────── */
export function BarsLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const w = sizeMap.bars[size];
  const h = w * 5;
  const c = color ?? "var(--brand-cyan)";
  return (
    <div className="flex items-end gap-[3px]">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          style={{
            width: w, height: h,
            borderRadius: w / 2,
            background: c,
            animation: "bars-grow 1s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bars-grow {
          0%,100% { transform: scaleY(0.3); opacity: 0.4 }
          50%      { transform: scaleY(1);   opacity: 1   }
        }
      `}</style>
    </div>
  );
}

/* ── 5. Пульсирующий круг ─────────────────────────────────── */
export function PulseLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.pulse[size];
  const c = color ?? "var(--brand-cyan)";
  return (
    <div style={{ position: "relative", width: d, height: d }}>
      {[0, 1].map(i => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            background: c,
            opacity: 0.6,
            animation: "pulse-ring 1.8s ease-out infinite",
            animationDelay: `${i * 0.9}s`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute", inset: "22%",
          borderRadius: "50%",
          background: c,
        }}
      />
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.3); opacity: 0.7 }
          100% { transform: scale(1);   opacity: 0   }
        }
      `}</style>
    </div>
  );
}

/* ── 6. Волна точек ───────────────────────────────────────── */
export function WaveLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.wave[size];
  const c = color ?? "var(--brand-cyan)";
  return (
    <div className="flex items-center gap-[4px]">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          style={{
            width: d, height: d * 4,
            borderRadius: d / 2,
            background: c,
            animation: "wave-bar 1.1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          0%,100% { transform: scaleY(0.4) translateY(10%); opacity: 0.5 }
          50%      { transform: scaleY(1)   translateY(0);   opacity: 1   }
        }
      `}</style>
    </div>
  );
}

/* ── 7. Орбита ────────────────────────────────────────────── */
export function OrbitLoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.orbit[size];
  const r = d / 2;
  const dot = Math.max(4, d / 8);
  const c = color ?? "var(--brand-cyan)";
  return (
    <div style={{ position: "relative", width: d, height: d }}>
      {/* Core */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: dot * 2, height: dot * 2,
        borderRadius: "50%",
        background: c,
      }} />
      {/* Ring track */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        border: `2px solid ${c}`,
        opacity: 0.15,
      }} />
      {/* Orbiting dot */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: 0, height: 0,
        animation: "orbit-spin 1.2s linear infinite",
        transformOrigin: "0 0",
      }}>
        <div style={{
          width: dot, height: dot,
          borderRadius: "50%",
          background: c,
          transform: `translate(${r - dot / 2}px, ${-dot / 2}px)`,
          boxShadow: `0 0 ${dot * 2}px ${c}`,
        }} />
      </div>
      {/* Second orbiting dot opposite */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: 0, height: 0,
        animation: "orbit-spin 1.2s linear infinite",
        animationDelay: "-0.6s",
        transformOrigin: "0 0",
      }}>
        <div style={{
          width: dot * 0.7, height: dot * 0.7,
          borderRadius: "50%",
          background: c,
          opacity: 0.5,
          transform: `translate(${r - dot * 0.35}px, ${-dot * 0.35}px)`,
        }} />
      </div>
      <style>{`@keyframes orbit-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

/* ── 8. ДНК / цепочка ─────────────────────────────────────── */
export function DNALoader({ size = "md", color }: { size?: Size; color?: string }) {
  const d = sizeMap.dots[size];
  const c = color ?? "var(--brand-cyan)";
  const c2 = "var(--brand-violet)";
  return (
    <div className="flex items-center gap-[5px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: d * 0.5, alignItems: "center" }}>
          <span style={{
            width: d, height: d, borderRadius: "50%",
            background: i % 2 === 0 ? c : c2,
            display: "block",
            animation: "dna-up 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
          }} />
          <span style={{
            width: d, height: d, borderRadius: "50%",
            background: i % 2 === 0 ? c2 : c,
            display: "block",
            animation: "dna-down 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.12}s`,
          }} />
        </div>
      ))}
      <style>{`
        @keyframes dna-up   { 0%,100%{transform:translateY(-3px);opacity:.5} 50%{transform:translateY(3px);opacity:1} }
        @keyframes dna-down { 0%,100%{transform:translateY(3px);opacity:.5}  50%{transform:translateY(-3px);opacity:1} }
      `}</style>
    </div>
  );
}
