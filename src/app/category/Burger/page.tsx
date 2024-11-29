
"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import MenuCard from "../../../components/ClientComponent/OtherComponents/MenuCard";
import ProductStoreContext, { Product } from "@/store/ProductStore";
import Text from "@/components/UI/Text";
import { FaArrowLeft } from "react-icons/fa";
import { observer } from "mobx-react";
import Div from "@/components/UI/Div";

const BurgersPage: React.FC = () => {
  const ProductStore = useContext(ProductStoreContext);

  useEffect(() => {
    ProductStore.fetchProducts(); 
  }, [ProductStore]);

  const handleCardClick = (menuItem: Product) => {
 
  };

  const burgers = ProductStore.products.filter(
    (product) => product.category.toLowerCase() === "burger",
  );

  return (
    <Div
      lightColor="bgGrey"
      darkColor="pepperBlack:"
      themeDivClasses="m-auto w-[1180px] flex flex-col mt-7"
      content={
        <>
          <div className="flex justify-between items-center mb-8 ">
            <Text
              content={<h2 className="text-2xl font-bold mb-4 ">Burgers</h2>}
              themeDivClasses={""}
            />
            <Link
              className="flex items-center justify-center text-white bg-themeYellow p-2 rounded-lg"
              href="/"
            >
              <FaArrowLeft className="" />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4 pb-52">
            {burgers.length > 0 ? (
              burgers.map((menuItem, itemIndex) => (
                <MenuCard
                  key={itemIndex}
                  menuItem={menuItem}
                  handleCardClick={handleCardClick}
                />
              ))
            ) : (
              <p>No burgers available at the moment.</p>
            )}
          </div>
        </>
      }
    />
  );
};

export default observer(BurgersPage);
