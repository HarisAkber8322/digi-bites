// Menu.tsx

import React, { useState } from "react";
import Link from "next/link";
import Div from "../../UI/Div"; // Adjust according to your project structure
import MenuCard from "./MenuCard"; // Adjust according to your project structure
import { menuData } from "@/utills/constants"; // Adjust according to your project structure
import Text from "@/components/UI/Text"; // Adjust according to your project structure
import { FaArrowRight } from "react-icons/fa"; // Import the arrow icon from react-icons library

interface MenuProps {
  handleCardClick: (menuItem: any) => void;
}

const Menu: React.FC<MenuProps> = ({ handleCardClick }) => {
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
      darkColor="bg-pepperBlack"
      lightColor="bg-white1"
      themeDivClasses={""}
      content={
        <div className="py-[28px]">
          {menuData.map((categoryData, categoryIndex) => (
            <div key={categoryIndex} className="mb-[28px]">
              <Text
                content={
                  <>
                    <h2 className="text-2xl font-bold align-middle">
                      {categoryData.category}
                    </h2>
                    {categoryData.items.length > 6 && (
                      <div className="flex justify-end ">
                        <Link href={`/category/${categoryData.category}`}>
                          <div className="flex items-center bg-dullyellow text-white py-2 px-2 rounded">
                            <FaArrowRight className="mr-1" /> {/* Arrow icon */}
                            {/* <span>View More</span> */}
                          </div>
                        </Link>
                      </div>
                    )}
                  </>
                }
                themeDivClasses="flex flex-rows justify-between"
              />
              <div className="grid grid-cols-6 gap-4 my-[28px]">
                {categoryData.items.slice(0, 6).map((menuItem, itemIndex) => (
                  <MenuCard
                    key={itemIndex}
                    menuItem={menuItem}
                    handleCardClick={handleCardClick}
                    isFavorite={favorites.some(
                      (item) => item.name === menuItem.name,
                    )}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default Menu;
