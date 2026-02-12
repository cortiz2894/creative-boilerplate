"use client";

import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls, folder, button } from "leva";
import { MathUtils, Vector3 } from "three";

const DEFAULT_POS: [number, number, number] = [8, 3.5, 8];

export default function SceneCamera() {
  const controlsRef = useRef(null);
  const camera = useThree((s) => s.camera);

  const {
    autoRotate,
    autoRotateSpeed,
    dampingFactor,
    minDistance,
    maxDistance,
    minPolarAngle,
    maxPolarAngle,
    fov,
    posX,
    posY,
    posZ,
  } = useControls("Camera", {
    autoRotate: { value: true, label: "Auto Rotate" },
    autoRotateSpeed: { value: 0.05, min: 0.01, max: 5, step: 0.01, label: "Rotate Speed" },
    dampingFactor: { value: 0.08, min: 0.01, max: 0.3, step: 0.01, label: "Damping" },
    minDistance: { value: 3, min: 1, max: 20, step: 0.5, label: "Min Distance" },
    maxDistance: { value: 40, min: 10, max: 100, step: 1, label: "Max Distance" },
    minPolarAngle: { value: 10, min: 0, max: 90, step: 1, label: "Min Polar (deg)" },
    maxPolarAngle: { value: 85, min: 0, max: 90, step: 1, label: "Max Polar (deg)" },
    fov: { value: 50, min: 20, max: 120, step: 1, label: "FOV" },
    Position: folder(
      {
        posX: { value: DEFAULT_POS[0], min: -50, max: 50, step: 0.5, label: "X" },
        posY: { value: DEFAULT_POS[1], min: 0, max: 50, step: 0.5, label: "Y" },
        posZ: { value: DEFAULT_POS[2], min: -50, max: 50, step: 0.5, label: "Z" },
      },
      { collapsed: false }
    ),
  });

  // Sync camera position when Leva values change
  useEffect(() => {
    camera.position.set(posX, posY, posZ);
  }, [posX, posY, posZ, camera]);

  if ("fov" in camera && camera.fov !== fov) {
    // eslint-disable-next-line react-hooks/immutability
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      dampingFactor={dampingFactor}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={MathUtils.degToRad(minPolarAngle)}
      maxPolarAngle={MathUtils.degToRad(maxPolarAngle)}
    />
  );
}
