"use client";
import React from "react";
import "../styles/global.css";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import Text from "@/components/UI/Text";
import classNames from "classnames";
import Slider from "../components/ClientComponent/OtherComponents/slider";
import SetMenuComponent from "../components/ClientComponent/OtherComponents/SetMenu";
const App = ({ Component, pageProps }: any) => {
  return (
    <>
    <div className="mt-5 w-full md:w-[1180px] m-auto">
      <Slider />
    </div>
    <div>
      <SetMenuComponent/>
    </div>
    </>
  );
};
// export default observer(App);
export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));
