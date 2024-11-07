"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PropsWithChildren } from "react";
import { BasicButton } from "../BasicButton/BasicButton";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const Modal = ({ onClose, show, children }: PropsWithChildren<ModalProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const modalTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    modalTl.current = gsap
      .timeline({ paused: true })
      .to(ref.current, {
        pointerEvents: "none",
        backdropFilter: "blur(0px)",
        duration: 0.5,
      })
      .to(
        notificationRef.current,
        {
          y: "60%",
          opacity: 0,
          duration: 0.2,
        },
        "<"
      )
      .reverse();

    return () => {
      modalTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!modalTl.current) return;
    if (!show) {
      modalTl.current.reversed(false);
    } else {
      modalTl.current.reversed(true);
    }
  }, [show]);

  return (
    <div
      ref={ref}
      className={
        "w-screen h-screen flex justify-center fixed top-0 left-0 z-[99999999] backdrop-blur items-center"
      }
    >
      <div
        ref={notificationRef}
        className="max-w-[90vw] md:min-w-[500px] bg-[#252525cd] flex flex-col justify-center items-center gap-5 px-6 rounded-2xl relative py-12"
      >
        <div className="absolute top-2 right-2">
          <BasicButton text="X" action={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export { Modal };
