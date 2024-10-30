import { useLoader } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Outline,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export function Effects() {
  const { enabled, ...BloomProps } = useControls("Bloom", {
    enabled: true,
    luminanceThreshold: { value: 0.9, min: 0, max: 0.9 },
    mipmapBlur: true,
    luminanceSmoothing: { value: 0.8, min: 0, max: 15 },
    intensity: { value: 1.05, min: 0, max: 5 },
  });

  const { ...VignetteProps } = useControls("Vignette", {
    eskil: true,
    offset: { value: 0.45, min: 0, max: 5 },
    darkness: { value: 1.1, min: 0, max: 5 },
  });

  return (
    enabled && (
      <EffectComposer disableNormalPass>
        <Bloom {...BloomProps} />
        <Vignette {...VignetteProps} />
      </EffectComposer>
    )
  );
}
