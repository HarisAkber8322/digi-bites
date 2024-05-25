import React, { useContext } from "react";
import ThemeStoreContext from "@/store/ThemeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";

const ToggleThemeComponent = ({ themeStore }) => {
  // const themeStore = useContext(ThemeStoreContext);
  // const { themeMode } = themeStore;
  // console.log(themeStore)
  return (
    <div>
      <FontAwesomeIcon
        cursor={"pointer"}
        icon={themeStore.themeMode === "light" ? faMoon : faSun}
        size={"1x"}
        color={themeStore.themeMode === "light" ? "#111111" : "#ffc800"}
        onClick={themeStore.toggleThemeMode}
      />
    </div>
  );
};
export default observer(ToggleThemeComponent);
