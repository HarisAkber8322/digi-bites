import React, { useContext } from "react";
import ThemeStoreContext from "../../store/ThemeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";

const ToggleThemeComponent = () => {
  const themeStore = useContext(ThemeStoreContext);
  const { themeMode } = themeStore;
  return (
    <div>
      <FontAwesomeIcon
        cursor={"pointer"}
        icon={themeMode === "light" ? faMoon : faSun}
        size={"1x"}
        color={"#fbbc09"}
        onClick={themeStore.toggleThemeMode}
      />
    </div>
  );
};
export default observer(ToggleThemeComponent);
