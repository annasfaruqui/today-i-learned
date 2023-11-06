function Tag({ children, color }) {
  return (
    <span
      className={`${color} ml-auto rounded-full px-4 pt-1 font-["Coiny"] text-sm uppercase text-definedColor-base`}
    >
      {children}
    </span>
  );
}

export default Tag;
