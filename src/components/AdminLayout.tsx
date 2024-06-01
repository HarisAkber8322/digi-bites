"use client";
import React, { useContext } from "react";
import HeaderComponent from "@/components/AdminComponents/Header";
import SideBarComponent from "../components/AdminComponents/Sidebar";
import { useState } from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Div from "./UI/Div";
const Layout = (
  { children }: { children: React.ReactNode; }
) => {
  const [toggle, setToggle] = useState(false);
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
     <HeaderComponent toggle={toggle} setToggle={setToggle} handleToggle={HandleToggle}/>
      <div className="flex ">
        <SideBarComponent  toggle={toggle} 
        //  themeStore={themeStore} 
        />
       
       
        <Div content={children} themeDivClasses={classNames(["ease-in-out duration-300 bg-lightGary !w-full h-full pt-[64px]",toggle?"ml-[80px]" : "!ml-[250px]" ])} />
       
       

    </div >
    </>
  );
};
export default observer(dynamic(() => Promise.resolve(Layout), { ssr: false }))


