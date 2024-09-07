import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import React from "react";
import Div from "../UI/Div";
import classNames from "classnames";

const AdminLoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Div
            darkColor="bg-lightBlack"
            lightColor="bg-bgGrey"
            themeDivClasses={classNames(["w-full  h-screen"])}
            content={children}
        />
    );
};

export default observer(
    dynamic(() => Promise.resolve(AdminLoginLayout), { ssr: false })
);
