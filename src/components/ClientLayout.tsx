"use client";

import React, { useContext, useState } from "react";
import HeaderComponent from "@/components/ClientComponent/Header";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import ThemeStoreContext from "@/store/ThemeStore";
import classNames from "classnames";
import Div from "./UI/Div";
import Slider from "../components/ClientComponent/OtherComponents/slider";

const ClientLayout = (
  { children }: { children: React.ReactNode; }
) => {
  const [toggle, setToggle] = useState(false);
  const themeStore = useContext(ThemeStoreContext);

  const HandleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <HeaderComponent
        HandleToggle={HandleToggle}
        themeStore={themeStore}
      />
      <Slider/>
      <Div 
        content={children}
        themeDivClasses={classNames(["ease-in-out duration-300 w-full h-full pt-[64px]", themeStore.themeMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"])}
      />
    </>
  );
};

export default observer(dynamic(() => Promise.resolve(ClientLayout), { ssr: false }));
