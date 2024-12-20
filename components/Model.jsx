import React, {
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  useGLTF,
  DragControls,
  useCursor,
  CameraControls,
  Html,
} from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import AudioPlayer from "./Player";
import { MeshHoleTexture } from "./textures/MeshHoleTexture";

export default function Model({ showLetters, audioControls }) {
  const entireMeshRef = useRef();
  const FirstSwitchRef = useRef();
  const ThirdSwitchRef = useRef();
  const directionalLightRef = useRef();
  const screenMeshRef = useRef();
  const cameraControlsRef = useRef();

  const { nodes, materials, scene } = useGLTF("./gltb/keyboard_for_R3F.glb");
  const [hovered, setHovered] = useState();
  const [cameraLocked, setCameraLocked] = useState(false);

  const initialPosition = new THREE.Vector3(0, 0, 4);
  const initialLookAt = new THREE.Vector3(0, -0.5, 0);

  const screenPosition = new THREE.Vector3(
    -1.3941316544501343,
    -0.11664693742119203,
    1.3025709527821105
  );

  const screenLookAt = new THREE.Vector3(
    -1.3942662965015844,
    -0.11702556662617417,
    0.0947462790898788
  );

  useCursor(hovered, "grab");

  const { intensity, positionY, positionX, positionZ, color } = useControls(
    "directionalLight",
    {
      intensity: { value: 0.85, min: 0, max: 5, step: 0.05 },
      positionY: { value: 3.4, min: -10, max: 20, step: 0.1 },
      positionX: { value: -1, min: -10, max: 20, step: 0.1 },
      positionZ: { value: 10, min: -10, max: 20, step: 0.1 },
    }
  );

  const emissiveMaterial = useMemo(
    (color = "#2e1aff") =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        toneMapped: false,
        emissive: new THREE.Color(color),
        emissiveIntensity: 18,
        metalness: 0.5,
        roughness: 0.3,
      }),
    []
  );

  const emissiveBackMaterial = useMemo(
    (color = "#e13939") =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        toneMapped: false,
        emissive: new THREE.Color(color),
        emissiveIntensity: 1,
        metalness: 0.5,
        roughness: 0.3,
      }),
    []
  );

  useLayoutEffect(() => {
    handleResetCamera();
  }, []);

  const handleScreenClick = () => {
    if (cameraControlsRef.current) {
      showLetters(false);
      cameraControlsRef.current
        // .fitToBox(screenMeshRef.current, true)
        .setLookAt(
          screenPosition.x,
          screenPosition.y,
          screenPosition.z,
          screenLookAt.x,
          screenLookAt.y,
          screenLookAt.z,
          true
        )
        .then(() => {
          console.log("cameraControlsRef.current: ", cameraControlsRef.current);
          setCameraLocked(true);
        });
    }
  };

  const handleResetCamera = () => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        initialPosition.x,
        initialPosition.y,
        initialPosition.z,
        initialLookAt.x,
        initialLookAt.y,
        initialLookAt.z,
        true
      );
      setCameraLocked(false);
      showLetters(true);
    }
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (cameraLocked) {
        event.preventDefault();
        handleResetCamera();
      }
    };
    gsap.to(emissiveMaterial, {
      emissiveIntensity: cameraLocked ? 14 : 18,
      duration: 1,
    });
    gsap.to(emissiveBackMaterial, {
      emissiveIntensity: cameraLocked ? 7 : 1,
      duration: 1,
    });

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [cameraLocked]);

  return (
    <>
      <Perf position="top-left" />
      <directionalLight
        ref={directionalLightRef}
        position={[positionX, positionY, positionZ]}
        intensity={intensity}
        color={color}
        castShadow
        shadow-normalBias={0.04}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <CameraControls
        makeDefault
        ref={cameraControlsRef}
        minDistance={1.2}
        maxDistance={4}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        zoomSpeed={0.5}
        dollySpeed={0.5}
        panSpeed={0.5}
        azimuthRotateSpeed={0.5}
        polarRotateSpeed={0.5}
        enabled={!cameraLocked}
      />
      <group
        dispose={null}
        castShadow
        receiveShadow
        ref={entireMeshRef}
        position={[0, -0.7, 0]}
      >
        <group
          position={[0.008, 0.033, 0.071]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <mesh
            receiveShadow
            geometry={nodes.Grid.geometry}
            material={materials.BaseMetalic}
          />
          <mesh
            receiveShadow
            geometry={nodes.Grid_1.geometry}
            material={materials.BaseMetalic}
          />
          <mesh
            receiveShadow
            geometry={nodes.Grid_2.geometry}
            material={materials.BaseMetalic}
          />
        </group>
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials.TeclasNegras}
          position={[-1.453, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials.TeclasNegras}
          position={[-1.243, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={materials.TeclasNegras}
          position={[-0.821, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials.TeclasNegras}
          position={[-0.61, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube005.geometry}
          material={materials.TeclasNegras}
          position={[-0.399, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube007.geometry}
          material={materials.TeclasNegras}
          position={[0.022, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube008.geometry}
          material={materials.TeclasNegras}
          position={[0.233, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube010.geometry}
          material={materials.TeclasNegras}
          position={[0.645, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube011.geometry}
          material={materials.TeclasNegras}
          position={[0.856, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Tecla_Negra.geometry}
          material={materials.TeclasNegras}
          position={[1.067, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube014.geometry}
          material={materials.TeclasNegras}
          position={[1.474, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.Cube015.geometry}
          material={materials.TeclasNegras}
          position={[1.684, -0.393, 0.067]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          geometry={nodes.screen.geometry}
          material={materials.Material}
          position={[-1.398, 0.584, 0.095]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.074}
        ></mesh>
        <group position={[0.008, 0.033, -0.153]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grid002.geometry}
            material={materials.BaseMetalic}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grid002_1.geometry}
            material={materials.BaseMetalic}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grid002_2.geometry}
            material={materials.BaseMetalic}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.controller_middle.geometry}
          position={[0.008, 0.033, -0.039]}
        >
          <meshStandardMaterial
            color={"#cbcbd3"}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
        <group
          position={[-0.21, 0.593, 0.134]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={1.669}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_1.geometry}
            material={materials.MetalCenter}
          >
            <meshStandardMaterial
              color={"#cbcbd3"}
              metalness={1}
              roughness={0.3}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_2.geometry}
            material={materials.reflected_black}
          />
        </group>
        <group position={[0.109, -0.585, 0.038]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grid001.geometry}
            material={materials.BaseMetalic}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grid001_1.geometry}
            material={materials.TeclasBlancas}
          />
        </group>
        <group ref={screenMeshRef}>
          <mesh
            receiveShadow
            castShadow
            position={[-1.398, 0.595, 0.1]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.791}
          >
            <Html
              rotation={[Math.PI / 2, Math.PI, 0]}
              position={[0, 0, 0.012]}
              // occlude
              occlude="blending"
              className="content-embed"
              distanceFactor={1.3}
              transform
            >
              <AudioPlayer
                zoomToScreen={handleScreenClick}
                audioControls={audioControls}
              />
            </Html>
          </mesh>
        </group>
        <group
          position={[-1.574, 1.102, -0.169]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.035}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder017.geometry}
            material={materials.ButtonBase}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder017_1.geometry}
            material={materials.ButtonBase}
          />
        </group>
        <group
          position={[-1.455, 1.102, -0.169]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.035}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder018.geometry}
            material={materials.ButtonBase}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder018_1.geometry}
            material={materials.ButtonBase}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text001.geometry}
          material={materials.ButtonBase}
          position={[-0.553, 0.202, 0.094]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.038}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text002.geometry}
          material={nodes.Text002.material}
          position={[0.672, -0.892, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text003.geometry}
          material={materials["Material.006"]}
          position={[-0.811, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text004.geometry}
          material={materials["Material.006"]}
          position={[-0.707, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text005.geometry}
          material={materials["Material.006"]}
          position={[-0.604, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text006.geometry}
          material={materials["Material.006"]}
          position={[-0.5, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text007.geometry}
          material={materials["Material.006"]}
          position={[-0.397, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text008.geometry}
          material={materials["Material.006"]}
          position={[-0.293, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text009.geometry}
          material={materials["Material.006"]}
          position={[-0.189, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text010.geometry}
          material={materials["Material.006"]}
          position={[-0.086, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text011.geometry}
          material={materials["Material.006"]}
          position={[0.018, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text012.geometry}
          material={materials["Material.006"]}
          position={[0.131, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text013.geometry}
          material={materials["Material.006"]}
          position={[0.232, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text014.geometry}
          material={materials["Material.006"]}
          position={[0.338, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text015.geometry}
          material={materials["Material.006"]}
          position={[0.441, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text016.geometry}
          material={materials["Material.006"]}
          position={[0.546, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text017.geometry}
          material={materials["Material.006"]}
          position={[0.649, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text018.geometry}
          material={materials["Material.006"]}
          position={[0.753, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text019.geometry}
          material={materials["Material.006"]}
          position={[0.857, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text020.geometry}
          material={materials["Material.006"]}
          position={[0.96, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text021.geometry}
          material={materials["Material.006"]}
          position={[1.063, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text022.geometry}
          material={materials["Material.006"]}
          position={[1.165, -0.038, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text023.geometry}
          material={materials["Material.006"]}
          position={[0.439, 0.474, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text024.geometry}
          material={materials["Material.006"]}
          position={[0.863, 0.474, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text025.geometry}
          material={materials["Material.006"]}
          position={[1.237, 0.474, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text026.geometry}
          material={materials["Material.006"]}
          position={[0.44, 0.826, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text027.geometry}
          material={materials["Material.006"]}
          position={[1.535, 0.474, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text028.geometry}
          material={materials["Material.006"]}
          position={[1.816, 0.474, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text029.geometry}
          material={materials["Material.006"]}
          position={[2.097, 0.474, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials.white_texts}
          position={[-1.455, 1.141, -0.106]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.157, 0.142, 0.001]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text030.geometry}
          material={nodes.Text030.material}
          position={[-1.343, 1.141, -0.119]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.014}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text031.geometry}
          material={nodes.Text031.material}
          position={[-1.456, 1.141, -0.119]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.014}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text032.geometry}
          material={nodes.Text032.material}
          position={[-1.575, 1.141, -0.119]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.014}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.byekeyslogo_png.geometry}
          material={materials.byekeyslogo_png}
          position={[-1.348, -0.023, 0.078]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.094}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder007.geometry}
          material={materials["Material.007"]}
          position={[2.159, 0.928, -0.22]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder011.geometry}
          material={materials["Material.007"]}
          position={[-2.125, 0.928, -0.22]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder012.geometry}
          material={materials["Material.007"]}
          position={[1.964, -0.868, -0.22]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder013.geometry}
          material={materials["Material.007"]}
          position={[-1.741, -0.868, -0.22]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text033.geometry}
          material={nodes.Text033.material}
          position={[-1.717, 1.141, -0.119]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.014}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text034.geometry}
          material={nodes.Text034.material}
          position={[-1.868, 1.141, -0.119]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.014}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text035.geometry}
          material={materials["Material.006"]}
          position={[0.866, 0.827, 0.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.029}
        />
        <MeshHoleTexture geometry={nodes.Plane011.geometry} />
        {/* Accept button */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.button_1002.geometry}
          material={
            cameraLocked ? emissiveMaterial : materials.ButtonTraslicdBase
          }
          position={[-0.553, 0.201, 0.079]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.724, 0.425, 0.894]}
        />
        {/* Back button */}
        <group
          position={[-0.581, 0.914, 0.079]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.533, 0.425, 0.894]}
          onClick={handleResetCamera}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_1.geometry}
            material={emissiveBackMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_2.geometry}
            material={materials.ButtonBase}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.record_button_5.geometry}
          material={emissiveMaterial}
          position={[2.101, 0.254, 0.084]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.959}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.record_shape_5.geometry}
          material={materials.ButtonBase}
          position={[2.102, 0.253, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.record_button_4.geometry}
          material={emissiveMaterial}
          position={[1.689, 0.254, 0.084]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.959}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.record_shape_4.geometry}
          material={materials.ButtonBase}
          position={[1.689, 0.253, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.record_button_3.geometry}
          material={emissiveMaterial}
          position={[1.276, 0.254, 0.084]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.959}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.record_shape_3.geometry}
          material={materials.ButtonBase}
          position={[1.277, 0.253, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pad_button_2.geometry}
          material={emissiveMaterial}
          position={[0.864, 0.254, 0.084]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.959}
        />
        <group position={[0.866, 0.253, 0.1]} rotation={[Math.PI, 0, Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane013.geometry}
            material={materials.ButtonBase}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane013_1.geometry}
            material={materials.ButtonBase}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.prog_button_1.geometry}
          material={emissiveMaterial}
          position={[0.452, 0.254, 0.084]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.959}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.prog_shape_1.geometry}
          material={materials.ButtonBase}
          position={[0.452, 0.253, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.26}
        />
        <group
          position={[1.516, 0.824, 0.13]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.742}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube021.geometry}
            material={materials.ButtonBase}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube021_1.geometry}
            material={materials["Material.001"]}
          />
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={emissiveMaterial}
          position={[-2.259, 0.581, 0.085]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.019, 0.722, 0.007]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials.Perilla}
          position={[0.864, 0.607, 0.186]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.685}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials.Perilla}
          position={[0.864, 0.954, 0.186]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.685}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={materials.Perilla}
          position={[0.446, 0.607, 0.186]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.685}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={materials.Perilla}
          position={[0.446, 0.954, 0.186]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.685}
        />
        {/* Switchs */}
        <DragControls
          dragLimits={[
            [0, 0],
            [0, 0.38],
            [0, 0],
          ]}
        >
          <group
            position={[1.225, 0.626, 0.13]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.742}
            ref={FirstSwitchRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube003_1.geometry}
              material={materials.ButtonBase}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube003_2.geometry}
              material={materials["Material.001"]}
            />
          </group>
        </DragControls>
        <DragControls
          dragLimits={[
            [0, 0],
            [-0.4, 0],
            [0, 0],
          ]}
        >
          <group
            position={[1.802, 0.99, 0.13]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.742}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            ref={ThirdSwitchRef}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube021.geometry}
              material={materials.ButtonBase}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube021_1.geometry}
              material={materials["Material.001"]}
            />
          </group>
        </DragControls>
        <DragControls
          dragLimits={[
            [0, 0],
            [-0.15, 0.25],
            [0, 0],
          ]}
        >
          <group
            position={[2.096, 0.738, 0.13]}
            rotation={[Math.PI, 0, Math.PI]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={0.742}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube021.geometry}
              material={materials.ButtonBase}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube021_1.geometry}
              material={materials["Material.001"]}
            />
          </group>
        </DragControls>
      </group>
    </>
  );
}

useGLTF.preload("./gltb/keyboard_for_R3F.glb");
