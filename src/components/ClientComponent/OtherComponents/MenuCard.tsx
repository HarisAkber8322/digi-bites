// import React, { useState } from 'react';
// import Image from 'next/image'; // Adjust if not using Next.js
// import Div from '../../UI/Div'; // Adjust according to your project structure
// import Text from '../../UI/Text'; // Adjust according to your project structure
// import CommonButton from './CommonButton'; // Adjust according to your project structure
// import Link from 'next/link';

// interface MenuCardProps {
//   menuItem: {
//     name: string;
//     price: number;
//     image: string;
//     description: string;
//     link: string;
//   };
//   handleCardClick: (menuItem: any) => void;
// }

// const MenuCard: React.FC<MenuCardProps> = ({ menuItem, handleCardClick }) => (
//   <div
//     className="cursor-pointer"
//     onClick={() => handleCardClick(menuItem)}
//   >
//     <Div
//       themeDivClasses={"overflow-hidden rounded-xl h-72 shadow-xl"}
//       content={
//         <>
//           <div>
//             <Image
//               className="items-center !w-full !h-[180px]"
//               src={menuItem.image}
//               width={300}
//               height={250}
//               alt={menuItem.name}
//             />
//           </div>
//           <div className="flex flex-col items-center justify-center">
//             <Text
//               themeDivClasses="text-lg mt-2 font-semibold"
//               content={menuItem.name}
//             />
//             <Text
//               themeDivClasses="text-lg font-semibold"
//               content={`$${menuItem.price}`}
//             />
//             <div className="flex w-full justify-center">
//               <button className="flex w-[95%] rounded-[4px] overflow-hidden " >
//                 <Link className="flex justify-center p-1 bg-dullyellow w-full text-lg  text-white" href={"#"}>
//                   Add to Cart
//                 </Link>
//               </button>
//             </div>
//           </div>
//         </>
//       }
//     />
//   </div>
// );

// export default MenuCard;

import React from 'react';
import Image from 'next/image';
import Div from '../../UI/Div';
import Text from '../../UI/Text';
import Link from 'next/link';

interface MenuCardProps {
  menuItem: {
    name: string;
    price: number;
    image: string;
    description: string;
    link: string;
  };
  handleCardClick: (menuItem: any) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menuItem, handleCardClick }) => {
  const addToCart = (item: any) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((cartItem: any) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    handleCardClick(item);
  };

  return (
    <div className="cursor-pointer" onClick={() => handleCardClick(menuItem)}>
      <Div
        themeDivClasses={"overflow-hidden rounded-xl h-72 shadow-xl"}
        content={
          <>
            <div>
              <Image
                className="items-center !w-full !h-[180px]"
                src={menuItem.image}
                width={300}
                height={250}
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
                <button
                  className="flex w-[95%] rounded-[4px] overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(menuItem);
                  }}
                >
                  <Text themeDivClasses="flex justify-center p-1 bg-dullyellow w-full text-lg text-white" content={<>
                    Add to Cart
                    </>}
                  />
                </button>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default MenuCard;
