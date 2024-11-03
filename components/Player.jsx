import { LiaBatteryHalfSolid } from "react-icons/lia";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { IoStopSharp } from "react-icons/io5";

import { useState, useEffect, useRef } from "react";
import { useControls } from "leva";
import gsap from "gsap";

const COLUMNS = 15;
const MAX_BLOCKS = 15;
const MIN_BLOCKS = 2;
const DURATION = 0.3; // Duración rápida para la animación
const INTERVAL = 500; // Intervalo para cambiar los picos
const HEIGHT_VARIATION = [1, 3, 5, 7, 9, 15]; // Posibles alturas para simular los picos

const AudioPlayer = ({ zoomToScreen }) => {
  const [animationState, setAnimationState] = useState("play"); // "play", "pause", "stop"
  const columnRefs = useRef([]);
  const timelines = useRef([]);
  const intervalRef = useRef(null); // Referencia para el setInterval

  useEffect(() => {
    const animateColumns = () => {
      columnRefs.current.forEach((column) => {
        const targetBlocks =
          HEIGHT_VARIATION[Math.floor(Math.random() * HEIGHT_VARIATION.length)];
        const blocks = Array.from(column.children);

        blocks.forEach((block, index) => {
          const isVisible = index < targetBlocks;
          gsap.to(block, {
            opacity: isVisible ? 1 : 0,
            y: isVisible ? -index * 2.5 : 0,
            ease: isVisible ? "power4.out" : "power4.in",
            duration: DURATION,
            delay: index * 0.02,
          });
        });
      });
    };

    if (animationState === "play") {
      intervalRef.current = setInterval(animateColumns, 500);
    } else if (animationState === "pause") {
      clearInterval(intervalRef.current);
    } else if (animationState === "stop") {
      clearInterval(intervalRef.current);
      columnRefs.current.forEach((column) => {
        const blocks = Array.from(column.children);
        blocks.forEach((block) => {
          gsap.to(block, { opacity: 0, y: 0, duration: DURATION });
        });
      });
    }

    return () => clearInterval(intervalRef.current);
  }, [animationState]);

  return (
    <div
      className="flex flex-col bg-[#242424] h-full w-full absolute left-0 top-0 cursor-pointer px-4 py-3 gap-3"
      onClick={zoomToScreen}
    >
      <div className="w-full flex justify-between">
        <p className="text-[#4e85fb] font-minicraftia text-xl">Bye Keys</p>
        <LiaBatteryHalfSolid className="text-[#4e85fb] text-2xl" />
      </div>
      <div className="flex gap-5">
        <div className="w-2/3 h-[90%] flex flex-col justify-end">
          <div className="pixel-wave-container w-full">
            {Array.from({ length: COLUMNS }).map((_, columnIndex) => (
              <div
                key={columnIndex}
                className="pixel-column"
                ref={(el) => (columnRefs.current[columnIndex] = el)}
              >
                {Array.from({ length: MAX_BLOCKS }).map((_, blockIndex) => (
                  <div key={blockIndex} className="pixel-block"></div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4 w-full">
            <button onClick={() => setAnimationState("play")}>
              <IoMdPlay className="text-[#4e85fb] text-xl" />
            </button>
            <button onClick={() => setAnimationState("pause")}>
              <IoMdPause className="text-[#4e85fb] text-xl" />
            </button>
            <button onClick={() => setAnimationState("stop")}>
              <IoStopSharp className="text-[#4e85fb] text-xl" />
            </button>
          </div>
        </div>
        <div
          className="border border-[#4e85fb] w-1/3 h-[90%] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-[#242424]
        [&::-webkit-scrollbar-thumb]:bg-[#4e85fb]"
        >
          <p className="font-minicraftia bg-[#4e85fb] p-2 text-black text-sm">
            Playlist
          </p>
          <ul className="flex flex-col gap-2 p-2 border-r border-[#4e85fb]">
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 1</li>
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 2</li>
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 3</li>
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 4</li>
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 5</li>
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 6</li>
            <li className="text-[#4e85fb] text-sm font-minicraftia">Song 7</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
