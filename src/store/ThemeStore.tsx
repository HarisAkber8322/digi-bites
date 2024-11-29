import { makeAutoObservable } from "mobx";
import React, { createContext } from "react";

class Theme {
  themeMode = "light";

  constructor() {
    makeAutoObservable(this);
  
    if (typeof window !== "undefined") {
      const storedThemeMode = localStorage.getItem("themeMode");
      if (storedThemeMode) {
        this.themeMode = storedThemeMode;
      }
    }
  }

  toggleThemeMode = () => {
    this.themeMode = this.themeMode === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", this.themeMode);
    }
  };
}

const ThemeStore = new Theme();
const ThemeStoreContext = createContext(ThemeStore);
export default ThemeStoreContext;
