function Button({
  children,
  color,
  fixedWidth = false,
  cta = false,
  onClick,
  additionalClassName,
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        additionalClassName ? additionalClassName : ""
      } rounded-full p-3 px-10 ${color ? color : ""}  ${
        !fixedWidth ? "w-full" : "w-auto"
      } z-10 transition-all duration-300 hover:-rotate-3 hover:scale-110`}
    >
      <span
        className={`${
          cta ? "mb-8 text-xl" : "text-md"
        } font-semibold uppercase tracking-wider text-definedColor-base`}
      >
        {children}
      </span>
    </button>
  );
}

export default Button;
