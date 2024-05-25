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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <div className="mt-5 w-full md:w-[1180px] m-auto">
        <Slider />
      </div>
      <div className="w-full md:w-[1180px] m-auto">
        <CategorySlider />
      </div>
      <div className="w-full bg-[#f1f1f1] py-16 m-auto">
        <div className="w-full md:w-[1180px] m-auto">
          <CategorySlider />
        </div>
      </div>
      <div className="w-full md:w-[1180px] m-auto">
        <SetMenuComponent />
      </div>
    </>
  );
};
// export default observer(App);
export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));
