import React from "react";
import HeaderComponent from "@/components/Header";
import SideBarComponent from "./Sidebar";
import { useState } from "react";
import { Content, RightSideBar } from "@/styles/globalStyles";
import  RightSideBarComponent  from "../components/RigthSideBar";
const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [rightoggle, setRightToggle] = useState(false);
  const HandleToggle = () => {
    setToggle(toggle ? false : true);
  };
  const HandleRigthToggle = () => {
    setRightToggle(rightoggle ? false : true);
  };
  return (
    <>
      <HeaderComponent toggle={toggle} setToggle={setToggle} HandleToggle={HandleToggle} HandleRigthToggle={HandleRigthToggle} />
      <div className="main_content">
        <div>
          <SideBarComponent toggle={toggle}/>
        </div>
        <Content toggle={`${toggle}`}  rightoggle={`${rightoggle}`} >{children}</Content>
        <RightSideBar  rightoggle={`${rightoggle}`} >
       <RightSideBarComponent rightoggle={rightoggle} /> 
        </RightSideBar>
      </div>
    </>
  );
};
export default Layout;
