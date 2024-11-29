"use client";
import React, {useEffect } from "react";
import HeaderComponent from "@/components/AdminComponents/Header";
import SideBarComponent from "@/components/AdminComponents/Sidebar";
import { useState } from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Div from "@/components/UI/Div";
import { useRouter } from "next/navigation";
import { adminStore } from "@/store/AdminStore";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(false);
  const HandleToggle = () => {
    setToggle(toggle ? false : true);
  };
  const router = useRouter();

  useEffect(() => {
    if (!adminStore.isAdminLoggedIn) {
      router.push("/admin/auth");
    }
  }, [adminStore.isAdminLoggedIn, router]);

  if (!adminStore.isAdminLoggedIn) {
    return null; 
  }
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
          lightColor="bg-bgGrey"
          darkColor="bg-lightBlack"
          themeDivClasses={classNames([
            "children ease-in-out duration-300 w-full min-h-[100vh] p-4 md:p-8 !mt-[64px] overflow-hidden",
            toggle ? "ml-[50px]" : "!ml-[220px]",
          ])}
        />
      </div>
    </>
  );
};
export default observer(
  dynamic(() => Promise.resolve(AdminLayout), { ssr: false }),
);
