import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import React from "react";
import Div from "../UI/Div";
import classNames from "classnames";

const ClientLoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Div
            darkColor="bg-lightBlack"
            lightColor="bg-bgGrey"
            themeDivClasses={classNames(["p-5 w-full flex justify-center items-center min-h-[100vh] h-auto"])}
            content={children}
        />
    );
};

export default observer(
    dynamic(() => Promise.resolve(ClientLoginLayout), { ssr: false })
);
