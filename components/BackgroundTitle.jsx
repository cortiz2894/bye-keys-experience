import { useRef } from "react";
import { useMask, Text } from "@react-three/drei";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

// const bloomColor = new Color("#fff");
// bloomColor.multiplyScalar(1.5);

const Letter = ({ value, speed, index, show }) => {
  const initialPosition = 0.9;
  const hiddenPosition = 5;
  const ref = useRef();

  useFrame((state, delta) =>
    easing.damp(
      ref.current.position,
      "y",
      show ? initialPosition : hiddenPosition,
      speed,
      delta
    )
  );

  return (
    <Text
      ref={ref}
      fontSize={1.5}
      font="/fonts/Marquee_Moon.otf"
      position={[index * 0.85, 0, 0]}
    >
      {value}
      <meshStandardMaterial
        color="white"
        emissive="blue"
        emissiveIntensity={12}
        toneMap={false}
      />
    </Text>
  );
};

const BackgroundTitle = ({ showLetters = true }) => {
  const text = ["B", "Y", "E", "K", "E", "Y", "S"];

  return (
    <group position={[-2.6, 0, -0.5]}>
      {text.map((letter, index) => (
        <Letter
          key={index}
          value={letter}
          speed={0.1 * (6 - index)}
          index={index}
          show={showLetters}
        />
      ))}
    </group>
  );
};

export { BackgroundTitle };
