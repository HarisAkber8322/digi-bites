"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "../../ClientComponent/OtherComponents/StarRating";
import { MenuItem } from "../../../utills/constants";
import Div from "../../UI/Div";
import Text from "../../UI/Text";

interface TopRatedItemsProps {
  items: MenuItem[];
}

const TopRatedItems: React.FC<TopRatedItemsProps> = ({ items }) => {
  const [topRatedItems, setTopRatedItems] = useState<MenuItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Retrieve ratings from local storage
    const itemsWithRatings = items.map((item) => {
      const storedRating = Number(localStorage.getItem(`rating-${item.name}`)) || 0;
      console.log(`Item: ${item.name}, Stored Rating: ${storedRating}`); // Debugging line
      return {
        ...item,
        rating: storedRating || item.rating || 0,
      };
    });

    // Sort items by rating in descending order
    const sortedItems = itemsWithRatings
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, showAll ? undefined : 6); // Display top 8 or all items

    setTopRatedItems(sortedItems);
  }, [items, showAll]);

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
                    href="/admin/allratedproducts" // Use Link for navigation
                    className="text-blue-500 hover:text-themeYellow text-xs font-semibold"
                  >
                    {showAll ? "Show Less" : "View All"}
                  </Link>
                </div>

                <div className="flex flex-col space-y-[10px] p-4">
                  {topRatedItems.length > 0 ? (
                    topRatedItems.map((item) => (
                      <Div
                        key={item.name}
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
                                <div className="font-light text-[10px]">
                                  <StarRating
                                    rating={item.rating ?? 0}
                                    onRatingChange={() => {}}
                                  />
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
