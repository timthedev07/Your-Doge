import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeControlProps {
  children: JSX.Element;
}

interface ThemeContextStrcut {
  toggleTheme: () => void;
  darkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextStrcut | null>(null);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeControl: React.FC<ThemeControlProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const cachedData = localStorage.getItem("darkTheme");
    // retrieve user preference from cache, if none exists, use light theme by default
    return cachedData ? JSON.parse(cachedData!) : false;
  });

  const toggleTheme = () => {
    setDarkTheme((prev) => {
      const res = !prev;

      // store this in local storage
      localStorage.setItem("darkTheme", `${res}`);

      return res;
    });
  };

  // actually let the darktheme.css work on every visit
  useEffect(() => {
    // add dark theme class to body
    const body = document.querySelector("body")!;
    if (darkTheme) {
      if (!body.classList.contains("dark")) {
        body.classList.add("dark");
      }
    } else {
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
      }
    }
  }, [darkTheme]);

  const value = {
    toggleTheme,
    darkTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
