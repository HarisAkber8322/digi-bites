"use client";
import React, { useContext } from "react";
import Image from "next/image"; // Adjust if not using Next.js
import { observer } from "mobx-react";
import Div from "../../UI/Div"; // Adjust according to your project structure
import Text from "../../UI/Text"; // Adjust according to your project structure
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Make sure to install react-icons
import CommonButton from "./CommonButton";
import MainStoreContext from "@/store/Mainstore";

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

const MenuCard: React.FC<MenuCardProps> = ({
  menuItem,
  handleCardClick,
  isFavorite,
  onFavoriteToggle,
}) => {
  const MainStore = useContext(MainStoreContext);
  const addToCart = (item: any) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find(
      (cartItem: any) => cartItem.name === item.name,
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
    MainStore.setCartCount(MainStore.cartCount + 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    handleCardClick(item);
  };
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(menuItem);
  };
  return (
    <div className="cursor-pointer" onClick={() => handleCardClick(menuItem)}>
      <Div
        themeDivClasses={"overflow-hidden rounded-xl h-[240px] shadow-xl"}
        content={
          <>
            <div className="relative">
              <Image
                className="items-center !w-full !h-[130px]"
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
                lightColor="text-dullblack"
                themeDivClasses="text-medium mt-2 font-semibold"
                content={menuItem.name}
              />
              <Text
                darkColor="text-dullyellow"
                lightColor="text-dullyellow"
                themeDivClasses="text-medium font-semibold"
                content={`$${menuItem.price}`}
              />
            </div>
            <div className="flex w-full justify-center">
              <button
                className="flex w-[50%] rounded-[20px] overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(menuItem);
                }}
              >
                <Text
                  themeDivClasses="flex justify-center p-1 bg-dullyellow w-full text-normal text-white"
                  content={<>Add to Cart</>}
                />
              </button>
            </div>
          </>
        }
      />
    </div>
  );
};

export default observer(MenuCard);
