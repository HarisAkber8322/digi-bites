import React from 'react';
import Div from '../../UI/Div'; // Adjust according to your project structure
import MenuCard from './MenuCard'; // Adjust according to your project structure
import { menuData } from '../../../utills/constants'; // Adjust according to your project structure

interface MenuProps {
  handleCardClick: (menuItem: any) => void;
}

const Menu: React.FC<MenuProps> = ({ handleCardClick }) => (
  <Div
    themeDivClasses={"bg-pepperBlack"}
    content={
      <div className="mt-7">
        {menuData.map((categoryData, categoryIndex) => (
          <div key={categoryIndex} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">{categoryData.category}</h2>
            <div className="grid grid-cols-5 gap-4">
              {categoryData.items.map((menuItem, itemIndex) => (
                <MenuCard
                  key={itemIndex}
                  menuItem={menuItem}
                  handleCardClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    }
  />
);

export default Menu;
