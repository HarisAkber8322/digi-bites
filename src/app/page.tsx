"use client";
import dynamic from "next/dynamic";
import { observer } from "mobx-react";
import Slider from "@/components/ClientComponent/OtherComponents/slider";
import CompleteMenu from "@/components/ClientComponent/OtherComponents/CompleteMenu";

const App = () => {
  return (
    <>
      <div className="mt-[28px] w-full md:w-[1180px] m-auto xs:w-[250px]">
        <Slider />
      </div>
      <div className="w-full md:w-[1180px] m-auto py-[28px]">
        <CompleteMenu />
      </div>
    </>
  );
};
export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));
