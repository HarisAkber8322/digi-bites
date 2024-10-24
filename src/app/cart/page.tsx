"use client";
import React from "react";
import { observer } from "mobx-react";
import CartComponent from "../../components/ClientComponent/OtherComponents/Cart";
import MainLoaderComponent from "../../components/UI/Loaders/MainLoader";
const CartPage = () => {
  return (
    <>
      <CartComponent />

      <MainLoaderComponent />
    </>
  );
};

export default observer(CartPage);
