"use client";
import CardGrid from "@/components/ClientComponent/OtherComponents/CardGrid";
import Slider from "@/components/ClientComponent/OtherComponents/slider";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import CompleteMenu from "@/components/ClientComponent/OtherComponents/CompleteMenu";
import CategorySlider from "@/components/ClientComponent/OtherComponents/CategorySlider";

const App = () => {
  const handleCardClick = (menuItem: any) => {
    console.log("Card clicked:", menuItem);
  };
  return (
    <>
      <div className="mt-[28px] w-full md:w-[1180px] m-auto">
        <Slider />
      </div>
      <div className="w-full md:w-[1180px] m-auto">
        <CategorySlider />
      </div>
      {/* 
          <div>
            <SetMenuComponent/>
          </div>
      */}
      <div className="my-[28px]">
        <CardGrid />
      </div>
      <div className="w-full md:w-[1180px] m-auto">
        <CompleteMenu handleCardClick={handleCardClick} />
      </div>
    </>
  );
};

export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));
