import { observer } from "mobx-react";
import classNames from "classnames";
const Div = ({ content, themeDivClasses, themeMode }: { content: string, themeDivClasses: string, themeMode: string }) => {
    return (
        <div className={classNames(themeDivClasses,themeMode === 'light' ? "bg-white" : "bg-black")}> 
            {content}
        </div>
    )
}
export default observer(Div);