"use client";
import React, { useEffect, useContext, useState } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { observer } from "mobx-react";
import { Image } from "react-bootstrap";
import OrderStoreContext from "@/store/OrderStore";

const statusData = [
  { name: "Pending", imageUrl: "/images/Icons/icons8-pending-96.png" },
  { name: "Confirmed", imageUrl: "/images/Icons/icons8-confirmed-96.png" },
  {
    name: "Processing",
    imageUrl: "/images/Icons/icons8-submit-progress-96.png",
  },
  { name: "Readyforpickup", imageUrl: "/images/Icons/icons8-waiter-96.png" },
];

const smallDivData = [
  { name: "Picked", imageUrl: "/images/Icons/icons8-done-96.png" },
  { name: "Canceled", imageUrl: "/images/Icons/icons8-clear-search-96.png" },
  { name: "Returned", imageUrl: "/images/Icons/icons8-homework-96.png" },
  { name: "Discard", imageUrl: "/images/Icons/icons8-fail-96.png" },
];

const BusinessAnalytics = () => {
  const orderStore = useContext(OrderStoreContext); // Access OrderStore from context
  const [statusCounts, setStatusCounts] = useState({
    Pending: 0,
    Picked: 0,
    Returned: 0,
    Readyforpickup: 0,
    Confirmed: 0,
    Processing: 0,
    Canceled: 0,
    Discard: 0,
  });

  useEffect(() => {
    orderStore.loadOrders(); // Load orders on component mount

    // Calculate status counts when orders are loaded
    const calculateStatusCounts = () => {
      const counts = {
        Pending: 0,
        Picked: 0,
        Returned: 0,
        Readyforpickup: 0,
        Confirmed: 0,
        Processing: 0,
        Canceled: 0,
        Discard: 0,
      };

      orderStore.orderList.forEach((order) => {
        if (counts.hasOwnProperty(order.status)) {
          counts[order?.status]++;
        }
      });

      setStatusCounts(counts);
    };

    calculateStatusCounts();
  }, [orderStore]);

  return (
    <Div
      themeDivClasses="h-[325px] rounded-xl shadow-md p-6 overflow-hidden"
      darkColor="bg-pepperBlack"
      content={
        <>
          {/* Upper Corner Text */}
          <Text
            themeDivClasses="text-lg flex flex-row items-center font-medium mb-6 gap-2"
            content={
              <>
                <Image
                  src={"/images/Icons/icons8-rank-96.png"}
                  alt="name"
                  className="h-8 w-8"
                />
                Business Analytics
              </>
            }
          />

          {/* Grid of Divs */}
          <div className="grid grid-cols-4 gap-5">
            {statusData.map((data, index) => (
              <Div
                key={index}
                themeDivClasses="h-[130px] flex items-center shadow border border-ExtraLightGray rounded-xl relative"
                content={
                  <>
                    <Text
                      themeDivClasses="pl-4 text-medium font-medium"
                      content={
                        <div>
                          {data.name} <br></br>
                          {statusCounts[data.name]}
                        </div>
                      }
                    />
                    <div className="absolute top-2 right-2">
                      <Image
                        src={data.imageUrl}
                        alt={data.name}
                        className="h-8 w-8"
                      />
                    </div>
                  </>
                }
              />
            ))}
            {smallDivData.map((data, index) => (
              <Div
                key={index}
                themeDivClasses="h-[65px] rounded-xl p-4 flex items-center"
                lightColor="bg-bgGrey"
                content={
                  <>
                    <div className="flex justify-start">
                      <Image
                        src={data.imageUrl}
                        alt={data.name}
                        className="h-6 w-6"
                      />
                    </div>
                    <Text
                      themeDivClasses="pl-2 block w-full font-medium text-gray"
                      content={
                        <div className="flex justify-between items-center w-full">
                          <span>{data.name}</span>
                          <span> {statusCounts[data.name]}</span>
                        </div>
                      }
                    />
                  </>
                }
              />
            ))}
          </div>
        </>
      }
    />
  );
};

export default observer(BusinessAnalytics);
