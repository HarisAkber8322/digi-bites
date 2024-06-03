"use client";
import React, { useState, useEffect } from 'react';
import Div from '../../components/UI/Div'; // Adjust according to your project structure
import MenuCard from '../../components/ClientComponent/OtherComponents/MenuCard'; // Adjust according to your project structure
import Text from '@/components/UI/Text'; // Adjust according to your project structure

const FavoritePage: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>(() => {
    // Retrieve favorites from local storage or initialize as empty
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleFavoriteToggle = (menuItem: any) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(item => item.name === menuItem.name);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter(item => item.name !== menuItem.name)
        : [...prevFavorites, menuItem];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <Div
      lightColor='white1'
      darkColor='pepperBlack:'
      themeDivClasses={"m-auto w-[1180px]"}
      content={
        <div className="mt-7">
          <Text
            content={<h2 className="text-2xl font-bold mb-4">Favorite Items</h2>}
            themeDivClasses=""
          />
          <div className="grid grid-cols-5 gap-4">
            {favorites.map((menuItem, index) => (
              <MenuCard
                key={index}
                menuItem={menuItem}
                handleCardClick={() => {}}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};

export default FavoritePage;
