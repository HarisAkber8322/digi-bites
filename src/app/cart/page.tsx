"use client";
import React from "react";
import { observer } from "mobx-react";
import CartComponent from "../../components/ClientComponent/OtherComponents/Cart";
const CartPage = () => {
  return (
    <>
      <CartComponent />
    </>
  );
};

export default observer(CartPage);
