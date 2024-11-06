"use client";

import styles from "./WaveSVG.module.scss";
import classNames from "classnames";
import { useAudio } from "../../context/AudioManager";

function WaveSVG() {
  const { isPlaying, playAudio, pauseAudio } = useAudio();

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        styles.container,
        { [styles.active]: isPlaying }
      )}
      onClick={togglePlay}
    >
      <svg
        className={classNames(styles.wave, { [styles.off]: !isPlaying })}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 40"
      >
        <title>Active sound</title>
        <path
          className={styles.Line_1}
          data-name="Line 1"
          d={
            "M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
          }
        />
        <path
          className={styles.Line_2}
          data-name="Line 2"
          d={
            isPlaying
              ? "M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
              : "M6.91,15L6.78,15A1,1,0,0,0,6,16V22a1,1,0,1,0,2,0s0,0,0,0V16A1,1,0,0,0,7,15H6.91Z"
          }
        />
        <path
          className={styles.Line_3}
          data-name="Line 3"
          d={
            isPlaying
              ? "M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
              : "M12.91,15L12.78,15A1,1,0,0,0,12,16V22a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H12.91Z"
          }
        />
        <path
          className={styles.Line_4}
          data-name="Line 4"
          d={
            isPlaying
              ? "M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
              : "M18.91,15L18.78,15A1,1,0,0,0,18,16V22a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H18.91Z"
          }
        />
        <path
          className={styles.Line_5}
          data-name="Line 5"
          d={
            "M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
          }
        />
      </svg>
    </div>
  );
}

export default WaveSVG;
