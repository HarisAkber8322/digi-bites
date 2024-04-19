import { observer } from "mobx-react";
import { ReactNode, useContext } from "react";
import classNames from "classnames";
import ThemeStoreContext from "@/store/ThemeStore";
const Text = ({
  content,
  themeDivClasses,
}: {
  content: ReactNode;
  themeDivClasses: string;
}) => {
  const themeStore = useContext(ThemeStoreContext);

  return (
    <span
      className={classNames(
        themeDivClasses,
        themeStore.themeMode === "light" ? "text-black" : "text-white",
      )}
    >
      {content}
    </span>
  );
};
export default observer(Text);
