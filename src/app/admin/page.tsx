"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import React from "react";
import BusinessAnalytics from "../../components/AdminComponents/AdminOthersComp/BusinessAnalytics";
import { menuData } from "@/utills/constants";
import TopRatedItems from "@/components/AdminComponents/AdminOthersComp/TopRatedItems";
import TopCustomers from "@/components/AdminComponents/AdminOthersComp/TopCustomers";
import TopSellingProducts from "@/components/AdminComponents/AdminOthersComp/TopSellingProducts";
const Dashboard: React.FC = () => {
  // const items = menuData.flatMap((category) => category.items);
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
              {/* <TopSellingProducts items={items} /> */}
            </div>
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
