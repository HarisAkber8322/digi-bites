// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import Div from "../../UI/Div";
// import Text from "../../UI/Text";
// import Image from "next/image";
// import MainStoreContext from "@/store/Mainstore";
// import { observer } from "mobx-react";

// interface CartItem {
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   addOns: {
//     [key: string]: { selected: boolean; quantity: number; price: number };
//   };
//   funOptions: {
//     [key: string]: { selected: boolean; quantity: number; price: number };
//   };
// }

// const Cart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const MainStore = useContext(MainStoreContext);
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
//     setCartItems(items);
//   }, []);

//   const removeFromCart = (itemToRemove: CartItem) => {
//     const updatedCartItems = cartItems.filter(
//       (item) => item.name !== itemToRemove.name
//     );
//     MainStore.setCartCount(MainStore.cartCount - 1);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     setCartItems(updatedCartItems);
//   };

//   const handleQuantityChange = (item: CartItem, newQuantity: number) => {
//     const updatedCartItems = cartItems.map((cartItem) =>
//       cartItem.name === item.name
//         ? { ...cartItem, quantity: newQuantity }
//         : cartItem
//     );

//     // Calculate the change in quantity
//     const quantityChange = newQuantity - item.quantity;

//     // Update the MainStore.cartCount
//     MainStore.setCartCount(MainStore.cartCount + quantityChange);

//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     setCartItems(updatedCartItems);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       let itemTotal = item.price * item.quantity;
//       if (item.addOns) {
//         Object.values(item.addOns).forEach((addOn) => {
//           if (addOn.selected) {
//             itemTotal += addOn.price * addOn.quantity;
//           }
//         });
//       }
//       if (item.funOptions) {
//         Object.values(item.funOptions).forEach((funOption) => {
//           if (funOption.selected) {
//             itemTotal += funOption.price * funOption.quantity;
//           }
//         });
//       }
//       return total + itemTotal;
//     }, 0);
//   };

//   return (
//     <>
//       <Div
//         themeDivClasses=" w-full md:w-[1180px] m-auto "
//         darkColor="lightBlack"
//         lightColor="transparent"
//         content={
//           <>
//             <Text themeDivClasses="font-bold text-2xl mb-5" content={"Cart"} />
//             {cartItems.length === 0 ? (
//               <Text themeDivClasses="text-lg" content="Your cart is empty." />
//             ) : (
//               <div className="grid grid-cols-2 gap-x-6">
//                 <div className="grid grid-cols-1 gap-4">
//                   {cartItems.map((item, index) => (
//                     <Div
//                       key={index}
//                       themeDivClasses="flex  shadow-xl rounded-lg items-center justify-between p-4 "
//                       darkColor="bg-black"
//                       content={
//                         <>
//                           <div className="flex ">
//                             <Image
//                               className="rounded-md"
//                               src={item.image}
//                               width={80}
//                               height={60}
//                               alt={item.name}
//                             />
//                             <div className="ml-3">
//                               <Text
//                                 themeDivClasses="text-lg font-semibold"
//                                 content={item.name}
//                               />
//                               <div className="flex justify-between">
//                                 <Text
//                                   themeDivClasses="text-xs pt-2"
//                                   content={`$${item.price}`}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex align-middle gap-x-8">
//                             <div className="flex">
//                               <button
//                                 className="px-3 py-1 bg-gray-200 rounded-l"
//                                 onClick={() =>
//                                   handleQuantityChange(
//                                     item,
//                                     item.quantity - 1 >= 1
//                                       ? item.quantity - 1
//                                       : 1
//                                   )
//                                 }
//                               >
//                                 <Text themeDivClasses=" " content={"-"} />
//                               </button>
//                               <Text
//                                 themeDivClasses="text-lg font-semibold"
//                                 content={` ${item.quantity}`}
//                               />
//                               <button
//                                 className="px-3 py-1 bg-gray-200 rounded-r"
//                                 onClick={() =>
//                                   handleQuantityChange(item, item.quantity + 1)
//                                 }
//                               >
//                                 <Text themeDivClasses=" " content={"+"} />
//                               </button>
//                             </div>
//                             <button
//                               className="text-red-500"
//                               onClick={() => removeFromCart(item)}
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </>
//                       }
//                     />
//                   ))}
//                 </div>
//                 <div>
//                   {" "}
//                   <Text
//                     themeDivClasses="text-lg font-bold mt-4"
//                     content={`Total: $${calculateTotal().toFixed(2)}`}
//                   />
//                 </div>
//               </div>
//             )}
//           </>
//         }
//       />
//     </>
//   );
// };

// export default observer(Cart);

import React, { useState, useEffect, useContext } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import Pop from "../OtherComponents/PopUp";

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

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  addOns: { [key: string]: AddOn };
  funOptions: { [key: string]: FunOption };
}

interface MenuItem extends CartItem {
  description: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<{
    [key: string]: AddOn;
  }>({});
  const [selectedFunOptions, setSelectedFunOptions] = useState<{
    [key: string]: FunOption;
  }>({});

