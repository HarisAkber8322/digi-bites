// pages/burger.tsx
"use client";
import React, { useState } from "react";
import Div from "@/components/UI/Div"; // Adjust according to your project structure
import Text from "@/components/UI/Text"; // Adjust according to your project structure
import MenuCard from "@/components/ClientComponent/OtherComponents/MenuCard"; // Adjust according to your project structure
import { menuData } from "@/utills/constants"; // Adjust according to your project structure

const BurgerPage: React.FC = () => {
  const categoryData = menuData.find(
    (cat) => cat.category.toLowerCase() === "pizza",
  );
  const [favorites, setFavorites] = useState<any[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleFavoriteToggle = (menuItem: any) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (item) => item.name === menuItem.name,
      );
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((item) => item.name !== menuItem.name)
        : [...prevFavorites, menuItem];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <Div
      lightColor="bg-bgGrey"
      darkColor="pepperBlack"
      themeDivClasses={"w-[1180px] m-auto"}
      content={
        <div className="mt-7">
          <Text
            content={<h2 className="text-2xl font-bold mb-4">Pizza</h2>}
            themeDivClasses=""
          />
          <div className="grid grid-cols-6 gap-4">
            {categoryData?.items.map((menuItem, itemIndex) => (
              <MenuCard
                key={itemIndex}
                menuItem={menuItem}
                handleCardClick={() => {}}
                isFavorite={favorites.some(
                  (item) => item.name === menuItem.name,
                )}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};

export default BurgerPage;
