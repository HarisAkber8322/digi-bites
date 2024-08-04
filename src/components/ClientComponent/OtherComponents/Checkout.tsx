"use client";
import React, { useState, useEffect, useContext } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { Button, ButtonGroup } from "react-bootstrap";
const Checkout = () => {
  return (
    <>
      <Div
        themeDivClasses="w-full md:w-[1180px] m-auto mt-5"
        darkColor="lightBlack"
        lightColor="transparent"
        content={
          <>
            <Text
              themeDivClasses="font-bold text-2xl mt-4 mb-5"
              content={"Checkout"}
            />
            <div className="flex gap-x-6 mt-5">
              <div className="w-[60%]">
                <Div
                  themeDivClasses="bg-white shadow-xl rounded-lg"
                  content={
                    <>
                      <div className=""></div>
                    </>
                  }
                />
              </div>
              <div className="w-[40%]">
                <Div
                  themeDivClasses=" shadow-xl rounded-lg  px-3  pb-6 pt-3"
                  content={
                    <>
                      <Text
                        themeDivClasses="items-center  mb-4 border-b-2 pb-3   border-ExtraLightGray  flex justify-center"
                        content={
                          <>
                            <span className="font-bold flex items-center text-2xl">
                              Cost Summary
                            </span>
                          </>
                        }
                      />
                      <Text
                        themeDivClasses="items-center p-1  flex justify-between"
                        content={
                          <>
                            <span className="font-semibold text-base">
                              Subtotal
                            </span>{" "}
                            <span className="text-base">200 rs</span>
                          </>
                        }
                      />
                      <Text
                        themeDivClasses="items-center p-1  flex justify-between"
                        content={
                          <>
                            <span className="font-semibold text-base">
                              Delivery fee
                            </span>{" "}
                            <span className="text-base">150 rs</span>
                          </>
                        }
                      />
                      <Text
                        themeDivClasses="items-center p-1 pt-4 border-t-2 mt-5  border-ExtraLightGray  flex justify-between"
                        content={
                          <>
                            <span className="font-semibold text-lg">
                              Total:
                            </span>{" "}
                            <span className="text-lg font-semibold">
                              $00,00
                            </span>
                          </>
                        }
                      />
                      <div className="flex justify-center pr-4 pl-4">
                        <Button
                          href="#"
                          className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex  mt-4 align-middle justify-center rounded-md"
                        >
                          Place Order
                        </Button>
                      </div>
                    </>
                  }
                />
              </div>
            </div>
          </>
        }
      />
    </>
  );
};
export default observer(Checkout);
