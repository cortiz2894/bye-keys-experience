import { useLoader } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Outline,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { useControls } from "leva";

import { useAudio } from "../context/AudioManager";

export function Effects() {
  const { isPlaying } = useAudio();

  const { enabled, ...BloomProps } = useControls("Bloom", {
    enabled: true,
    luminanceThreshold: { value: 0.5, min: 0, max: 0.9 },
    mipmapBlur: true,
    luminanceSmoothing: { value: 0.8, min: 0, max: 15 },
    intensity: { value: 1.05, min: 0, max: 5 },
  });

  const { ...VignetteProps } = useControls("Vignette", {
    eskil: true,
    offset: { value: 0.45, min: 0, max: 5 },
    darkness: { value: 1.1, min: 0, max: 5 },
  });

  const { enabled: DepthOfFieldEnabled, ...DepthOfFieldProps } = useControls(
    "DepthOfField",
    {
      enabled: true,
      focusDistance: { value: 0.02, min: 0, max: 0.05, step: 0.001 },
      focuslength: { value: 0.91, min: 0, max: 2 },
      bokehScale: { value: 6.2, min: 0, max: 10 },
    }
  );

  return (
    enabled && (
      <EffectComposer disableNormalPass>
        <Bloom {...BloomProps} />
        <Vignette {...VignetteProps} />
        <Noise BlendFunction={BlendFunction.ADD} premultiply />
        {DepthOfFieldEnabled && <DepthOfField {...DepthOfFieldProps} />}
      </EffectComposer>
    )
  );
}
