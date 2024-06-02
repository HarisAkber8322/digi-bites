"use client";
import React from "react";
import "../styles/global.css";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import Div from "@/components/UI/Div";
const App = () => {
  return (
    <>
      <Div content="Home" themeDivClasses="" />
    </>
  );
};

export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));
