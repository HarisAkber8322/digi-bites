import React, { useState, useContext }  from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import ThemeStoreContext from "@/store/themeStore";
import classNames from "classnames";
import { observer } from "mobx-react";
interface AddOn {
  name: string;
  price: number;
}

interface FunOption {
  name: string;
  price: number;
}

interface MenuItem {
  name: string;
  image: string;
  price: number;
  description: string;
  link: string;
  addOns: AddOn[];
  funOptions: FunOption[];
}

    interface PopProps {
    selectedMenuItem: MenuItem | null;
    quantity: number;
    addOns: {
        [key: string]: { selected: boolean; quantity: number; price: number };
    };
    funOptions: {
        [key: string]: { selected: boolean; quantity: number; price: number };
    };
    handleCloseModal: () => void;
    handleAddOnChange: (name: string) => void;
    handleFunOptionChange: (name: string) => void;
    handleQuantityChange: (
        name: string,
        value: number,
        type: "addOn" | "funOption"
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
  if (!selectedMenuItem) return null;

  return (
    <Div
      themeDivClasses="fixed inset-0 z-[999999999] flex items-center justify-center bg-black bg-opacity-50"
      content={
        <Div
          themeDivClasses="p-6 relative w-[50%] mt-10 mb-10 h-[80%] overflow-y-auto shadow shadow-white "
          content={
            <>
              <button
                onClick={handleCloseModal}
                className="absolute font-bold text-lg top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <Text themeDivClasses=" " content={" X "} />
              </button>
              <div className="flex gap-4">
                <Image
                  className="rounded-md"
                  src={selectedMenuItem.image}
                  width={200}
                  height={200}
                  alt={selectedMenuItem.name}
                />
                <div className="flex flex-col">
                  <Text
                    themeDivClasses="text-xl font-semibold mb-4"
                    content={selectedMenuItem.name}
                  />
                  <Text
                    themeDivClasses="mt-2 font-semibold text-lg"
                    content={`$${selectedMenuItem.price}`}
                  />
                  <Text
                    themeDivClasses="mt-2"
                    content={selectedMenuItem.description}
                  />
                  <div className="mt-4 flex">
                    <Text themeDivClasses="block mr-2 " content={" Quantity"} />
                    <div className="flex justify-between">
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        // className={classNames(
                        //   "w-12 p-2 text-center bg-transparent",
                        //   themeStor.themeMode === "light"
                        //     ? "text-black"
                        //     : "text-white"
                        // )}
                      />
                      <div className="flex">
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-l"
                          onClick={() =>
                            setQuantity(quantity - 1 >= 1 ? quantity - 1 : 1)
                          }
                        >
                          <Text themeDivClasses=" " content={"-"} />
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-200 rounded-r"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Text themeDivClasses=" " content={"+"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Text
                  themeDivClasses="text-lg font-semibold mb-4"
                  content="Extras"
                />
                {selectedMenuItem.funOptions.map((funOption, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="checkbox"
                      checked={funOptions[funOption.name]?.selected || false}
                      onChange={() => handleFunOptionChange(funOption.name)}
                      name={funOption.name}
                      className="mr-2"
                    />
                    <Text
                      themeDivClasses=""
                      content={`${funOption.name} (+$${funOption.price})`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Text
                  themeDivClasses="text-lg font-semibold mb-2"
                  content="Add-Ons"
                />
                {selectedMenuItem.addOns.map((addOn, index) => (
                  <div key={index} className="mb-4">
                    <button
                      onClick={() => handleAddOnChange(addOn.name)}
                      className={`mr-2 px-3 py-1 rounded ${
                        addOns[addOn.name]?.selected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        themeDivClasses=""
                        content={`${addOn.name} (+$${addOn.price})`}
                      />
                    </button>
                    {addOns[addOn.name]?.selected && (
                      <div className="mt-2 flex items-center">
                        <Text themeDivClasses="mr-2" content={"Quantity"} />
                        <input
                          type="text"
                          value={addOns[addOn.name]?.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              addOn.name,
                              parseInt(e.target.value),
                              "addOn"
                            )
                          }
                          min={1}
                        //   className={classNames(
                        //     "w-12 p-2 text-center bg-transparent",
                        //     themeStore.themeMode === "light"
                        //       ? "text-black"
                        //       : "text-white"
                        //   )}
                        />
                        <div className="flex ml-2">
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-l"
                            onClick={() =>
                              handleQuantityChange(
                                addOn.name,
                                addOns[addOn.name]?.quantity - 1 >= 1
                                  ? addOns[addOn.name]?.quantity - 1
                                  : 1,
                                "addOn"
                              )
                            }
                          >
                            <Text themeDivClasses=" " content={"-"} />
                          </button>
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-r"
                            onClick={() =>
                              handleQuantityChange(
                                addOn.name,
                                addOns[addOn.name]?.quantity + 1,
                                "addOn"
                              )
                            }
                          >
                            <Text themeDivClasses=" " content={"+"} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Text
                themeDivClasses="mt-4 font-bold text-lg"
                content={`Total: $${calculateTotal().toFixed(2)}`}
              />
              <button
                onClick={handleCloseModal}
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
              >
                Add to Cart
              </button>
            </>
          }
        />
      }
    />
  );
};

export default Pop;
