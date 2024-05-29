"use client";
import React from 'react';
import Image from 'next/image'; // Adjust if not using Next.js
import { observer } from 'mobx-react';
import Div from '../../UI/Div'; // Adjust according to your project structure
import Text from '../../UI/Text'; // Adjust according to your project structure
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Make sure to install react-icons
import CommonButton from './CommonButton';

interface MenuCardProps {
  menuItem: {
    name: string;
    price: number;
    image: string;
    description: string;
    link: string;
  };
  handleCardClick: (menuItem: any) => void;
  isFavorite: boolean;
  onFavoriteToggle: (menuItem: any) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menuItem, handleCardClick, isFavorite, onFavoriteToggle }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(menuItem);
  };

  return (
    <div className="relative cursor-pointer" onClick={() => handleCardClick(menuItem)}>
      <Div
        themeDivClasses={"overflow-hidden rounded-xl h-72 shadow-xl"}
        content={
          <>
            <div className="relative">
              <Image
                className="items-center !w-full !h-[180px]"
                src={menuItem.image}
                width={300}
                height={250}
                alt={menuItem.name}
              />
              <button
                className="absolute top-2 right-2 text-2xl"
                onClick={handleFavoriteClick}
              >
                {isFavorite ? (
                  <AiFillHeart className="text-red-500" />
                ) : (
                  <AiOutlineHeart className="text-dullyellow" />
                )}
              </button>
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
            </div>
            <div className="flex justify-center">
                <CommonButton />
              </div>
          </>
        }
      />
    </div>
  );
};

export default observer(MenuCard);
