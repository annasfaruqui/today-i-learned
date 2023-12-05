import SocialLink from "./SocialLink";
import { socialLinks } from "../data/data-social";

function Footer() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-4 p-2 px-6 font-[Sono] text-definedColor-base md:gap-0">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <p>
          &lt;/&gt; Coded by&nbsp;
          <span className="font-bold tracking-wide">
            Mohammed Annas Faruqui
          </span>
        </p>
        <p className="flex items-center gap-4 text-2xl font-bold">
          {socialLinks.map((link, idx) => (
            <SocialLink key={idx} link={link} />
          ))}
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
