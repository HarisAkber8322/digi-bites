import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "../../ClientComponent/OtherComponents/StarRating";
import { MenuItem } from "../../../utills/constants"; // Adjust the import path
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
      themeDivClasses="relative p-2 rounded-xl my-6"
      content={
        <>
          <Text
            themeDivClasses="text-base  font-medium"
            lightColor="text-black"
            darkColor="text-white"
            content={
              <>
              <div className=" w-full flex flex-row justify-between items-center px-2 py-2 ">
                <div>Top Rated Products </div>
                <button
                  className=" text-themeYellow text-sm font-bold"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : "View All"}
                </button>
                </div>
                <div className="flex flex-col space-y-2 ">
                  {topRatedItems.map((item) => (
                    <div
                     className="flex flex-row items-center w-full rounded bg-ExtraLightGray shadow-lg h-[50px] "
                      
                     key={item.name}
                     
                    >
                      <div className="h-full ">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={100}
                    className="object-cover !h-full"
                        />
                      </div>
                      <div className="items-center px-4 flex flex-row justify-between w-full">
                        <h3 className="text-sm font-normal">{item.name}</h3>
                        <div className="font-light text-xs">
                          <StarRating
                            rating={item.rating ?? 0} // Use default value if undefined
                            onRatingChange={() => {}}
                          />
                        </div>
                      </div>
                    </div>
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
