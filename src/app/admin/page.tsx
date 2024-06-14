// pages/burger.tsx
"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import React, { useState } from "react";
import BusinessAnalytics from "../../components/AdminComponents/AdminOthersComp/BusinessAnalytics"; // Adjust according to your project structure
import OrderStatistics from "@/components/AdminComponents/AdminOthersComp/OrderStatistics";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Div
        lightColor="bg-bgGrey"
        darkColor="bg-lightBlack"
        themeDivClasses={""}
        content={
          <>
            <Div
              darkColor="bg-lightBlack"
              lightColor="bg-bgGrey"
              themeDivClasses="flex flex-col mb-5"
              content={
                <>
                  <Text
                    themeDivClasses="text-3xl font-bold block "
                    content="Welcome, Admin."
                  />
                  <Text
                    themeDivClasses="text-medium font-semibold text-themeYellow "
                    content="Monitor your business analytics and statistics"
                  />
                </>
              }
            />
            <BusinessAnalytics />
            <OrderStatistics/>
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
