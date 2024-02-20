import { observer } from "mobx-react";

const Div = ({ content, classNames, themeMode }: { content: string, classNames: string, themeMode: string }) => {
    return (
        <div className={ classNames + themeMode === 'light' ? "bg-white" : "p-4 bg-black"} >
            {content}
        </div>
    )
}
export default observer(Div);