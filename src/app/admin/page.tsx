// pages/burger.tsx
"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import React, { useState } from "react"; // Adjust according to your project structure

const Dashboard: React.FC = () => {
  return (
    <div>
      <Text
        themeDivClasses="text-3xl font-bold block mb-5"
        content="Dashboard"
      />
      <Div
        lightColor="bg-transparent"
        themeDivClasses={""}
        content={<div className=""></div>}
      />
    </div>
  );
};

export default Dashboard;
