"use client";
import React from "react";
import { observer } from "mobx-react";
import CheckoutComponent from "../../components/ClientComponent/OtherComponents/Checkout";
const CheckoutPage = () => {
  return (
    <>
      <CheckoutComponent />
    </>
  );
};

export default observer(CheckoutPage);
