"use client";

import { BasicButton } from "@/components/BasicButton/BasicButton";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Modal } from "@/components/Modal/Modal";
import { useAudio } from "@/context/AudioManager";
import dynamic from "next/dynamic";
import { useState } from "react";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const { playAudio } = useAudio();

  const handleAccept = () => {
    setShowModal(false);
    playAudio();
  };

  return (
    <main className="h-screen w-screen relative">
      <Header />
      <Scene />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p className="text-white">
          For a better experience you should enable the sound
        </p>
        <BasicButton text={"Okay I understand 👍"} action={handleAccept} />
      </Modal>
      <Footer />
    </main>
  );
}
