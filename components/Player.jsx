import { LiaBatteryHalfSolid } from "react-icons/lia";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const COLUMNS = 15;
const MAX_BLOCKS = 15;
const MIN_BLOCKS = 2;

const AudioPlayer = ({ zoomToScreen }) => {
  const columnRefs = useRef([]);

  useEffect(() => {
    columnRefs.current.forEach((column, columnIndex) => {
      const animateColumn = () => {
        const targetBlocks = Math.floor(
          Math.random() * (MAX_BLOCKS - MIN_BLOCKS + 1) + MIN_BLOCKS
        );
        const blocks = Array.from(column.children);

        blocks.forEach((block, index) => {
          const isVisible = index < targetBlocks;
          gsap.to(block, {
            opacity: isVisible ? 1 : 0,
            duration: 0.2,
            delay: isVisible ? index * 0.05 : 0,
          });
        });

        setTimeout(animateColumn, 1000);
      };

      animateColumn();
    });
  }, []);

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
        <div className="pixel-wave-container w-2/3 h-[90%]">
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
