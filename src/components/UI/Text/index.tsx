import { observer } from "mobx-react";
import { ReactNode } from "react";

const Text = ({ content, className, themeMode }: { content: ReactNode, className: string, themeMode: string }) => {
    return (
        <span className={className + " " + themeMode === 'light' ? "text-black" : "text-white"} >
            {content}
        </span>
    )
}
export default observer(Text);