// "use client";
// import React, { useState, useEffect } from "react";
// import Div from "../../../components/UI/Div";
// import Text from "../../../components/UI/Text";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
//     setCartItems(items);
//   }, []);

//   const removeFromCart = (itemToRemove: any) => {
//     const updatedCartItems = cartItems.filter((item) => item.name !== itemToRemove.name);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     setCartItems(updatedCartItems);
//   };

//   return (
//     <>
//       <Div
//         themeDivClasses="p-5"
//         content={
//           <>
//             <h1 className="font-bold text-2xl mb-5">Shopping Cart</h1>
//             {cartItems.length === 0 ? (
//               <Text themeDivClasses="text-lg" content="Your cart is empty." />
//             ) : (
//               <div className="grid grid-cols-1 gap-4">
//                 {cartItems.map((item, index) => (
//                   <Div
//                     key={index}
//                     themeDivClasses="flex items-center justify-between p-4 border-b"
//                     content={
//                       <>
//                         <Text themeDivClasses="text-lg font-semibold" content={item.name} />
//                         <Text themeDivClasses="text-lg font-semibold" content={`$${item.price}`} />
//                         <Text themeDivClasses="text-lg font-semibold" content={`Qty: ${item.quantity}`} />
//                         <button
//                           className="text-red-500"
//                           onClick={() => removeFromCart(item)}
//                         >
//                           Remove
//                         </button>
//                       </>
//                     }
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         }
//       />
//     </>
//   );
// };

// export default Cart;

"use client";
import React, { useState, useEffect } from "react";
import Div from "../../../components/UI/Div";
import Text from "../../../components/UI/Text";
import Image from "next/image";

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  addOns: {
    [key: string]: { selected: boolean; quantity: number; price: number };
  };
  funOptions: {
    [key: string]: { selected: boolean; quantity: number; price: number };
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const removeFromCart = (itemToRemove: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.name !== itemToRemove.name
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;
      if (item.addOns) {
        Object.values(item.addOns).forEach((addOn) => {
          if (addOn.selected) {
            itemTotal += addOn.price * addOn.quantity;
          }
        });
      }
      if (item.funOptions) {
        Object.values(item.funOptions).forEach((funOption) => {
          if (funOption.selected) {
            itemTotal += funOption.price * funOption.quantity;
          }
        });
      }
      return total + itemTotal;
    }, 0);
  };

  return (
    <>
      <Div
        themeDivClasses=" w-full md:w-[1180px] m-auto "
        darkColor="pepperBlack"
        content={
          <>
            <h1 className="font-bold text-2xl mb-5"> Cart</h1>
            {cartItems.length === 0 ? (
              <Text themeDivClasses="text-lg" content="Your cart is empty." />
            ) : (
              <div className="grid grid-cols-2 gap-x-6">
                <div className="grid grid-cols-1 gap-4">
                  {cartItems.map((item, index) => (
                    <Div
                      key={index}
                      themeDivClasses="flex  shadow-xl rounded-lg items-center justify-between p-4 "
                      darkColor="bg-pepperblack2"
                      content={
                        <>
                          <div className="flex ">
                            <Image
                              className="rounded-md"
                              src={item.image}
                              width={80}
                              height={60}
                              alt={item.name}
                            />
                            <div className="ml-3">
                              <Text
                                themeDivClasses="text-lg font-semibold"
                                content={item.name}
                              />
                              <div className="flex justify-between">
                                <Text
                                  themeDivClasses="text-xs pt-2"
                                  content={`$${item.price}`}
                                />
                              
                              </div>
                            </div>
                          </div>
                          <div className="flex align-middle gap-x-8" >
                          <Div themeDivClasses="flex"
                          darkColor="bg-pepperBlack" content={<>
                            <button
                                    className="px-3 py-1 bg-gray-200 rounded-l"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item,
                                        item.quantity - 1 >= 1
                                          ? item.quantity - 1
                                          : 1
                                      )
                                    }
                                  >
                                    <Text themeDivClasses=" " content={"-"} />
                                  </button>
                                  <Text
                                    themeDivClasses="text-lg font-semibold"
                                    content={` ${item.quantity}`}
                                  />
                                  <button
                                    className="px-3 py-1 bg-gray-200 rounded-r"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <Text themeDivClasses=" " content={"+"} />
                                  </button></>}
                                 
                                />
                            <button
                              className="text-red-500"
                              onClick={() => removeFromCart(item)}
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      }
                    />
                  ))}
                </div>
                <div>
                  {" "}
                  <Text
                    themeDivClasses="text-lg font-bold mt-4"
                    content={`Total: $${calculateTotal().toFixed(2)}`}
                  />
                </div>
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default Cart;
