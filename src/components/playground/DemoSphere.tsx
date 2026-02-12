"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export default function DemoSphere() {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]} castShadow>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial
        color="#c8b89a"
        roughness={0.25}
        metalness={0.6}
      />
    </mesh>
  );
}
