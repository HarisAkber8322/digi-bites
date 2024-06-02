"use client";
import React, { useContext } from "react";
import HeaderComponent from "@/components/AdminComponents/Header";
import SideBarComponent from "@/components/AdminComponents/Sidebar";
import { useState } from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Div from "@/components/UI/Div";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(false);
  const HandleToggle = () => {
    setToggle(toggle ? false : true);
  };
  return (
    <>
      <HeaderComponent
        toggle={toggle}
        setToggle={setToggle}
        handleToggle={HandleToggle}
      />
      <div className="flex ">
        <SideBarComponent toggle={toggle}/>
        <Div
          content={children}
          themeDivClasses={classNames([
            "ease-in-out duration-300 bg-lightGary !w-full h-full pt-[64px]",
            toggle ? "ml-[80px]" : "!ml-[250px]",
          ])}
        />
      </div>
    </>
  );
};
export default observer(
  dynamic(() => Promise.resolve(AdminLayout), { ssr: false })
);
