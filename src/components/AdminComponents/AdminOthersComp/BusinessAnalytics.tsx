// components/BusinessAnalytics.js
import React from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { observer } from "mobx-react";
const BusinessAnalytics = () => {
  return (
    <Div
      themeDivClasses="h-[325px] rounded-xl shadow-lg p-6 overflow-hidden"
      darkColor="bg-pepperBlack "
      content={
        <>
          {/* Upper Corner Text */}
          <Text
            themeDivClasses="text-lg font-medium mb-8 block"
            content={<>Business Analytics</>}
          />

          {/* Grid of Divs */}
          <div className="grid grid-cols-4 gap-5 ">
            {Array.from({ length: 4 }).map((_, index) => (
              <Div
                key={index}
                themeDivClasses="h-[130px] shadow border border-ExtraLightGray rounded-xl"
                content={<Text themeDivClasses="" content={index + 1} />}
              />
            ))}
            {Array.from({ length: 4 }).map((_, index) => (
              <Div
                key={index}
                themeDivClasses="h-[65px] rounded-xl shadow"
                lightColor="bg-ExtraLightGray"
                content={<Text themeDivClasses="" content={index + 1} />}
              />
            ))}
          </div>
        </>
      }
    />
  );
};

export default observer(BusinessAnalytics);
