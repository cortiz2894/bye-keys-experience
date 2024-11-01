import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      <Scene />
      <div className="z-[999] fixed left-0 bottom-0 px-10 py-8">
        <h1 className="text-white text-[5.5em] font-inter">
          {/* ByeKeys */}
          <span className="font-cousine">Experience</span>
        </h1>
      </div>
    </main>
  );
}
