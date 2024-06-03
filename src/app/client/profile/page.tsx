// pages/profilepage.tsx
"use client";
import React from "react";
import { observer } from "mobx-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Div from "../../../components/UI/Div";
import Text from "../../../components/UI/Text";
import dynamic from "next/dynamic";
import { CardData } from "../../../utills/constants"; // Adjust the path as needed

const Profile = () => {
  return (
    <Div
      themeDivClasses="min-h-screen md:w-[1180px] m-auto pt-6"
      lightColor="bg-white1"
      darkColor="bg-pepperblack"
      content={
        <>
          <div className="md:relative ">
            <Image
              src="/images/cover-photo.jpg" // Replace with actual cover photo path
              alt="Cover"
              width={1200}
              height={400}
              className="w-full h-64 object-cover bg-dullyellow"
            />
            <div className="absolute top-20 left-8 rounded-full w-[250px] h-[250px]">
              <Image
                src="/images/profile-photo.jpg" // Replace with actual profile photo path
                alt="Profile"
                width={250}
                height={250}
                className="rounded-full border-4 border-white bg-yellow-200"
              />
            </div>
          </div>
          <div className="mt-16 px-0 p-8">
            <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 gap-5">
              {CardData.map((card) => (
                <Div
                  key={card.id}
                  lightColor="bg-ExtraLightGray"
                  darkColor="bg-pepperblack2"
                  themeDivClasses="w-[172px] h-[172px] flex flex-col items-center justify-center p-0 m-0 rounded-[30px] shadow-md transition duration-300 hover:bg-ExtraLightGray hover:bg-opacity-20"
                  content={
                    <>
                      <Text
                        themeDivClasses="text-6xl font-light"
                        content={<FontAwesomeIcon icon={card.icon} />}
                      />
                      <Text
                        themeDivClasses="mt-2 text-lg"
                        content={card.name}
                      />
                    </>
                  }
                />
              ))}
            </div>
          </div>
        </>
      }
    />
  );
};

export default observer(
  dynamic(() => Promise.resolve(Profile), { ssr: false })
);
