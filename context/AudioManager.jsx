"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { formatTime } from "../utils/formatTime";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

const AudioManager = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef(new Audio("/audio/Inspire-ashutosh.mp3"));

  const audioRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const loadAudio = (file) => {
    if (audioRef.current) {
      audioRef.current.src = file;
      setFileName(file.split("/").pop());
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        setDuration(formatTime(audioRef.current.duration));

        playAudio();
      };
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play().catch((error) => {
        console.log("Error playing audio:", error);
        pauseAudio();
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(formatTime(audioRef.current.duration));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(formatTime(audioRef.current.currentTime));
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        fileName,
        duration,
        currentTime,
        playAudio,
        pauseAudio,
        loadAudio,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioManager;
