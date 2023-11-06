import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <div
      className="mx-auto flex max-w-screen-xl flex-col gap-4 p-2 px-6 font-[Sono] 
    text-definedColor-base md:gap-0 lg:max-h-screen"
    >
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <p>
          &lt;/&gt; Coded by&nbsp;
          <span className="font-bold tracking-wide">
            Mohammed Annas Faruqui
          </span>
        </p>
        <p className="flex items-center gap-4 text-2xl font-bold">
          <span>
            <a
              href="mailto:annasfaruqui123@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 active:text-blue-950"
            >
              <HiOutlineMail />
            </a>
          </span>

          <span>
            <a
              href="https://github.com/annasfaruqui"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 active:text-blue-950"
            >
              <AiOutlineGithub />
            </a>
          </span>

          <span>
            <a
              href="https://www.linkedin.com/in/mohammed-annas-faruqui-31a40a1ba"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 active:text-blue-950"
            >
              <AiOutlineLinkedin />
            </a>
          </span>
        </p>
      </div>
      <p>
        Concept from&nbsp;<span className="font-bold">Today I Learned</span>
        &nbsp;project from&nbsp;
        <span className=" font-bold tracking-wide text-definedColor-faded underline underline-offset-1">
          <a
            href="https://www.udemy.com/course/full-stack-crash-course/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 active:text-blue-950"
          >
            Jonas Schmedtmann's course
          </a>
        </span>
      </p>
    </div>
  );
}

export default Footer;

// https://github.com/annasfaruqui

// https://www.udemy.com/course/full-stack-crash-course/

// https://www.linkedin.com/in/mohammed-annas-faruqui-31a40a1ba
