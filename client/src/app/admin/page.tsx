"use client";
import Div from "../../components/UI/Div";
import Text from "../../components/UI/Text";
import React from "react";
import BusinessAnalytics from "../../components/AdminComponents/AdminOthersComp/BusinessAnalytics";
import TopRatedItems from "../../components/AdminComponents/AdminOthersComp/TopRatedItems";
import TopCustomers from "../../components/AdminComponents/AdminOthersComp/TopCustomers";
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
                    themeDivClasses="text-3xl font-bold block"
                    content="Welcome, Admin."
                  />
                  <Text
                    themeDivClasses="text-medium font-semibold text-themeYellow"
                    content="Monitor your business analytics and statistics"
                  />
                </>
              }
            />
            <BusinessAnalytics />
            <div className="grid grid-cols-2 w-full overflow-hidden pb-6 mt-10 gap-5">
              <TopRatedItems />
              <TopCustomers />
            </div>
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
