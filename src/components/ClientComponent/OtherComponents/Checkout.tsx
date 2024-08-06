// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import Div from "../../UI/Div";
// import Text from "../../UI/Text";
// import Image from "next/image";
// import MainStoreContext from "@/store/Mainstore";
// import { observer } from "mobx-react";
// import { Button, ButtonGroup } from "react-bootstrap";
// const Checkout = () => {
//   return (
//     <>
//       <Div
//         themeDivClasses="w-full md:w-[1180px] m-auto mt-5"
//         darkColor="lightBlack"
//         lightColor="transparent"
//         content={
//           <>
//             <Text
//               themeDivClasses="font-bold text-2xl mt-4 mb-5"
//               content={"Checkout"}
//             />
//             <div className="flex gap-x-6 mt-5">
//               <div className="w-[60%]">
//                 <Div
//                   themeDivClasses="bg-white shadow-xl"
//                   content={
//                     <>

//                     </>
//                   }
//                 />
//               </div>
//               <div className="w-[40%]">
//                 <Div
//                   themeDivClasses=" shadow-xl rounded-lg  px-3  pb-6 pt-3"
//                   content={
//                     <>
//                       <Text
//                         themeDivClasses="items-center  mb-4 border-b-2 pb-3   border-ExtraLightGray  flex justify-center"
//                         content={
//                           <>
//                             <span className="font-bold flex items-center text-2xl">
//                               Cost Summary
//                             </span>
//                           </>
//                         }
//                       />
//                       <Text
//                         themeDivClasses="items-center p-1  flex justify-between"
//                         content={
//                           <>
//                             <span className="font-semibold text-base">
//                               Subtotal
//                             </span>{" "}
//                             <span className="text-base">200 rs</span>
//                           </>
//                         }
//                       />
//                       <Text
//                         themeDivClasses="items-center p-1  flex justify-between"
//                         content={
//                           <>
//                             <span className="font-semibold text-base">
//                               Delivery fee
//                             </span>{" "}
//                             <span className="text-base">150 rs</span>
//                           </>
//                         }
//                       />
//                       <Text
//                         themeDivClasses="items-center p-1 pt-4 border-t-2 mt-5  border-ExtraLightGray  flex justify-between"
//                         content={
//                           <>
//                             <span className="font-semibold text-lg">
//                               Total:
//                             </span>{" "}
//                             <span className="text-lg font-semibold">
//                               $00,00
//                             </span>
//                           </>
//                         }
//                       />
//                       <div className="flex justify-center pr-4 pl-4">
//                         <Button
//                           href="#"
//                           className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex  mt-4 align-middle justify-center rounded-md"
//                         >
//                           Place Order
//                         </Button>
//                       </div>
//                     </>
//                   }
//                 />
//               </div>
//             </div>
//           </>
//         }
//       />
//     </>
//   );
// };
// export default observer(Checkout);

"use client";
import React, { useState, useEffect, useContext } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const [deliveryType, setDeliveryType] = useState("home");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const [deliveryNote, setDeliveryNote] = useState("");

  const handleDeliveryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryType(e.target.value);
  };


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
            <div className="flex gap-x-6 mt-5 pb-5">
              <div className="w-[60%]">
                <div>
                  <Div
                    themeDivClasses="mb-6 p-6 rounded-lg shadow-md"
                    content={
                      <>
                        {deliveryType === "home" && (
                          <div className="mb-6 w-full transition duration-200 ease-in-out">
                            <div className="flex items-center justify-between  ">
                              <Text
                                themeDivClasses="font-semibold text-lg mb-2"
                                content={"Deliver to"}
                              />
                              <span className="text-themeYellow  font-bold ">
                                Change
                              </span>
                            </div>
                            <div className="flex justify-center">
                              <span className="text-red-500  gap-1 flex items-center">
                                <FontAwesomeIcon icon={faCircleInfo} />
                                No contact info added
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <Text
                            themeDivClasses="font-semibold text-lg"
                            content={"Delivery Type"}
                          />
                          <div className="flex gap-x-5 mt-2 w-full justify-between">
                            <label
                              className={`flex w-full border p-2 ease-in-out hover:cursor-pointer rounded-md duration-150 transition hover:bg-red-100 hover:border-red-400  ${
                                deliveryType === "home"
                                  ? "bg-red-100 border-red-400"
                                  : "border-ExtraLightGray"
                              }`}
                            >
                              <input
                                type="radio"
                                value="home"
                                checked={deliveryType === "home"}
                                onChange={handleDeliveryTypeChange}
                                className="mr-2 "
                              />
                              Home Delivery
                              <span className="flex justify-end w-[60%]">
                                $30.00
                              </span>
                            </label>
                            <label
                              className={`flex w-full border p-2 ease-in-out hover:cursor-pointer rounded-md duration-150 transition hover:bg-red-100 hover:border-red-400  ${
                                deliveryType === "takeaway"
                                  ? "bg-red-100 border-red-400 "
                                  : "border-ExtraLightGray"
                              }`}
                            >
                              <input
                                type="radio"
                                value="takeaway"
                                checked={deliveryType === "takeaway"}
                                onChange={handleDeliveryTypeChange}
                                className="mr-2"
                              />
                              Take Away
                              <span className="flex justify-end w-[68%]">
                                Free
                              </span>
                            </label>
                          </div>
                        </div>
                      </>
                    }
                  />
                  <Div
                    themeDivClasses="mb-6 p-6 rounded-lg shadow-md"
                    content={
                      <>
                           <div className="flex justify-between border-b-2 border-ExtraLightGray pb-2 mb-4 ">
                              <Text
                                themeDivClasses="font-semibold text-lg mb-2"
                                content={"Payment Method"}
                              />
                              <span className="text-themeYellow  font-bold ">
                                Change
                              </span>
                            </div>
                            <div className="flex ">
                              <span className="text-red-500  gap-1 flex items-center">
                                <FontAwesomeIcon icon={faCirclePlus} />
                                Add Payment Method
                              </span>
                            </div>
                      </>
                    }
                  />
                  <Div
                    themeDivClasses="mb-6 p-6 rounded-lg shadow-md"
                    content={
                      <>
                        <div className="mb-2">
                          <Text
                            themeDivClasses="font-semibold text-lg mb-2"
                            content={"Delivery Note"}
                          />
                          <textarea
                            placeholder="Add delivery note"
                            value={deliveryNote}
                            rows={10}
                            onChange={(e) => setDeliveryNote(e.target.value)}
                            className="w-full text-md  p-2 border-2 border-ExtraLightGray rounded mt-3 focus-visible:border-ExtraLightGray "
                          />
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
              <div className="w-[40%]">
                <Div
                  themeDivClasses="shadow-xl rounded-lg px-3 pb-6 pt-3"
                  content={
                    <>
                      <Text
                        themeDivClasses="items-center mb-4 border-b-2 pb-3 border-ExtraLightGray flex justify-center"
                        content={
                          <>
                            <span className="font-bold flex items-center text-2xl">
                              Cost Summary
                            </span>
                          </>
                        }
                      />
                      <Text
                        themeDivClasses="items-center p-1 flex justify-between"
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
                        themeDivClasses="items-center p-1 flex justify-between"
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
                        themeDivClasses="items-center p-1 pt-4 border-t-2 mt-5 border-ExtraLightGray flex justify-between"
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
                          className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex mt-4 align-middle justify-center rounded-md"
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
