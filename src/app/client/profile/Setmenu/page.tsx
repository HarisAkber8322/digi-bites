"use client";
import Div from "../../../../components/UI/Div";  // Adjust the import path as necessary
import Text from "../../../../components/UI/Text"; // Adjust the import path as necessary
import SetMenu from "../../../../components/ClientComponent/OtherComponents/SetMenu"; // Adjust the import path as necessary
import Image from "next/image";
import React, { useState, useContext } from "react";

const SetMenuPage = () => {
  return (
    <Div
      themeDivClasses="flex flex-col items-center w-[1180px] m-auto"
      content={
        <>
          <div className=" w-full">
            <Image
              src="/images/your-image.jpg" // Replace with your image path
              width={1180}
              height={150}
              alt="Set Menu Image"
              className=" bg-white "
            />
          </div>
          <div className="mt-10">
            <SetMenu />
          </div>
        </>
      }
    />
  );
};

export default SetMenuPage;