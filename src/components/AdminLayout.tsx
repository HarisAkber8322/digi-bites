"use client";
import React, { useContext } from "react";
import HeaderComponent from "@/components/Header";
import SideBarComponent from "@/components/Sidebar";
import { useState } from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import ThemeStoreContext from "@/store/ThemeStore";
import classNames from "classnames";
import Div from "./UI/Div";
const Layout = (
  { children }: { children: React.ReactNode; }
) => {
  const [toggle, setToggle] = useState(false);
  const themeStore = useContext(ThemeStoreContext);
  const HandleToggle = () => {
    setToggle(toggle ? false : true);
  };
  return (
    <>
      {/* <MainStoreContext.Provider value={mainStore}>
      <ThemeStoreContext.Provider value={themeStore}>
        {!isSplash ? (
          <LoginForm {...pageProps} mainStore={mainStore} />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeStoreContext.Provider>
    </MainStoreContext.Provider> */}
      <HeaderComponent
        HandleToggle={HandleToggle}
        themeStore={themeStore}
      />
      <div className="flex ">
        <SideBarComponent toggle={toggle}
        //  themeStore={themeStore} 
        />
        <Div content={children} themeDivClasses={classNames(["ease-in-out duration-300 bg-lightGary w-full h-full pt-[64px]", toggle ? "ml-[250px]" : "ml-0"])} themeMode={themeStore.themeMode} />

    </div >
    </>
  );
};
export default observer(dynamic(() => Promise.resolve(Layout), { ssr: false }))
