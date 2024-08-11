"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import MenuCard from "./MenuCard";
import ProductStoreContext, { Product } from "@/store/ProductStore";
import Text from "@/components/UI/Text";
import { FaArrowRight } from "react-icons/fa";
import UserStoreContext from "@/store/UserStore";
import { observer } from "mobx-react";

const Menu: React.FC = () => {
  const ProductStore = useContext(ProductStoreContext);
  const UserStore = useContext(UserStoreContext);

  useEffect(() => {
    ProductStore.fetchProducts(); // Fetch products when component mounts
  }, [ProductStore]);

  const handleCardClick = (menuItem: Product) => {
    // Handle card click if needed
  };

  const categories = Array.from(
    new Set(ProductStore.products.map((product) => product.category))
  );

  return (
    <div>
      {categories.map((category) => (
        <div key={category} className="mb-[28px]">
          <Text
            content={
              <>
                <h2 className="text-2xl font-bold align-middle">{category}</h2>
                <div className="flex justify-end">
                  <Link href={`/category/${category.toLowerCase()}`}>
                    <div className="flex items-center bg-themeYellow text-white py-2 px-2 rounded">
                      <FaArrowRight className="mr-1" /> {/* Arrow icon */}
                      <span>View More</span>
                    </div>
                  </Link>
                </div>
              </>
            }
            themeDivClasses="flex flex-rows justify-between"
          />
          <div className="grid grid-cols-6 gap-4 my-[28px]">
            {ProductStore.products
              .filter((menuItem) => menuItem.category === category)
              .map((menuItem, itemIndex) => (
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
  );
};

export default observer(Menu);
