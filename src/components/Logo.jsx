function Logo() {
  return (
    <div className="mx-auto mb-8 flex flex-col items-center gap-6 py-5 sm:flex-row md:mx-0 md:mb-0 md:gap-2">
      <img className="h-16 w-16" src="logo.png" alt="logo" />
      <h1 className="text-2xl font-extrabold uppercase text-definedColor-base sm:mx-0 sm:text-4xl">
        Today I Learned
      </h1>
    </div>
  );
}

export default Logo;
