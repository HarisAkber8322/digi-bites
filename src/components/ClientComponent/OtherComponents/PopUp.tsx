import React, { useState, useContext } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaClock } from "react-icons/fa";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface AddOn {
  selected: boolean;
  quantity: number;
  price: number;
}

interface FunOption {
  selected: boolean;
  quantity: number;
  price: number;
}

interface MenuItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
  addOns: { [key: string]: AddOn };
  funOptions: { [key: string]: FunOption };
}

interface PopProps {
  selectedMenuItem: MenuItem;
  quantity: number;
  addOns: { [key: string]: AddOn };
  funOptions: { [key: string]: FunOption };
  handleCloseModal: () => void;
  handleAddOnChange: (name: string) => void;
  handleFunOptionChange: (name: string) => void;
  handleQuantityChange: (
    name: string,
    value: number,
    type: "addOn" | "funOption",
  ) => void;
  setQuantity: (quantity: number) => void;
  calculateTotal: () => number;
}

const Pop: React.FC<PopProps> = ({
  selectedMenuItem,
  quantity,
  addOns,
  funOptions,
  handleCloseModal,
  handleAddOnChange,
  handleFunOptionChange,
  handleQuantityChange,
  setQuantity,
  calculateTotal,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      onClick={handleCloseModal}
    >
      <Div
        themeDivClasses=" p-6 rounded-lg shadow-lg max-w-lg w-full"
        content={
          <>
            <button
              className="  px-4 w-full flex justify-end"
              onClick={handleCloseModal}
            >
              <Text
                themeDivClasses=""
                content={
                  <>
                    <FontAwesomeIcon icon={faClose} />
                  </>
                }
              />
            </button>
            <div className="flex">
              <Image
                className="rounded-md"
                src={selectedMenuItem.image}
                width={80}
                height={60}
                alt={selectedMenuItem.name}
              />
              <div className="ml-3">
                <Text
                  themeDivClasses="text-lg font-semibold"
                  content={selectedMenuItem.name}
                />
                <Text
                  themeDivClasses="text-sm"
                  content={selectedMenuItem.description}
                />
              </div>
            </div>
            <div className="my-4">
              <Text
                themeDivClasses="font-bold text-xl mb-2"
                content="Quantity"
              />
              <div className="flex items-center">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-l"
                  onClick={() =>
                    setQuantity(quantity - 1 >= 1 ? quantity - 1 : 1)
                  }
                >
                  -
                </button>
                <Text themeDivClasses="mx-3" content={`${quantity}`} />
                <button
                  className="px-3 py-1 bg-gray-200 rounded-r"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="my-4">
              <Text
                themeDivClasses="font-bold text-xl mb-2"
                content="Add-Ons"
              />
              {addOns &&
                Object.keys(addOns).map((key) => (
                  <div key={key} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={addOns[key].selected}
                      onChange={() => handleAddOnChange(key)}
                    />
                    <Text themeDivClasses="ml-2" content={key} />
                    {addOns[key].selected && (
                      <div className="flex items-center ml-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-l"
                          onClick={() =>
                            handleQuantityChange(
                              key,
                              addOns[key].quantity - 1 >= 1
                                ? addOns[key].quantity - 1
                                : 1,
                              "addOn",
                            )
                          }
                        >
                          -
                        </button>
                        <Text
                          themeDivClasses="mx-2"
                          content={`${addOns[key].quantity}`}
                        />
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-r"
                          onClick={() =>
                            handleQuantityChange(
                              key,
                              addOns[key].quantity + 1,
                              "addOn",
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                    <Text
                      themeDivClasses="ml-auto"
                      content={`$${addOns[key].price}`}
                    />
                  </div>
                ))}
            </div>
            <div className="my-4">
              <Text
                themeDivClasses="font-bold text-xl mb-2"
                content="Fun Options"
              />
              {funOptions &&
                Object.keys(funOptions).map((key) => (
                  <div key={key} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={funOptions[key].selected}
                      onChange={() => handleFunOptionChange(key)}
                    />
                    <Text themeDivClasses="ml-2" content={key} />
                    {funOptions[key].selected && (
                      <div className="flex items-center ml-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-l"
                          onClick={() =>
                            handleQuantityChange(
                              key,
                              funOptions[key].quantity - 1 >= 1
                                ? funOptions[key].quantity - 1
                                : 1,
                              "funOption",
                            )
                          }
                        >
                          -
                        </button>
                        <Text
                          themeDivClasses="mx-2"
                          content={`${funOptions[key].quantity}`}
                        />
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-r"
                          onClick={() =>
                            handleQuantityChange(
                              key,
                              funOptions[key].quantity + 1,
                              "funOption",
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                    <Text
                      themeDivClasses="ml-auto"
                      content={`$${funOptions[key].price}`}
                    />
                  </div>
                ))}
            </div>
            <div className="my-4">
              <Text
                themeDivClasses="font-bold text-xl mb-2"
                content={`Total: $${calculateTotal().toFixed(2)}`}
              />
            </div>
          </>
        }
      />
    </div>
  );
};

export default Pop;
