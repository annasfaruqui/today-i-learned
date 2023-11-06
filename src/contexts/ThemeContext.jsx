import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [colorTheme, setColorTheme] = useLocalStorageState(
    "default-theme",
    "colorTheme",
  );

  function handleChangeTheme(themeValue) {
    setColorTheme(themeValue);
  }

  useEffect(
    function () {
      document.documentElement.className = colorTheme;
    },
    [colorTheme],
  );

  return (
    <ThemeContext.Provider value={{ colorTheme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error(
      "ThemeContext was used outside the ThemeProvider component",
    );

  return context;
}

export { ThemeProvider, useTheme };
