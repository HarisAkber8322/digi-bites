"use client";
import React, { useContext, useState } from "react";
import HeaderComponent from "@/components/ClientComponent/Header";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import ThemeStoreContext from "@/store/ThemeStore";
import classNames from "classnames";
import Div from "./UI/Div";
import FooterComponent from "./ClientComponent/Footer";


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(false);
  const themeStore = useContext(ThemeStoreContext);

  const HandleToggle = () => {
    setToggle(!toggle);
  };

  return (

    <Div
      content={
        <>
          <HeaderComponent
            HandleToggle={HandleToggle}
            themeStore={themeStore}
          />
          <Div
            themeDivClasses={classNames(["ease-in-out duration-300 w-full pt-[64px] min-h-[100vh] bg-pepperBlack"])}
            content={children}
          />
          <FooterComponent />
        </>
      }
      themeDivClasses={classNames(["ease-in-out duration-300 w-full "])}
    />
  );
};

export default observer(
  dynamic(() => Promise.resolve(ClientLayout), { ssr: false })
);
