"use client";
import React from "react";
import "../styles/global.css";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import Text from "@/components/UI/Text";
import classNames from "classnames";
const App = ({ Component, pageProps }: any) => {

  return (
    <>
      <Text
        content={"Home"}
        themeDivClasses={classNames(["text-2xl"])}
      />
    </>
  );
};
// export default observer(App);
export default observer(dynamic(() => Promise.resolve(App), { ssr: false }))
