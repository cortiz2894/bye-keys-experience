import { LiaBatteryHalfSolid } from "react-icons/lia";
import { IoMdPlay, IoMdPause } from "react-icons/io";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";

const COLUMNS = 15;
const DURATION = 0.3;
const HEIGHT_VARIATION = [1, 3, 5, 7, 9, 15];

const PLAYLIST = [
  {
    fileName: "Aura-Long-Version-chosic.com.mp3",
    id: 1,
  },
  {
    fileName: "When-I-Was-A-Boy.mp3",
    id: 2,
  },
  {
    fileName: "Inspire-ashutosh.mp3",
    id: 3,
  },
  {
    fileName: "Aura-Long-Version-chosic2.com.mp3",
    id: 4,
  },
  {
    fileName: "When-I-Was-A-Boy2.mp3",
    id: 5,
  },
  {
    fileName: "Inspire-ashutosh2.mp3",
    id: 6,
  },
];

const AudioPlayer = ({ zoomToScreen, audioControls }) => {
  const {
    isPlaying,
    playAudio,
    pauseAudio,
    fileName,
    loadAudio,
    duration,
    currentTime,
  } = audioControls;
  const columnRefs = useRef([]);
  const intervalRef = useRef(null);
  const fileNameRef = useRef(null);
  const fileNameContainerRef = useRef(null);

  useLayoutEffect(() => {
    loadAudio(`/audio/${PLAYLIST[0].fileName}`);
  }, []);

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

    if (isPlaying) {
      intervalRef.current = setInterval(animateColumns, 500);
    } else if (!isPlaying) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  useEffect(() => {
    gsap.killTweensOf(fileNameRef.current);

    if (fileNameRef.current) {
      fileNameRef.current.style.transform = "translateX(0)";
    }
    const titleAnimation = () => {
      if (fileNameRef.current && fileName.length > 25) {
        const titleWidth = fileNameRef.current.offsetWidth - 50;
        const containerWidth = fileNameContainerRef.current.offsetWidth;
        gsap.fromTo(
          fileNameRef.current,
          { x: 0, delay: 1 },
          {
            x: -(containerWidth - titleWidth),
            duration: 7,
            ease: "none",
            repeat: -1,
            delay: 1,
            yoyo: true,
          }
        );
      }
    };

    titleAnimation();

    return () => {
      gsap.killTweensOf(fileNameRef.current);
    };
  }, [fileName]);

  const selectSong = (file) => {
    loadAudio(`/audio/${file.fileName}`);
  };

  return (
    <div
      className="flex flex-col bg-[#242424] h-full w-full absolute left-0 top-0 cursor-pointer px-8 py-6 gap-3"
      onClick={zoomToScreen}
    >
      <div className="w-full flex justify-between">
        <div
          className="w-[80%] overflow-hidden whitespace-nowrap"
          ref={fileNameContainerRef}
        >
          <p
            ref={fileNameRef}
            className="text-[#4e85fb] font-minicraftia text-xl max-w-[90%] inline-block"
          >
            {fileName ?? ""}
          </p>
        </div>
        <LiaBatteryHalfSolid className="text-[#4e85fb] text-2xl" />
      </div>
      <div className="flex gap-5 h-full">
        <div className="w-2/3 h-[80%] flex flex-col justify-end">
          <div className="pixel-wave-container w-full">
            {Array.from({ length: COLUMNS }).map((_, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className="pixel-column"
                ref={(el) => (columnRefs.current[columnIndex] = el)}
              >
                {Array.from({ length: COLUMNS }).map((_, blockIndex) => (
                  <div
                    key={`block-${blockIndex}`}
                    className="pixel-block"
                    style={{
                      opacity: blockIndex === 0 ? "1" : "0",
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex mt-4 gap-3 w-[80%]">
            <button
              onClick={() => {
                isPlaying ? pauseAudio() : playAudio();
              }}
            >
              {isPlaying ? (
                <IoMdPause className="text-[#4e85fb] text-xl" />
              ) : (
                <IoMdPlay className="text-[#4e85fb] text-xl" />
              )}
            </button>
            <div className="w-full flex justify-between">
              <span className="text-[#4e85fb] text-lg">{currentTime}</span>
              <span className="text-[#4e85fb] text-lg">{duration}</span>
            </div>
          </div>
        </div>
        <div
          className="border border-[#4e85fb] w-1/3 h-[80%] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-[#242424]
        [&::-webkit-scrollbar-thumb]:bg-[#4e85fb]"
        >
          <p className="font-minicraftia bg-[#4e85fb] p-2 text-[#242424] text-sm">
            Playlist
          </p>
          <ul className="flex flex-col border-r border-[#4e85fb]">
            {PLAYLIST.map((file, i) => {
              return (
                <li
                  key={`file-${file.id}`}
                  className={`
                  ${
                    file.fileName === fileName
                      ? "text-[#242424] bg-[#4e85fbbd] border border-[#242424]"
                      : "text-[#4e85fb] hover:bg-[#3d3d3d]"
                  } 
                  px-2 py-2  text-sm font-minicraftia text-ellipsis overflow-hidden whitespace-nowrap`}
                  onClick={() => selectSong(file)}
                >
                  {file.fileName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
