import React, { createContext, useState, useContext } from "react";
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#FFB200"); // 3368b5
  const [secondaryColor, setSecondaryColor] = useState("black");
  const [navbarHeight, setNavbarHeight] = useState(30);
  const [pathHeight, setPathbarHeight] = useState(30);
  // const [apiLinks, setapiLinks] = useState(
  //   "https://crystalsolutions.com.pk/chef_kitchen"
  // );
  const [apiLinks, setapiLinks] = useState(
    "https://crystalsolutions.com.pk/nosh_grill"
  );

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define theme-related values
  const theme = {
    isDarkMode,
    toggleTheme,
    primaryColor,
    secondaryColor,
    navbarHeight,
    pathHeight,
    apiLinks,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
