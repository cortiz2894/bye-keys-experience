import Image from "next/image";
import { useState } from "react";
import { BasicButton } from "../BasicButton/BasicButton";
import { SocialLinks } from "../Footer/SocialLinks";
import { Modal } from "../Modal/Modal";

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <header className="w-full p-3 flex justify-center fixed top-0 left-0 z-[9999999]">
      <div className="flex items-center justify-between bg-[#2424245b] p-2.5 w-[40%] backdrop-blur-lg rounded-lg">
        <div className="flex gap-2 justify-center items-center rounded-lg p-2.5 bg-[#242424]">
          <Image
            src="/ByeKeysLogo.png"
            width={36}
            height={36}
            alt="ByKeys Logo"
          />
        </div>
        <div className="flex gap-2">
          <BasicButton
            text="Project Details"
            action={() => setShowModal(true)}
          />
        </div>
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className="flex flex-col gap-3 max-w-[500px]">
          <p className="text-white font-minicraftia text-2xl font-semibold flex gap-2 justify-center">
            BYE KEYS
          </p>
          <p className="text-white">
            Bye Keys was developed with inspiration from a MIDI controller,
            combined with a touch of 80s and 90s aesthetics.
          </p>
          <p className="text-white">
            It was a fun process where I got to explore my creativity, design
            skills, and 3D modeling, while also refining my knowledge of
            ThreeJS.
          </p>
          <p className="text-white">
            It’s open-source! Feel free to check out how it’s made and leave any
            feedback for improvements—there’s still lots to do! 🚀
          </p>
          <p className="text-white text-xs italic mt-3">
            P.S. In case it’s not obvious, I don’t actually know much about
            music, so I’m open to feature ideas for the keys and controllers!
          </p>
          <div className="mt-5 flex justify-center flex-col items-center ">
            <span className="pb-2 mb-4 border-b border-white text-sm text-center opacity-50">
              Check my links here
            </span>
            <SocialLinks />
          </div>
        </div>
      </Modal>
    </header>
  );
};

export { Header };
