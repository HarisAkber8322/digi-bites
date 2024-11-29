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
    ProductStore.fetchProducts();
    UserStore.fetchFavoriteProducts(UserStore.user?.id);
  }, [ProductStore, UserStore]);

  const handleCardClick = (menuItem: Product) => {
  };

  const categories = Array.from(
    new Set(ProductStore.products.map((product) => product.category)),
  );

  return (
    <div className="pb-52">
      {categories.map((category) => (
        <div key={category} className="mb-[28px]">
          <Text
            content={
              <>
                <h2 className="text-2xl font-bold">{category}</h2>
                <div className="flex justify-end">
                  <Link
                    className="flex items-center bg-themeYellow text-white p-2 rounded-lg"
                    href={`/category/${category.toLowerCase()}`}
                  >
                    <FaArrowRight className="" />
                  </Link>
                </div>
              </>
            }
            themeDivClasses="flex justify-between items-center"
          />
          <div className="grid grid-cols-6 xs:flex xs:flex-col gap-4 my-[28px]">
            {ProductStore.products
              .filter((menuItem) => menuItem.category === category)
              .slice(0, 6)
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
