// RootLayout.tsx
"use client";
import React from "react";
import HeaderComponent from "@/components/ClientComponent/Header";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Div from "@/components/UI/Div";
import FooterComponent from "@/components/ClientComponent/Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Div
      content={
        <>
          <HeaderComponent />
          <Div
            darkColor="bg-lightBlack"
            lightColor="bg-bgGrey"
            themeDivClasses={classNames(["w-full pt-[64px] min-h-[100vh]"])}
            content={children}
          />
          <FooterComponent />
        </>
      }
      themeDivClasses={classNames([" w-full "])}
    />
  );
};

export default observer(
  dynamic(() => Promise.resolve(ClientLayout), { ssr: false })
);
