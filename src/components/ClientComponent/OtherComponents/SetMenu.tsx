// import React, { useState, useContext } from "react";
// import { observer } from "mobx-react";
// import Div from "../../UI/Div";
// import Text from "../../UI/Text";
// import Image from "next/image";
// import CommonButton from "../OtherComponents/CommonButton";
// import { MenuList } from "@/utills/constants";
// import classNames from "classnames";
// import ThemeStoreContext from "@/store/ThemeStore";
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
//     null
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
//     type: "addOn" | "funOption"
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
//         <Div
//           themeDivClasses="fixed inset-0 z-[999999999] flex items-center justify-center bg-black bg-opacity-50"
//           content={
//             <Div
//               themeDivClasses="p-6 relative w-[50%] mt-10 mb-10 h-[80%] overflow-y-auto shadow shadow-white "
//               content={
//                 <>
//                   <button
//                     onClick={handleCloseModal}
//                     className="absolute font-bold text-lg top-4 right-4 text-gray-500 hover:text-gray-800"
//                   >
//                     <Text themeDivClasses=" " content={" X "} />
//                   </button>
//                   <div className="flex gap-4">
//                     <Image
//                       className="rounded-md"
//                       src={selectedMenuItem.image}
//                       width={200}
//                       height={200}
//                       alt={selectedMenuItem.name}
//                     />
//                     <div className="flex flex-col">
//                       <Text
//                         themeDivClasses="text-xl font-semibold mb-4"
//                         content={selectedMenuItem.name}
//                       />
//                       <Text
//                         themeDivClasses="mt-2 font-semibold text-lg"
//                         content={`$${selectedMenuItem.price}`}
//                       />
//                       <Text
//                         themeDivClasses="mt-2"
//                         content={selectedMenuItem.description}
//                       />
//                       <div className="mt-4 flex">
//                         <Text
//                           themeDivClasses="block mr-2 "
//                           content={" Quantity"}
//                         />
//                         <div className="flex justify-between">
//                           <input
//                             type="text"
//                             value={quantity}
//                             readOnly
//                             className={classNames(
//                               "w-12 p-2 text-center bg-transparent",
//                               themeStore.themeMode === "light"
//                                 ? "text-black"
//                                 : "text-white"
//                             )}
//                           />
//                           <div className="flex">
//                             <button
//                               className="px-3 py-1 bg-gray-200 rounded-l"
//                               onClick={() =>
//                                 setQuantity(
//                                   quantity - 1 >= 1 ? quantity - 1 : 1
//                                 )
//                               }
//                             >
//                               <Text themeDivClasses=" " content={"-"} />
//                             </button>
//                             <button
//                               className="px-3 py-1 bg-gray-200 rounded-r"
//                               onClick={() => setQuantity(quantity + 1)}
//                             >
//                               <Text themeDivClasses=" " content={"+"} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <Text
//                       themeDivClasses="text-lg font-semibold mb-4"
//                       content="Extras"
//                     />
//                     {selectedMenuItem.funOptions.map((funOption, index) => (
//                       <div key={index} className="mb-4">
//                         <input
//                           type="checkbox"
//                           checked={
//                             funOptions[funOption.name]?.selected || false
//                           }
//                           onChange={(e) => handleFunOptionChange(e.target.name)}
//                           name={funOption.name}
//                           className="mr-2"
//                         />
//                         <Text
//                           themeDivClasses=""
//                           content={`${funOption.name} (+$${funOption.price})`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-4">
//                     <Text
//                       themeDivClasses="text-lg font-semibold mb-2"
//                       content="Add-Ons"
//                     />
//                     {selectedMenuItem.addOns.map((addOn, index) => (
//                       <div key={index} className="mb-4">
//                         <button
//                           onClick={() => handleAddOnChange(addOn.name)}
//                           className={`mr-2 px-3 py-1 rounded ${addOns[addOn.name]?.selected ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                         >
//                           <Text
//                             themeDivClasses=""
//                             content={`${addOn.name} (+$${addOn.price})`}
//                           />
//                         </button>
//                         {addOns[addOn.name]?.selected && (
//                           <div className="mt-2 flex items-center">
//                             <Text themeDivClasses="mr-2" content={"Quantity"} />
//                             <input
//                               type="text"
//                               value={addOns[addOn.name]?.quantity || 1}
//                               onChange={(e) =>
//                                 handleQuantityChange(
//                                   addOn.name,
//                                   parseInt(e.target.value),
//                                   "addOn"
//                                 )
//                               }
//                               min={1}
//                               className={classNames(
//                                 "w-12 p-2 text-center bg-transparent",
//                                 themeStore.themeMode === "light"
//                                   ? "text-black"
//                                   : "text-white"
//                               )}
//                             />
//                             <div className="flex ml-2">
//                               <button
//                                 className="px-3 py-1 bg-gray-200 rounded-l"
//                                 onClick={() =>
//                                   handleQuantityChange(
//                                     addOn.name,
//                                     addOns[addOn.name]?.quantity - 1 >= 1
//                                       ? addOns[addOn.name]?.quantity - 1
//                                       : 1,
//                                     "addOn"
//                                   )
//                                 }
//                               >
//                                 <Text themeDivClasses=" " content={"-"} />
//                               </button>
//                               <button
//                                 className="px-3 py-1 bg-gray-200 rounded-r"
//                                 onClick={() =>
//                                   handleQuantityChange(
//                                     addOn.name,
//                                     addOns[addOn.name]?.quantity + 1,
//                                     "addOn"
//                                   )
//                                 }
//                               >
//                                 <Text themeDivClasses=" " content={"+"} />
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <Text
//                     themeDivClasses="mt-4 font-bold text-lg"
//                     content={`Total: $${calculateTotal().toFixed(2)}`}
//                   />
//                   <button
//                     onClick={handleCloseModal}
//                     className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
//                   >
//                     Add to Cart
//                   </button>
//                 </>
//               }
//             />
//           }
//         />
//       )}
//     </>
//   );
// };
// export default observer(SetMenu);

