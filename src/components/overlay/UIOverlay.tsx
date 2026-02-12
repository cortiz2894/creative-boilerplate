"use client";

import type { SceneMode } from "@/components/playground/SceneContent";
import OverlayHeader from "./OverlayHeader";
import OverlayCornerMarks from "./OverlayCornerMarks";

export default function UIOverlay({ mode }: { mode: SceneMode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <OverlayHeader mode={mode} />
      <OverlayCornerMarks />
    </div>
  );
}
