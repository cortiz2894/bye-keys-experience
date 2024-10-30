"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import styles from "./Scene.module.scss";
import { Leva } from "leva";
import { Effects } from "./Effects";

export default function Scene() {
  return (
    <>
      <Leva collapsed />
      <Canvas shadows camera={{ fov: 70, position: [0, -1, 4] }}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />

        <Model />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-1.2}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={0.7}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
        <Effects />

        <Environment preset="city" />
      </Canvas>
    </>
  );
}
