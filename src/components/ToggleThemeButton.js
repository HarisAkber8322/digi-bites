import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMoon,  faSliders, faSun } from "@fortawesome/free-solid-svg-icons";
const ToggleThemeComponent = (props) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
    <FontAwesomeIcon
    cursor={"pointer"}
      icon={theme === "dark" ? faMoon : faSun}
      size={"1x"}
      color={theme === "dark" ? "#111111" : "#ffc800"}
      onClick={toggleTheme}
    />
    <FontAwesomeIcon
    cursor={"pointer"}
      icon={faSliders}
      size={"1x"}
      onClick={props.HandleRigthToggle}
    />
    </>
  );
};
export default ToggleThemeComponent;
