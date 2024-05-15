import { observer } from "mobx-react";
import classNames from "classnames";
import ThemeStoreContext from "@/store/ThemeStore";
import { useContext } from "react";
const Div = ({
  content,
  themeDivClasses,
}: {
  content: React.ReactNode;
  themeDivClasses: string;

}) => {
  const themeStore = useContext(ThemeStoreContext);
  return (
    <div
      className={classNames(
        themeDivClasses,
        themeStore.themeMode === "light" ? "bg-white" : "bg-black",
      )}
    >
      {content}
    </div>
  );
};
export default observer(Div);
