"use client";

import { Suspense } from "react";
import SceneCamera from "./SceneCamera";
import SceneLighting from "./SceneLighting";
import SceneEnvironment from "./SceneEnvironment";
import GridFloor from "./GridFloor";
import DemoSphere from "./DemoSphere";
import GlbModel from "./GlbModel";

export type SceneMode = "Background" | "Frame";

interface SceneContentProps {
  showGrid: boolean;
  mode: SceneMode;
  glbUrl: string | null;
  onModelLoaded?: () => void;
}

export default function SceneContent({ showGrid, mode, glbUrl, onModelLoaded }: SceneContentProps) {
  return (
    <>
      <SceneCamera />
      <SceneLighting />
      <SceneEnvironment mode={mode} />
      {showGrid && <GridFloor mode={mode} />}
      {glbUrl ? (
        <Suspense fallback={null}>
          <GlbModel url={glbUrl} onLoaded={onModelLoaded} />
        </Suspense>
      ) : (
        <DemoSphere />
      )}
    </>
  );
}
