// pages/client/burger.tsx
"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import { observer } from "mobx-react-lite";
import React, { useState } from "react"; // Adjust according to your project structure

const Dashboard: React.FC = () => {
  return (
    <Div
      themeDivClasses={"w-full "}
      darkColor="bg-pepperBlack"
      content={
        <>
          <Text themeDivClasses={""} 
          content={<>
          <h1>DashBoard</h1>
          </>} 
          />
        </>
      }
    />
  );
};

export default  observer (Dashboard);
