// RootLayout.tsx
"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/ClientComponent/Header";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Div from "@/components/UI/Div";
import FooterComponent from "@/components/ClientComponent/Footer";
import Loader from "@/components/UI/Loaders/MainLoader";
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for initial load (e.g., fetch data or wait for 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after initial load
    }, 1000); // Set the duration as needed (2 seconds here)

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  // If still loading, show the Loader component
  if (loading) {
    return <Loader />;
  }
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
  dynamic(() => Promise.resolve(ClientLayout), { ssr: false }),
);
