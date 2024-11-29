"use client";
import React, { useEffect, useContext, useState } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { observer } from "mobx-react";
import { Image } from "react-bootstrap";
import OrderStoreContext from "@/store/OrderStore";
const statusData = [
  { name: "In Process", imageUrl: "/images/Icons/icons8-pending-96.png" },
  {
    name: "Delayed",
    imageUrl: "/images/Icons/icons8-submit-progress-96.png",
  },
  { name: "Ready", imageUrl: "/images/Icons/icons8-confirmed-96.png" },
  { name: "On Way", imageUrl: "/images/Icons/deliver.png" },
  { name: "Delivered", imageUrl: "/images/Icons/icons8-waiter-96.png" },
];
const initialCounts = statusData.reduce((acc, status) => {
  acc[status.name] = 0;
  return acc;
}, {});
const BusinessAnalytics = () => {
  const orderStore = useContext(OrderStoreContext);
  const [statusCounts, setStatusCounts] = useState(initialCounts);
  useEffect(() => {
    orderStore.loadOrders();
  }, [orderStore]);
  useEffect(() => {
    const counts = statusData.reduce((acc, status) => {
      acc[status.name] = 0;
      return acc;
    }, {});

    orderStore.orderList.forEach((order) => {
      if (counts.hasOwnProperty(order.status)) {
        counts[order.status]++;
      }
    });

    setStatusCounts(counts);
  }, [statusData, orderStore.orderList]);

  return (
    <Div
      themeDivClasses="rounded-xl shadow-md p-6 overflow-hidden"
      darkColor="bg-pepperBlack"
      content={
        <>
          <Text
            themeDivClasses="text-lg flex flex-row items-center font-medium mb-6 gap-2"
            content={
              <>
                <Image
                  src={"/images/Icons/icons8-rank-96.png"}
                  alt="name"
                  className="h-8 w-8"
                />
                Orders Analytics
              </>
            }
          />
          <div className="grid grid-cols-5 gap-5">
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
                          <p>{data.name} <br></br>{statusCounts[data.name]}</p>
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
          </div>
        </>
      }
    />
  );
};

export default observer(BusinessAnalytics);
