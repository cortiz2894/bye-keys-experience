import dynamic from "next/dynamic";
import Image from "next/image";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      <header className="w-full p-3 flex justify-center fixed top-0 left-0 z-[9999999]">
        <div className="flex items-center justify-between bg-[#2424245b] p-2.5 w-[40%] backdrop-blur-lg rounded-lg">
          <div className="flex gap-2 justify-center items-center rounded-lg p-2.5 bg-[#242424]">
            <img className="w-9" src="./ByeKeysLogo.png" />
            {/* <Image
              src="./ByeKeysLogo.png"
              width={36}
              height={36}
              alt="ByKeys Logo"
            /> */}
          </div>
          <div className="h-full flex gap-2">
            <button className="text-sm bg-[#24242491] px-3.5 py-2.5 border border-black h-full flex justify-center items-center rounded-lg">
              Project Details
            </button>
            <button className="text-sm bg-[#24242491] px-3.5 py-2.5 border border-black h-full flex justify-center items-center rounded-lg">
              About
            </button>
          </div>
        </div>
      </header>
      <Scene />
    </main>
  );
}
