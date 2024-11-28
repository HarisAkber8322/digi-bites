// "use client"

// import React, { useState, useContext } from "react";
// import { observer } from "mobx-react";
// import Div from "../../UI/Div";
// import Text from "../../UI/Text";
// import Image from "next/image";
// import CommonButton from "../OtherComponents/CommonButton";
// import ThemeStoreContext from "@/store/ThemeStore";
// import PopupComponent from "../OtherComponents/PopUp";
// import { MenuList } from "@/utills/constants";

// interface MenuItem {
//   name: string;
//   image: string;
//   price: number;
//   description: string;
//   link: string;
//   addOns: { name: string; price: number }[]; // Add-ons for each menu item
//   funOptions: { name: string; price: number }[]; // Fun options for each menu item
// }

// const SetMenu = () => {
//   const themeStore = useContext(ThemeStoreContext);

//   const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
//     null,
//   );
//   const [quantity, setQuantity] = useState(1);
//   const [addOns, setAddOns] = useState<{
//     [key: string]: { selected: boolean; quantity: number; price: number };
//   }>({});
//   const [funOptions, setFunOptions] = useState<{
//     [key: string]: { selected: boolean; quantity: number; price: number };
//   }>({});

//   const handleCardClick = (menuItem: MenuItem) => {
//     setSelectedMenuItem(menuItem);
//     const initialAddOns: {
//       [key: string]: { selected: boolean; quantity: number; price: number };
//     } = {};
//     menuItem.addOns.forEach((addOn) => {
//       initialAddOns[addOn.name] = {
//         selected: false,
//         quantity: 1,
//         price: addOn.price,
//       };
//     });
//     setAddOns(initialAddOns);

//     const initialFunOptions: {
//       [key: string]: { selected: boolean; quantity: number; price: number };
//     } = {};
//     menuItem.funOptions.forEach((funOption) => {
//       initialFunOptions[funOption.name] = {
//         selected: false,
//         quantity: 1,
//         price: funOption.price,
//       };
//     });
//     setFunOptions(initialFunOptions);
//   };

//   const handleCloseModal = () => {
//     setSelectedMenuItem(null);
//     setQuantity(1);
//     setAddOns({});
//     setFunOptions({});
//   };

//   const handleAddOnChange = (name: string) => {
//     setAddOns((prevAddOns) => ({
//       ...prevAddOns,
//       [name]: { ...prevAddOns[name], selected: !prevAddOns[name].selected },
//     }));
//   };

//   const handleFunOptionChange = (name: string) => {
//     setFunOptions((prevFunOptions) => ({
//       ...prevFunOptions,
//       [name]: {
//         ...prevFunOptions[name],
//         selected: !prevFunOptions[name].selected,
//       },
//     }));
//   };

//   const handleQuantityChange = (
//     name: string,
//     value: number,
//     type: "addOn" | "funOption",
//   ) => {
//     if (type === "addOn") {
//       setAddOns((prevAddOns) => ({
//         ...prevAddOns,
//         [name]: { ...prevAddOns[name], quantity: value },
//       }));
//     } else {
//       setFunOptions((prevFunOptions) => ({
//         ...prevFunOptions,
//         [name]: { ...prevFunOptions[name], quantity: value },
//       }));
//     }
//   };

//   const calculateTotal = () => {
//     let total = selectedMenuItem ? selectedMenuItem.price : 0;
//     Object.values(addOns).forEach((addOn) => {
//       if (addOn.selected) {
//         total += addOn.price * addOn.quantity;
//       }
//     });
//     Object.values(funOptions).forEach((funOption) => {
//       if (funOption.selected) {
//         total += funOption.price * funOption.quantity;
//       }
//     });
//     return total * quantity;
//   };

//   return (
//     <>
//       <div className="mt-14 flex justify-center">
//         <Text themeDivClasses="text-3xl font-bold" content={"Set Menu"} />
//       </div>
//       <Div
//         themeDivClasses={"bg-pepperBlack"}
//         content={
//           <div className="grid grid-cols-4 mt-7 ml-20 mr-20 gap-4">
//             {MenuList.slice(0, 4).map((menuItem: MenuItem, index: number) => (
//               <div
//                 key={index}
//                 className="cursor-pointer"
//                 onClick={() => handleCardClick(menuItem)}
//               >
//                 <Div
//                   themeDivClasses={"overflow-hidden rounded-xl h-80 shadow-xl"}
//                   content={
//                     <>
//                       <div>
//                         <Image
//                           className="h-52 items-center"
//                           src={menuItem.image}
//                           width={300}
//                           height={300}
//                           alt={menuItem.name}
//                         />
//                       </div>
//                       <div className="flex flex-col items-center justify-center">
//                         <Text
//                           themeDivClasses="text-lg mt-2 font-semibold"
//                           content={menuItem.name}
//                         />
//                         <Text
//                           themeDivClasses="text-lg font-semibold"
//                           content={`$${menuItem.price}`}
//                         />
//                         <div className="flex w-full justify-center">
//                           <CommonButton />
//                         </div>
//                       </div>
//                     </>
//                   }
//                 />
//               </div>
//             ))}
//           </div>
//         }
//       />
//       {selectedMenuItem && (
//         <PopupComponent
//           selectedMenuItem={selectedMenuItem}
//           quantity={quantity}
//           addOns={addOns}
//           funOptions={funOptions}
//           handleCloseModal={handleCloseModal}
//           handleAddOnChange={handleAddOnChange}
//           handleFunOptionChange={handleFunOptionChange}
//           handleQuantityChange={handleQuantityChange}
//           setQuantity={setQuantity}
//           calculateTotal={calculateTotal}
//         />
//       )}
//     </>
//   );
// };

// export default observer(SetMenu);
