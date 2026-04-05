import React from 'react';

function LoadingDot({ delay }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 5, height: 5,
        borderRadius: "50%",
        backgroundColor: "#888",
        marginLeft: 4,
        animation: `dotBounce 1.4s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

function SkeletonLine({ width = "100%", height = 10, delay = 0 }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: 6,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: `shimmer 1.6s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes orbit {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(0.88); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 28 }}>

        <div style={{ position: "relative", width: 72, height: 72 }}>
          {[
            { size: 14, color: "#5B8AF5", top: 0, left: "50%", transform: "translateX(-50%)", delay: 0 },
            { size: 10, color: "#A78BFA", bottom: 4, right: 0, delay: -0.6 },
            { size: 10, color: "#34D399", bottom: 4, left: 0, delay: -1.2 },
          ].map((orb, i) => (
            <span key={i} style={{
              position: "absolute", borderRadius: "50%",
              width: orb.size, height: orb.size,
              background: orb.color,
              top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
              transform: orb.transform,
              animation: `orbit 1.8s ease-in-out ${orb.delay}s infinite`,
            }} />
          ))}
          <span style={{
            position: "absolute", width: 28, height: 28, borderRadius: "50%",
            background: "#fff", border: "1.5px solid #e5e5e5",
            top: "50%", left: "50%",
            animation: "pulse 1.8s ease-in-out infinite",
          }} />
        </div>

        <p style={{ fontSize: 15, color: "#888", margin: 0, display: "flex", alignItems: "center" }}>
          Loading
          <LoadingDot delay={0} />
          <LoadingDot delay={0.2} />
          <LoadingDot delay={0.4} />
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 260 }}>
          <SkeletonLine width="75%" height={14} delay={0} />
          <SkeletonLine width="100%" delay={0.1} />
          <SkeletonLine width="100%" delay={0.2} />
          <SkeletonLine width="50%" delay={0.3} />
        </div>

      </main>
    </>
  );
}