import { observer } from "mobx-react";
import classNames from "classnames";
import ThemeStoreContext from "../../../store/ThemeStore";
import { useContext } from "react";
const Div = ({
  content,
  themeDivClasses,
  lightColor,
  darkColor,
}: {
  content: React.ReactNode;
  themeDivClasses: string;
  lightColor?: string;
  darkColor?: string;
}) => {
  const themeStore = useContext(ThemeStoreContext);
  return (
    <div
      className={classNames (
        themeStore.themeMode === "light"
          ? lightColor 
            ? lightColor
            : "bg-white"
          : darkColor 
            ? darkColor
            : "bg-black",
        themeDivClasses
      )}
    >
      {content}
    </div>
  );
};
export default observer(Div);