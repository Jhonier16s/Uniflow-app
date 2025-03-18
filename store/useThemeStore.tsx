import { create } from "zustand";
import { themes } from "../theme/theme"; 

type ThemeState = {
  theme: "light" | "dark";
  themeStyles: typeof themes.light; 
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  themeStyles: themes.light, 
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      return { theme: newTheme, themeStyles: themes[newTheme] };
    }),
}));
