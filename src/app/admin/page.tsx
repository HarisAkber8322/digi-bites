// pages/burger.tsx
"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import React, { useState } from "react"; 
import BusinessAnalytics from "../../components/AdminComponents/AdminOthersComp/BusinessAnalytics"// Adjust according to your project structure

const Dashboard: React.FC = () => {
  return (
    <Div
      lightColor=""
      themeDivClasses={""}
      content={
        <>
          <Div
            darkColor="bg-pepperBlack"
            themeDivClasses="flex flex-col pb-[35px]"
            content={
              <>
                <Text
                  themeDivClasses="text-xl font-semibold "
                  lightColor="text-lightorange"
                  darkColor="text-lightorange"
                  content="Welcome, Admin."
                />
                <Text
                  themeDivClasses="text-medium font-semibold "
                  content="Monitor your business analytics and statistics"
                />
              </>
            }
            
          />
            <BusinessAnalytics />
        </>
      }
    />
  );
};

export default Dashboard;
