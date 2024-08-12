// components/MenuCard.tsx

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ProductStoreContext from "@/store/ProductStore";
import UserStoreContext from "@/store/UserStore";
import { Product } from "@/store/ProductStore"; // Adjust the import path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt,  faStar as faSolidStar  } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
interface MenuCardProps {
  menuItem: Product;
  handleCardClick: (menuItem: Product) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menuItem, handleCardClick }) => {
  const ProductStore = useContext(ProductStoreContext);
  const UserStore = useContext(UserStoreContext);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await ProductStore.fetchProductById(menuItem._id);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [menuItem._id]);

  const addToCart = (item: Product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((cartItem: Product) => cartItem._id === item._id);
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
    if (UserStore.isLoggedin && UserStore.user) {
      UserStore.toggleFavorite(menuItem._id, UserStore.user.id);
    }
  };

  const averageRating = product?.average_rating || 0;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-xs">
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon icon={faSolidStar}  key={index} className="text-themeYellow"  />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-themeYellow text-xs" />} {/* No half-star icon */}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon icon={faRegularStar}  key={index} className="text-themeYellow"  />
        ))}
      </div>
    );
  };

  return (
    <div className="cursor-pointer" onClick={() => handleCardClick(menuItem)}>
      <Div themeDivClasses="overflow-hidden rounded-xl h-[240px] shadow-xl"
      content={<>
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
          <div className="flex items-center mb-1">
            {renderStars(averageRating)}
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
              content="Add to Cart"
            />
          </button>
        </div>
        </>}/>
    </div>
  );
};

export default observer(MenuCard);
