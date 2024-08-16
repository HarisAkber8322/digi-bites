"use client";
import React, { useState, useEffect, useContext } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { Button } from "react-bootstrap";

interface AddOn {
  name: string;
  price: number;
  value: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface UserInfo {
  userId: string;
  orderNote: string;
}

interface CartSchema {
  products: CartItem[];
  addOns: AddOn[];
  totalAmount: number;
  userInfo: UserInfo;
  createdAt: string;
  updatedAt: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const MainStore = useContext(MainStoreContext);

  useEffect(() => {
    try {
      const itemsString = localStorage.getItem("cartItems");
      
      if (itemsString) {
        const items: CartSchema = JSON.parse(itemsString);

        setCartItems(items.products || []);
        setSelectedAddOns(items.addOns || []);
        setUserInfo(items.userInfo || null);
        setTotalAmount(items.totalAmount || 0);
      } else {
        console.error("No cart items found in local storage.");
      }
    } catch (error) {
      console.error("Error parsing cart items from local storage:", error);
    }
  }, []);

  const removeFromCart = (productId: string) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    
    MainStore.setCartCount(MainStore.cartCount - 1);
    
    const updatedTotalAmount = updatedCartItems.reduce((total, item) => {
      // You might need to recalculate the total amount based on new cart items
      return total; // Placeholder, recalculate as needed
    }, 0);
    
    localStorage.setItem(
      "cartItems",
      JSON.stringify({
        products: updatedCartItems,
        addOns: selectedAddOns,
        totalAmount: updatedTotalAmount,
        userInfo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    );
    
    setCartItems(updatedCartItems);
    setTotalAmount(updatedTotalAmount);
  };

  const calculateTotal = () => {
    let total = totalAmount;

    if (selectedAddOns) {
      selectedAddOns.forEach((addOn) => {
        if (addOn.value) {
          total += addOn.price;
        }
      });
    }

    return total;
  };

  return (
    <>
      <Div
        themeDivClasses="w-full md:w-[1180px] m-auto mt-5 pb-10"
        darkColor="lightBlack"
        lightColor="transparent"
        content={
          <>
            <Text themeDivClasses="font-bold text-2xl mt-4 mb-5" content={"Cart"} />
            {cartItems.length === 0 ? (
              <Text themeDivClasses="text-lg" content="Your cart is empty." />
            ) : (
              <div className="flex gap-x-6 mt-5">
                <div className="gap-4 flex flex-col w-[60%]">
                  {cartItems.map((item, index) => (
                    <Div
                      key={index}
                      themeDivClasses="flex shadow-xl rounded-lg items-center justify-between p-4 h-[100px]"
                      darkColor="bg-black"
                      content={
                        <>
                          <div
                            className="flex cursor-pointer w-full "
                            // Optionally add functionality for viewing details
                          >
                            <Image
                              className="rounded-md"
                              src="/path-to-image" // Use actual image path
                              width={80}
                              height={60}
                              alt="Product Image"
                            />
                            <div className="ml-3">
                              <Text
                                themeDivClasses="text-lg font-semibold"
                                content={`Product ${item.productId}`}
                              />
                              <div className="flex justify-between">
                                <Text
                                  themeDivClasses="text-xs pt-2"
                                  content={`Quantity: ${item.quantity}`}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            className="text-red-500"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            Remove
                          </button>
                        </>
                      }
                    />
                  ))}
                </div>
                <div className="w-[40%]">
                  <Div themeDivClasses=" shadow-xl rounded-lg  px-3  pb-6 pt-3" content={<>
                    <Text
                      themeDivClasses="items-center  mb-4 border-b-2 pb-3   border-ExtraLightGray  flex justify-center"
                      content={
                        <>
                          <span className="font-bold flex items-center text-2xl">Total Cost</span>
                        </>
                      }
                    />
                    <Text
                      themeDivClasses="items-center p-1  flex justify-between"
                      content={
                        <>
                          <span className="font-semibold text-base">Item Price</span>{" "}
                          <span className="text-base">{totalAmount} rs</span>
                        </>
                      }
                    />
                    <Text
                      themeDivClasses="items-center p-1  flex justify-between"
                      content={
                        <>
                          <span className="font-semibold text-base">Addons</span>{" "}
                          <span className="text-base">
                            {selectedAddOns.filter(addOn => addOn.value).reduce((sum, addOn) => sum + addOn.price, 0)} rs
                          </span>
                        </>
                      }
                    />
                    <Text
                      themeDivClasses="items-center p-1 pt-4 border-t-2 mt-5  border-ExtraLightGray  flex justify-between"
                      content={
                        <>
                          <span className="font-semibold text-lg">Total:</span>{" "}
                          <span className="text-lg font-semibold">{calculateTotal().toFixed(2)} rs</span>
                        </>
                      }
                    />
                    <div className="flex justify-center pr-4 pl-4">
                      <Button href="/checkout" className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex  mt-4 align-middle justify-center rounded-md">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>} />
                </div>
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default observer(Cart);
