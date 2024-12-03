import { observer } from "mobx-react";
import { ReactNode, useContext } from "react";
import classNames from "classnames";
import ThemeStoreContext from "../../../store/ThemeStore";

const Text = ({
  content,
  themeDivClasses,
  lightColor,
  darkColor,
}: {
  content: ReactNode;
  themeDivClasses: string;
  lightColor?: string;
  darkColor?: string;
}) => {
  const themeStore = useContext(ThemeStoreContext);

  return (
    <span
      className={classNames(
        themeDivClasses,
        themeStore.themeMode === "light"
          ? lightColor
            ? lightColor
            : "text-black"
          : darkColor
            ? darkColor
            : "text-white",
      )}
    >
      {content}
    </span>
  );
};

export default observer(Text);
