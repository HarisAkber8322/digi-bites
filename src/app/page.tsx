"use client";
import React from "react";
import "../styles/global.css";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import Text from "@/components/UI/Text";
import classNames from "classnames";
import Slider from "../components/ClientComponent/OtherComponents/slider";
import SetMenuComponent from "../components/ClientComponent/OtherComponents/SetMenu";
import CategorySlider from "@/components/ClientComponent/OtherComponents/CategorySlider";
import CardGrid from "@/components/ClientComponent/OtherComponents/CardGrid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompleteMenu from "../components/ClientComponent/OtherComponents/CompleteMenu";

const App = ({ Component, pageProps }: any) => {
  const handleCardClick = (menuItem: any) => {
    console.log("Card clicked:", menuItem);
  };

  return (
    <>
      <div className="mt-5 w-full md:w-[1180px] m-auto">
        <Slider />
      </div>
      {/* <div className="w-full md:w-[1180px] m-auto">
        <CategorySlider />
      </div> */}
      {/* <div>
        <SetMenuComponent/>
      </div> */}
      <div>
        <CardGrid />
      </div>
      <div className="w-full md:w-[1180px] m-auto">
        <CompleteMenu handleCardClick={handleCardClick} />
      </div>
    </>
  );
};

export default observer(dynamic(() => Promise.resolve(App),{ ssr: false }));
