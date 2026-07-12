import { useState } from "react";
import { useFacts } from "../contexts/FactsContext";
import { useTheme } from "../contexts/ThemeContext";
import { COLOR_THEMES } from "../data/data-colorThemes";
import { resetDatabase } from "../data/data-initialFacts";
import Button from "./Button";
import Logo from "./Logo";
import ThemeButton from "./ThemeButton";

function Header({ onHandleToggle, isFormOpen }) {
  const { handleChangeTheme } = useTheme();
  const { dispatch } = useFacts();
  const [isResetting, setIsResetting] = useState(false);

  const showResetButton = import.meta.env.VITE_ENABLE_DB_RESET === "true";

  async function handleReset() {
    if (
      window.confirm(
        "Are you sure you want to reset the database to initial facts?",
      )
    ) {
      setIsResetting(true);
      dispatch({ type: "loading" });

      try {
        const data = await resetDatabase();
        dispatch({ type: "facts/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: err.message });
      } finally {
        setIsResetting(false);
      }
    }
  }

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

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:flex-row">
          {showResetButton && (
            <Button
              color="bg-definedColor-accent3"
              fixedWidth={true}
              onClick={handleReset}
              disabled={isResetting}
            >
              {isResetting ? "Resetting..." : "Reset DB"}
            </Button>
          )}

          <Button
            additionalClassName="gradient-background"
            fixedWidth={true}
            cta={true}
            onClick={onHandleToggle}
          >
            {isFormOpen ? "Close" : "Share a fact"}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
