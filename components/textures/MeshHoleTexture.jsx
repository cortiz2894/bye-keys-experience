import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const MeshHoleTexture = ({ geometry }) => {
  const textures = useTexture({
    map: "/textures/meshHoles/SheetMetal002_2K-PNG_Color.png",
    displacementMap:
      "/textures/meshHoles/SheetMetal002_2K-PNG_Displacement.png",
    // metalnessMap: "/textures/meshHoles/SheetMetal002_2K-PNG_Metalness.png",
    // roughnessMap: "/textures/meshHoles/SheetMetal002_2K-PNG_Roughness.png",
    normalMap: "/textures/meshHoles/SheetMetal002_2K-PNG_NormalDX.png",
    alphaMap: "/textures/meshHoles/SheetMetal002_2K-PNG_Opacity.png",
  });

  const { textureScale, ...textureProps } = useControls("Mesh Hole", {
    displacementScale: { value: 0.05, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.51, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.49, min: 0, max: 1, step: 0.01 },
    textureScale: { value: 0.85, min: 0, max: 10, step: 0.01 },
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(textureScale, textureScale);
  });

  return (
    <mesh
      receiveShadow
      geometry={geometry}
      position={[-2.027, -0.406, 0.071]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.111}
    >
      <meshStandardMaterial
        {...textures}
        {...textureProps}
        transparent={true}
        color={"#37363d"}
      />
    </mesh>
  );
};

export { MeshHoleTexture };
