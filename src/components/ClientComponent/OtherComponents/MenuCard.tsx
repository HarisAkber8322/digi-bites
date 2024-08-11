"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ProductStoreContext, { Product } from "@/store/ProductStore";
import UserStoreContext from "@/store/UserStore";
import StarRating from "./StarRating";

interface MenuCardProps {
  menuItem: Product;
  handleCardClick: (menuItem: Product) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  menuItem,
  handleCardClick,
}) => {
  const ProductStore = useContext(ProductStoreContext);
  const UserStore = useContext(UserStoreContext);
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    // Retrieve the rating from localStorage when component mounts
    const savedRating = localStorage.getItem(`rating-${menuItem._id}`);
    if (savedRating) {
      setUserRating(Number(savedRating));
    }
  }, [menuItem._id]);

  useEffect(() => {
    // Fetch user favorite status when component mounts
    if (UserStore.isLoggedin) {
      UserStore.fetchFavoriteProducts(UserStore.user?.id); // Ensure the favorite products are fetched and updated
    }
  }, [UserStore.isLoggedin]);

  const addToCart = (item: Product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find(
      (cartItem: Product) => cartItem._id === item._id
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
    UserStore.toggleFavorite(menuItem._id, UserStore.user?.id); // Toggle favorite using the store method
  };

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    localStorage.setItem(`rating-${menuItem._id}`, newRating.toString());
    ProductStore.addReview(menuItem._id, {
      user_id: UserStore.user?.id,
      rating: newRating,
      review: "", // Add a review text if needed
    });
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
              {UserStore.isLoggedin && (
                <button
                  className="absolute top-2 right-2 text-2xl"
                  onClick={handleFavoriteClick}
                >
                  {UserStore.favoriteProductIds.has(menuItem._id) ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-themeYellow" />
                  )}
                </button>
              )}
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
              {UserStore.isLoggedin && (
                <div className="mb-1">
                  <StarRating rating={userRating} onRatingChange={handleRatingChange} />
                </div>
              )}
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
