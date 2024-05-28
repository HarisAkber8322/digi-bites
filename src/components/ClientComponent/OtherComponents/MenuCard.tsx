import React from 'react';
import Image from 'next/image'; // Adjust if not using Next.js
import Div from '../../UI/Div'; // Adjust according to your project structure
import Text from '../../UI/Text'; // Adjust according to your project structure
import CommonButton from './CommonButton'; // Adjust according to your project structure

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

const MenuCard: React.FC<MenuCardProps> = ({ menuItem, handleCardClick }) => (
  <div
    className="cursor-pointer"
    onClick={() => handleCardClick(menuItem)}
  >
    <Div
      themeDivClasses={"overflow-hidden rounded-xl h-72 shadow-xl"}
      content={
        <>
          <div>
            <Image
              className="items-center"
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
              <CommonButton />
            </div>
          </div>
        </>
      }
    />
  </div>
);

export default MenuCard;
