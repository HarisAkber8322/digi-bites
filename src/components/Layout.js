import React from "react";
import HeaderComponent from "@/components/Header";
import SideBarComponent from "./Sidebar";
import { useState } from "react";
import { Content } from "@/styles/globalStyles";
const Layout = ({ children }) => {
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
export default Layout;
