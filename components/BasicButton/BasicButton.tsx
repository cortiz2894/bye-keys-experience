import { ReactElement } from "react";

interface BasicButtonProps {
  text: string;
  action?: () => void;
}
const BasicButton = ({ text, action }: BasicButtonProps) => {
  return (
    <button
      onClick={action}
      className="hover:transition-all ease-linear duration-200  hover:bg-[#84848466] py-2.5 text-sm bg-[#24242491] px-3.5 border border-[#141414] h-full flex justify-center items-center rounded-lg"
    >
      {text}
    </button>
  );
};

export { BasicButton };
