"use client";

import { useControls, folder } from "leva";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export default function GrainOverlay() {
  const { opacity, blendMode } = useControls(
    "Post FX",
    {
      opacity: { value: 0.04, min: 0, max: 0.3, step: 0.005, label: "Grain Opacity" },
      blendMode: {
        value: "overlay",
        options: ["overlay", "soft-light", "multiply", "screen"],
        label: "Blend Mode",
      },
    },
    { collapsed: true }
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
        opacity,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        animation: "grain 0.8s steps(6) infinite",
      }}
    />
  );
}