  const MainStore = useContext(MainStoreContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const removeFromCart = (itemToRemove: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.name !== itemToRemove.name
    );
    MainStore.setCartCount(MainStore.cartCount - 1);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    const quantityChange = newQuantity - item.quantity;
    MainStore.setCartCount(MainStore.cartCount + quantityChange);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;

      // Check if addOns exists and is an object
      if (item.addOns && typeof item.addOns === "object") {
        Object.values(item.addOns).forEach((addOn) => {
          if (addOn.selected) {
            itemTotal += addOn.price * addOn.quantity;
          }
        });
      }

      // Check if funOptions exists and is an object
      if (item.funOptions && typeof item.funOptions === "object") {
        Object.values(item.funOptions).forEach((funOption) => {
          if (funOption.selected) {
            itemTotal += funOption.price * funOption.quantity;
          }
        });
      }

      return total + itemTotal;
    }, 0);
  };

  const handleItemClick = (item: CartItem) => {
    const selectedItem: MenuItem = {
      ...item,
      description: "A detailed description for the selected item.",
    };
    setSelectedMenuItem(selectedItem);
    setSelectedQuantity(item.quantity);
    setSelectedAddOns(item.addOns);
    setSelectedFunOptions(item.funOptions);
    setIsPopupOpen(true);
  };

  const handleAddOnChange = (name: string) => {
    setSelectedAddOns((prevAddOns) => ({
      ...prevAddOns,
      [name]: {
        ...prevAddOns[name],
        selected: !prevAddOns[name].selected,
      },
    }));
  };

  const handleFunOptionChange = (name: string) => {
    setSelectedFunOptions((prevFunOptions) => ({
      ...prevFunOptions,
      [name]: {
        ...prevFunOptions[name],
        selected: !prevFunOptions[name].selected,
      },
    }));
  };

  const handleAddOnQuantityChange = (name: string, value: number) => {
    setSelectedAddOns((prevAddOns) => ({
      ...prevAddOns,
      [name]: {
        ...prevAddOns[name],
        quantity: value,
      },
    }));
  };

  const handleFunOptionQuantityChange = (name: string, value: number) => {
    setSelectedFunOptions((prevFunOptions) => ({
      ...prevFunOptions,
      [name]: {
        ...prevFunOptions[name],
        quantity: value,
      },
    }));
  };

  const handlePopupQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const handleCloseModal = () => {
    setIsPopupOpen(false);
  };

  const calculatePopupTotal = () => {
    if (!selectedMenuItem) return 0;

    let total = selectedMenuItem.price * selectedQuantity;

    if (selectedAddOns) {
      Object.values(selectedAddOns).forEach((addOn: any) => {
        if (addOn.selected) {
          total += addOn.price * addOn.quantity;
        }
      });
    }

    if (selectedFunOptions) {
      Object.values(selectedFunOptions).forEach((funOption: any) => {
        if (funOption.selected) {
          total += funOption.price * funOption.quantity;
        }
      });
    }

    return total;
  };

  return (
    <>
      <Div
        themeDivClasses="w-full md:w-[1180px] m-auto mt-5"
        darkColor="lightBlack"
        lightColor="transparent"
        content={
          <>
            <Text themeDivClasses="font-bold text-2xl mt-4 mb-5" content={"Cart"} />
            {cartItems.length === 0 ? (
              <Text themeDivClasses="text-lg" content="Your cart is empty." />
            ) : (
              <div className="grid grid-cols-2 gap-x-6 mt-5">
                <div className="grid grid-cols-1 gap-4">
                  {cartItems.map((item, index) => (
                    <Div
                      key={index}
                      themeDivClasses="flex shadow-xl rounded-lg items-center justify-between p-4"
                      darkColor="bg-black"
                      content={
                        <>
                          <div
                            className="flex cursor-pointer w-full"
                            onClick={() => handleItemClick(item)}
                          >
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
                          <div className="flex align-middle gap-x-8">
                            <div className="flex">
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
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                              >
                                <Text themeDivClasses=" " content={"+"} />
                              </button>
                            </div>
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
                  <Text
                    themeDivClasses="flex shadow-xl rounded-lg items-center justify-between p-4 bg-white"
                    content={
                      <>
                        <span>item price</span>{" "}
                        <span>${calculateTotal().toFixed(2)}</span>
                      </>
                    }
                  />
                </div>
              </div>
            )}
          </>
        }
      />

      {isPopupOpen && selectedMenuItem && (
        <Pop
          selectedMenuItem={selectedMenuItem}
          quantity={selectedQuantity}
          addOns={selectedAddOns}
          funOptions={selectedFunOptions}
          handleCloseModal={handleCloseModal}
          handleAddOnChange={handleAddOnChange}
          handleFunOptionChange={handleFunOptionChange}
          handleQuantityChange={(name, value, type) => {
            if (type === "addOn") {
              handleAddOnQuantityChange(name, value);
            } else {
              handleFunOptionQuantityChange(name, value);
            }
          }}
          setQuantity={handlePopupQuantityChange}
          calculateTotal={calculatePopupTotal}
        />
      )}
    </>
  );
};

export default observer(Cart);
