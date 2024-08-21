import React, { useEffect, useState } from "react";
import Image from "next/image"; import { MenuItem } from "../../../utills/constants"; // Adjust the import path
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
    const itemsWithRatings = items.map((item) => ({
      ...item,
      rating:
        Number(localStorage.getItem(`rating-${item.name}`)) || item.rating || 0,
    }));

    // Sort items by rating in descending order
    const sortedItems = itemsWithRatings
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, showAll ? undefined : 6); // Display top 8 or all items

    setTopRatedItems(sortedItems);
  }, [items, showAll]);

  return (
    <Div
      themeDivClasses="relative  rounded-xl shadow-md mr-6"
      darkColor="bg-pepperBlack"
      content={
        <>
          <Text
            themeDivClasses="text-base  font-medium"
            lightColor="text-black"
            darkColor="text-white"
            content={
              <>
                <div className=" w-full flex flex-row justify-between items-center p-2 border-b-[1px] !border-zinc-100">
                  <div>Top Customers </div>
                  <button
                    className=" text-themeYellow text-sm font-bold"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show Less" : "View All"}
                  </button>
                </div>

                <div className="flex flex-col space-y-[10px] p-4">
                  {topRatedItems.map((item, index) => (
                    <Div
                      themeDivClasses=" rounded-lg"
                      lightColor="bg-ExtraLightGray"
                      darkColor="bg-black"
                      key={index}
                      content={
                        <>
                          <div
                            className="flex flex-row items-center w-full rounded-lg shadow h-[50px] "
                            key={index}
                          >
                            <div className="h-full p-2">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={60}
                                height={90}
                                className="object-cover !h-full rounded "
                              />
                            </div>

                            <div className="items-center px-4 flex flex-row justify-between w-full">
                              <h3 className="text-xs font-medium">
                                {item.name}
                              </h3>

                            </div>
                          </div>
                        </>
                      }
                    />
                  ))}
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
