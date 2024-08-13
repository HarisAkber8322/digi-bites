"use client";

import React, { useContext, useEffect, useState } from "react";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import ProductStoreContext, { Product } from "@/store/ProductStore";
import { observer } from "mobx-react";
import MenuCard from "../../components/ClientComponent/OtherComponents/MenuCard"; // Import MenuCard

const RecommendedProductsPage: React.FC = () => {
  const ProductStore = useContext(ProductStoreContext);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch and filter recommended products
    const fetchRecommendedProducts = async () => {
      await ProductStore.fetchProducts(); // Ensure this fetches all products and updates the store
      const recommended = ProductStore.products.filter(
        (product) => product.recommended
      );
      setRecommendedProducts(recommended);
    };

    fetchRecommendedProducts();
  }, [ProductStore]);

  // Function to handle card clicks (if needed)
  const handleCardClick = (product: Product) => {
    // Implement click behavior if needed
    console.log("Card clicked:", product);
  };

  return (
    <Div
      lightColor="bgGrey"
      darkColor="pepperBlack:"
      themeDivClasses="m-auto w-[1180px]"
      content={
        <div className="mt-7">
          <Text
            content={
              <h2 className="text-2xl font-bold mb-4">Suggested Items</h2>
            }
            themeDivClasses=""
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {recommendedProducts.map((product, index) => (
              <MenuCard
                key={index}
                menuItem={product}
                handleCardClick={() => handleCardClick(product)}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};

export default observer(RecommendedProductsPage);
