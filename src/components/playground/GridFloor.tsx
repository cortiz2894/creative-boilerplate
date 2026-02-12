"use client";

import { Grid, MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { COLORS } from "@/components/shared/theme";
import type { SceneMode } from "./SceneContent";

export default function GridFloor({ mode }: { mode: SceneMode }) {
  const {
    cellSize,
    cellThickness,
    cellColor,
    sectionSize,
    sectionThickness,
    sectionColor,
    fadeDistance,
    fadeStrength,
    infiniteGrid,
    followCamera,
  } = useControls(
    "Grid",
    {
      cellSize: { value: 0.5, min: 0.1, max: 5, step: 0.1, label: "Cell Size" },
      cellThickness: { value: 0.6, min: 0.1, max: 3, step: 0.1, label: "Cell Thickness" },
      cellColor: { value: COLORS.gridCell, label: "Cell Color" },
      sectionSize: { value: 3, min: 1, max: 10, step: 1, label: "Section Size" },
      sectionThickness: { value: 1.2, min: 0.1, max: 5, step: 0.1, label: "Section Thickness" },
      sectionColor: { value: COLORS.gridSection, label: "Section Color" },
      fadeDistance: { value: 30, min: 5, max: 100, step: 1, label: "Fade Distance" },
      fadeStrength: { value: 1.5, min: 0, max: 5, step: 0.1, label: "Fade Strength" },
      infiniteGrid: { value: true, label: "Infinite Grid" },
      followCamera: { value: false, label: "Follow Camera" },
    },
    { collapsed: true }
  );

  const { resolution } = useControls(
    "Floor",
    {
      resolution: { value: 512, options: [256, 512, 1024, 2048], label: "Resolution" },
    },
    { collapsed: true }
  );

  const showFloor = mode === "Background";

  return (
    <group>
      {/* Reflective floor plane */}
      {showFloor && (
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <MeshReflectorMaterial
            mirror={0.91}
            blur={[512, 512]}
            resolution={resolution}
            mixBlur={3.1}
            mixStrength={1}
            roughness={0.039}
            metalness={0.54}
            color="#ffffff"
            depthScale={1.8}
          />
        </mesh>
      )}

      {/* Visual grid rendered on top */}
      <Grid
        position={[0, 0, 0]}
        args={[100, 100]}
        cellSize={cellSize}
        cellThickness={cellThickness}
        cellColor={cellColor}
        sectionSize={sectionSize}
        sectionThickness={sectionThickness}
        sectionColor={sectionColor}
        fadeDistance={fadeDistance}
        fadeStrength={fadeStrength}
        infiniteGrid={infiniteGrid}
        followCamera={followCamera}
      />
    </group>
  );
}
