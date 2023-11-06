/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgba(var(${variableName}))`;
    }
  };
}

// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: '"Coiny", Sono, san-serif',
    },

    extend: {
      height: {
        screen: "100dvh",
      },

      textColor: {
        definedColor: {
          base: withOpacity("--color-text-base"),
          faded: withOpacity("--color-text-faded"),
          alert: withOpacity("--color-text-alert"),
        },
      },

      backgroundColor: {
        definedColor: {
          themeDefault: withOpacity("--color-theme-default"),
          themeFaded: withOpacity("--color-theme-faded"),
          themeNeon: withOpacity("--color-theme-neon"),
          themeGold: withOpacity("--color-theme-gold"),

          base1: withOpacity("--color-bg-base1"),
          base2: withOpacity("--color-bg-base2"),
          base3: withOpacity("--color-bg-base3"),
          "base-hover": withOpacity("--color-bg-hover"),

          accent1: withOpacity("--color-accent1"),
          accent2: withOpacity("--color-accent2"),
          accent3: withOpacity("--color-accent3"),
          accent4: withOpacity("--color-accent4"),
          accent5: withOpacity("--color-accent5"),
          accent6: withOpacity("--color-accent6"),
          accent7: withOpacity("--color-accent7"),
          accent8: withOpacity("--color-accent8"),
          accent9: withOpacity("--color-accent9"),
          accent10: withOpacity("--color-accent10"),
        },
      },
    },
  },
  plugins: [],
};

// bg-gradient-to-br from-bg-definedColor-accent1 via-bg-definedColor-accent2 via-bg-definedColor-accent3 via-bg-definedColor-accent4 via-bg-definedColor-accent5 via-bg-definedColor-accent6 via-bg-definedColor-accent7 to-bg-definedColor-accent8
