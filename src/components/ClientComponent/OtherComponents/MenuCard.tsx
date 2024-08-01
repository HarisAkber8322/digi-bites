"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import MainStoreContext from "@/store/Mainstore";
import StarRating from "./StarRating";

interface MenuItem {
  name: string;
  price: number;
  image: string;
  description: string;
  link: string;
  rating?: number; // Rating value from 0 to 5
}

interface MenuCardProps {
  menuItem: MenuItem;
  handleCardClick: (menuItem: MenuItem) => void;
  isFavorite: boolean;
  onFavoriteToggle: (menuItem: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  menuItem,
  handleCardClick,
  isFavorite,
  onFavoriteToggle,
}) => {
  const MainStore = useContext(MainStoreContext);
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    // Retrieve the rating from localStorage when component mounts
    const savedRating = localStorage.getItem(`rating-${menuItem.name}`);
    if (savedRating) {
      setUserRating(Number(savedRating));
    }
  }, [menuItem.name]);

  const addToCart = (item: MenuItem) => {
    MainStore.setCartCount(MainStore.cartCount + 1);
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find(
      (cartItem: MenuItem) => cartItem.name === item.name
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    handleCardClick(item);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavoriteToggle(menuItem);
  };

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    // Save the new rating to local storage
    localStorage.setItem(`rating-${menuItem.name}`, newRating.toString());
    // Update the rating in your data store or backend here
    // For example, you might want to send a request to your server
    // to update the rating for this menuItem.
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
                  <AiOutlineHeart className="text-themeYellow" />
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
                darkColor="text-themeYellow"
                lightColor="text-themeYellow"
                themeDivClasses="text-medium font-semibold"
                content={`$${menuItem.price}`}
              />
              <div className="mb-1">
                <StarRating rating={userRating} onRatingChange={handleRatingChange} />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button
                type="button"
                className="flex w-[50%] rounded-[20px] overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(menuItem);
                }}
              >
                <Text
                  themeDivClasses="flex justify-center p-1 bg-themeYellow w-full text-normal text-white"
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
