import { useTheme } from "../contexts/ThemeContext";
import Button from "./Button";
import Logo from "./Logo";

import { COLOR_THEMES } from "../data/data-colorThemes";
import ThemeButton from "./ThemeButton";

function Header({ onHandleToggle, isFormOpen }) {
  const { handleChangeTheme } = useTheme();

  return (
    <header className="mb-8 flex flex-col justify-between gap-2 px-4 md:mb-0 md:flex-row md:items-center md:gap-20 md:px-0">
      <Logo />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="mb-4 flex items-center justify-center gap-10 md:mb-0 md:gap-4">
          {COLOR_THEMES.map((theme, idx) => (
            <ThemeButton
              key={idx}
              theme={theme.theme}
              color={theme.color}
              onChangeTheme={handleChangeTheme}
            />
          ))}
        </div>
        <h2 className="mb-8 text-center text-2xl uppercase md:hidden">
          Try different themes
        </h2>

        <Button
          additionalClassName="gradient-background"
          fixedWidth={true}
          cta={true}
          onClick={onHandleToggle}
        >
          {isFormOpen ? "Close" : "Share a fact"}
        </Button>
      </div>
    </header>
  );
}

export default Header;