import React, { useState, useContext } from "react";
import { observer } from "mobx-react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import CommonButton from "../OtherComponents/CommonButton";
import ThemeStoreContext from "@/store/ThemeStore";
import PopupComponent from "../OtherComponents/PopUp";
import { MenuList } from "@/utills/constants";

interface MenuItem {
  name: string;
  image: string;
  price: number;
  description: string;
  link: string;
  addOns: { name: string; price: number }[]; // Add-ons for each menu item
  funOptions: { name: string; price: number }[]; // Fun options for each menu item
}

const SetMenu = () => {
  const themeStore = useContext(ThemeStoreContext);

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState<{
    [key: string]: { selected: boolean; quantity: number; price: number };
  }>({});
  const [funOptions, setFunOptions] = useState<{
    [key: string]: { selected: boolean; quantity: number; price: number };
  }>({});

  const handleCardClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    const initialAddOns: {
      [key: string]: { selected: boolean; quantity: number; price: number };
    } = {};
    menuItem.addOns.forEach((addOn) => {
      initialAddOns[addOn.name] = {
        selected: false,
        quantity: 1,
        price: addOn.price,
      };
    });
    setAddOns(initialAddOns);

    const initialFunOptions: {
      [key: string]: { selected: boolean; quantity: number; price: number };
    } = {};
    menuItem.funOptions.forEach((funOption) => {
      initialFunOptions[funOption.name] = {
        selected: false,
        quantity: 1,
        price: funOption.price,
      };
    });
    setFunOptions(initialFunOptions);
  };

  const handleCloseModal = () => {
    setSelectedMenuItem(null);
    setQuantity(1);
    setAddOns({});
    setFunOptions({});
  };

  const handleAddOnChange = (name: string) => {
    setAddOns((prevAddOns) => ({
      ...prevAddOns,
      [name]: { ...prevAddOns[name], selected: !prevAddOns[name].selected },
    }));
  };

  const handleFunOptionChange = (name: string) => {
    setFunOptions((prevFunOptions) => ({
      ...prevFunOptions,
      [name]: {
        ...prevFunOptions[name],
        selected: !prevFunOptions[name].selected,
      },
    }));
  };

  const handleQuantityChange = (
    name: string,
    value: number,
    type: "addOn" | "funOption",
  ) => {
    if (type === "addOn") {
      setAddOns((prevAddOns) => ({
        ...prevAddOns,
        [name]: { ...prevAddOns[name], quantity: value },
      }));
    } else {
      setFunOptions((prevFunOptions) => ({
        ...prevFunOptions,
        [name]: { ...prevFunOptions[name], quantity: value },
      }));
    }
  };

  const calculateTotal = () => {
    let total = selectedMenuItem ? selectedMenuItem.price : 0;
    Object.values(addOns).forEach((addOn) => {
      if (addOn.selected) {
        total += addOn.price * addOn.quantity;
      }
    });
    Object.values(funOptions).forEach((funOption) => {
      if (funOption.selected) {
        total += funOption.price * funOption.quantity;
      }
    });
    return total * quantity;
  };

  return (
    <>
      <div className="mt-14 flex justify-center">
        <Text themeDivClasses="text-3xl font-bold" content={"Set Menu"} />
      </div>
      <Div
        themeDivClasses={"bg-pepperBlack"}
        content={
          <div className="grid grid-cols-4 mt-7 ml-20 mr-20 gap-4">
            {MenuList.slice(0, 4).map((menuItem: MenuItem, index: number) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => handleCardClick(menuItem)}
              >
                <Div
                  themeDivClasses={"overflow-hidden rounded-xl h-80 shadow-xl"}
                  content={
                    <>
                      <div>
                        <Image
                          className="h-52 items-center"
                          src={menuItem.image}
                          width={300}
                          height={300}
                          alt={menuItem.name}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Text
                          themeDivClasses="text-lg mt-2 font-semibold"
                          content={menuItem.name}
                        />
                        <Text
                          themeDivClasses="text-lg font-semibold"
                          content={`$${menuItem.price}`}
                        />
                        <div className="flex w-full justify-center">
                          <CommonButton />
                        </div>
                      </div>
                    </>
                  }
                />
              </div>
            ))}
          </div>
        }
      />
      {selectedMenuItem && (
        <PopupComponent
          selectedMenuItem={selectedMenuItem}
          quantity={quantity}
          addOns={addOns}
          funOptions={funOptions}
          handleCloseModal={handleCloseModal}
          handleAddOnChange={handleAddOnChange}
          handleFunOptionChange={handleFunOptionChange}
          handleQuantityChange={handleQuantityChange}
          setQuantity={setQuantity}
          calculateTotal={calculateTotal}
        />
      )}
    </>
  );
};

export default observer(SetMenu);
