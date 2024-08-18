"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import React from "react";
import BusinessAnalytics from "../../components/AdminComponents/AdminOthersComp/BusinessAnalytics";
import OrderStatistics from "@/components/AdminComponents/AdminOthersComp/OrderStatistics";
import OrderStatusChart from "@/components/AdminComponents/AdminOthersComp/OrderStatusChart";
import EarningStatistics from "@/components/AdminComponents/AdminOthersComp/EarningStatistics";
import { menuData } from "@/utills/constants";
import TopRatedItems from "@/components/AdminComponents/AdminOthersComp/TopRatedItems";
import TopCustomers from "@/components/AdminComponents/AdminOthersComp/TopCustomers";
import TopSellingProducts from "@/components/AdminComponents/AdminOthersComp/TopSellingProducts";

const Dashboard: React.FC = () => {
  const items = menuData.flatMap(category => category.items);

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
            <div className="grid grid-cols-3 w-full overflow-hidden">
              <OrderStatistics />
              <OrderStatusChart />
             
            </div>
            <div className="grid grid-cols-3 w-full overflow-hidden">
            <EarningStatistics  />
            </div>
            <div className="grid grid-cols-3 w-full overflow-hidden pb-6">
              <TopRatedItems />
              <TopCustomers items={items} />
              <TopSellingProducts items={items} />
            </div>
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
