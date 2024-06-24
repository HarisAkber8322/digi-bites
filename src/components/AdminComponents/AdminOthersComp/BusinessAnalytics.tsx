// components/BusinessAnalytics.js
import React from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { observer } from "mobx-react";
import { Image } from "react-bootstrap";

const businessData = [
  { name: "Pending", imageUrl: "/images/Icons/icons8-pending-96.png" },
  { name: "Confirmed", imageUrl: "/images/Icons/icons8-confirmed-96.png" },
  {
    name: "Processing",
    imageUrl: "/images/Icons/icons8-submit-progress-96.png",
  },
  { name: "Ready for pickup", imageUrl: "/images/Icons/icons8-waiter-96.png" },
];

const smallDivData = [
  { name: "Picked ", imageUrl: "/images/Icons/icons8-done-96.png" },
  { name: "Canceled", imageUrl: "/images/Icons/icons8-clear-search-96.png" },
  { name: "Returned", imageUrl: "/images/Icons/icons8-homework-96.png" },
  { name: "Discard", imageUrl: "/images/Icons/icons8-fail-96.png" },
];

const BusinessAnalytics = () => {
  return (
    <Div
      themeDivClasses="h-[325px] rounded-xl shadow-lg p-6 overflow-hidden"
      darkColor="bg-pepperBlack "
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
            {businessData.map((data, index) => (
              <Div
                key={index}
                themeDivClasses="h-[130px] flex items-center shadow border border-ExtraLightGray rounded-xl relative"
                content={
                  <>
                    <Text
                      themeDivClasses="pl-4 text-medium font-medium"
                      content={data.name}
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
                themeDivClasses="h-[65px] rounded-xl flex  items-center "
                lightColor="bg-bgGrey"
                content={
                  <>
                    <div className=" flex justify-start pl-4 ">
                      <Image
                        src={data.imageUrl}
                        alt={data.name}
                        className="h-6 w-6"
                      />
                    </div>
                    <Text
                      themeDivClasses="pl-2 font-medium text-gray"
                      content={data.name}
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
