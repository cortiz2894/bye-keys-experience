import WaveSVG from "../layout/WaveSVG";
import { SocialLinks } from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 py-6 px-8 z-[9999999] flex justify-between items-end gap-5">
      <SocialLinks />
      <p className="text-sm text-white opacity-50 hover:opacity-100 transition-all duration-200">
        Made by{" "}
        <a
          className="underline"
          href="https://chris-portfolio-kohl.vercel.app/"
          target={"_blank"}
        >
          Christian Ortiz
        </a>
      </p>
      <WaveSVG />
    </footer>
  );
};

export { Footer };
