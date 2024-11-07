import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/cortiz2894"
        target={"_blank"}
        className="border border-white opacity-50 rounded-full p-2 hover:opacity-100 duration-200 transition-all hover:-translate-y-2"
      >
        <FaGithub className="text-lg text-white" />
      </a>
      <a
        href="https://www.linkedin.com/in/christian-daniel-ortiz-ororbia-95b14210b/"
        target={"_blank"}
        className="border border-white opacity-50 rounded-full p-2 hover:opacity-100 duration-200 transition-all hover:-translate-y-2"
      >
        <FaLinkedinIn className="text-lg text-white" />
      </a>
    </div>
  );
};

export { SocialLinks };
