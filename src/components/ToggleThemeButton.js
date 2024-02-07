import React, { useContext } from "react";
import ThemeStoreContext from "@/store/ThemeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

const ToggleThemeComponent = () => {
  const themeStore = useContext(ThemeStoreContext);
  return (
    <div>
      {themeStore.themeMode}
      <FontAwesomeIcon
        cursor={"pointer"}
        icon={themeStore.themeMode === "light" ? faSun : faMoon}
        size={"1x"}
        color={themeStore.themeMode === "light" ? "#ffc800" : "#111111"}
        onClick={themeStore.toggleThemeMode}
      />
    </div>
  );
};
export default observer(ToggleThemeComponent);
