import React from "react";
import HeaderComponent from "@/components/Header";
import SideBarComponent from "./Sidebar";
import { useState } from "react";
import { Content } from "@/styles/globalStyles";
import { observer } from "mobx-react";
const Layout = ({ children, themeStore }) => {
  const [toggle, setToggle] = useState(false);
  const HandleToggle = () => {
    setToggle(toggle ? false : true);
  };
  return (
    <>
      <HeaderComponent
        toggle={toggle}
        setToggle={setToggle}
        HandleToggle={HandleToggle}
        themeStore={themeStore}
      />
      <div className="main_content">
        <div>
          <SideBarComponent toggle={toggle} />
        </div>
        <Content toggle={`${toggle}`}>{children}</Content>
      </div>
    </>
  );
};
export default observer(Layout);
