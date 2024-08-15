// components/TopRatedItems.tsx

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import ProductStoreContext from "@/store/ProductStore";
import { Product } from "@/store/ProductStore"; // Adjust the import path as needed
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt,  faStar as faSolidStar  } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

interface TopRatedItemsProps {
  showAll: boolean;
}

const TopRatedItems: React.FC<TopRatedItemsProps> = ({ showAll }) => {
  const ProductStore = useContext(ProductStoreContext);
  const [topRatedItems, setTopRatedItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await ProductStore.fetchProducts(); // Fetch products
      const itemsWithRatings = ProductStore.products.map((item) => {
        // Calculate the average rating
        const totalRating = item.ratings.reduce((acc, rating) => acc + rating.rating, 0);
        const averageRating = item.ratings.length > 0 ? totalRating / item.ratings.length : 0;

        return {
          ...item,
          average_rating: averageRating,
          ratings_count: item.ratings.length,
        };
      });

      // Sort items by rating in descending order
      const sortedItems = itemsWithRatings
        .sort((a, b) => (b.average_rating ?? 0) - (a.average_rating ?? 0))
        .slice(0, showAll ? undefined : 6); // Display top 6 or all items

      setTopRatedItems(sortedItems);
    };

    fetchProducts();
  }, [ProductStore, showAll]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-[10px]">
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon icon={faSolidStar}  key={index} className="text-themeYellow"  />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-themeYellow " />} {/* No half-star icon */}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon icon={faRegularStar}  key={index} className="text-themeYellow"  />
        ))}
      </div>
    );
  };

  return (
    <Div
      themeDivClasses="relative rounded-xl shadow-md mr-6"
      darkColor="bg-pepperBlack"
      content={
        <>
          <Text
            themeDivClasses="text-base font-medium"
            lightColor="text-black"
            darkColor="text-white"
            content={
              <>
                <div className="w-full flex flex-row justify-between items-center p-2 border-b-[1px] !border-zinc-100">
                  <div>Top Rated Products</div>
                  <Link
                    href="/admin/product-reviews" // Use Link for navigation
                    className="text-blue-500 hover:text-themeYellow text-xs font-semibold"
                  >
                    {showAll ? "Show Less" : "View All"}
                  </Link>
                </div>

                <div className="flex flex-col space-y-[10px] p-4">
                  {topRatedItems.length > 0 ? (
                    topRatedItems.map((item) => (
                      <Div
                        key={item._id}
                        themeDivClasses="rounded-lg"
                        lightColor="bg-ExtraLightGray"
                        darkColor="bg-black"
                        content={
                          <>
                            <div className="flex flex-row items-center w-full rounded-lg shadow h-[50px]">
                              <div className="h-full p-2">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={60}
                                  height={90}
                                  className="object-cover !h-full rounded"
                                />
                              </div>

                              <div className="items-center px-4 flex flex-row justify-between w-full">
                                <h3 className="text-xs font-medium">
                                  {item.name}
                                </h3>
                                <div className="flex items-center">
                                  {renderStars(item.average_rating ?? 0)}
                                  <span className="text-xs font-light ml-2">
                                    ({item.ratings_count})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        }
                      />
                    ))
                  ) : (
                    <div>No top rated items available.</div>
                  )}
                </div>
              </>
            }
          />
        </>
      }
    />
  );
};

export default TopRatedItems;
