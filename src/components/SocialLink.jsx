function SocialLink({ link }) {
  return (
    <span>
      <a
        href={link.link}
        target="_blank"
        rel="noreferrer"
        className="hover:text-blue-500 active:text-blue-950"
      >
        <span>
          <link.icon />
        </span>
      </a>
    </span>
  );
}

export default SocialLink;
