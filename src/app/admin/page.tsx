// pages/burger.tsx
"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import React, { useState } from "react";
import BusinessAnalytics from "../../components/AdminComponents/AdminOthersComp/BusinessAnalytics"// Adjust according to your project structure

const Dashboard: React.FC = () => {
  return (
    <div>

      <Div
        lightColor="bg-lightGray"
        darkColor="bg-lightBlack"
        themeDivClasses={""}
        content={
          <>
            <Div
              darkColor="bg-lightBlack"
              lightColor="bg-lightGray"
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
            <BusinessAnalytics /></>
        }
      />
    </div>
  );
};

export default Dashboard;
