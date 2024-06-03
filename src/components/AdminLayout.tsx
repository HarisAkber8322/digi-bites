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
        <SideBarComponent toggle={toggle} />
        <Div
          content={children}
          lightColor="bg-lightGray"
          themeDivClasses={classNames([
            "children ease-in-out duration-300 w-full min-h-[100vh] p-4 md:p-8 !pt-[96px]",
            toggle ? "ml-[80px]" : "!ml-[250px]",
          ])}
        />
      </div>
    </>
  );
};
export default observer(
  dynamic(() => Promise.resolve(AdminLayout), { ssr: false }),
);
