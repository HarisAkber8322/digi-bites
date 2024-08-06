"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Div from "@/components/UI/Div";
import { menuData } from "../../../utills/constants";
import { MenuItem } from "../../../utills/constants";
import Text from "@/components/UI/Text";
import { FaStar } from "react-icons/fa"; // Import the star icon

const RatedProductsPage: React.FC = () => {
  const router = useRouter();

  // Retrieve ratings from local storage and update menuData
  const allRatedItems = menuData.flatMap(category => 
    category.items.map(item => ({
      ...item,
      rating: Number(localStorage.getItem(`rating-${item.name}`)) || item.rating || 0
    }))
  ).filter(item => item.rating > 0); // Filter out items with no rating

  return (
    <Div
      themeDivClasses="pb-20 "
      darkColor="bg-dullBlack"
      lightColor="bg-bgGrey"
      content={
        <>
          <Text
            themeDivClasses="text-3xl font-bold block"
            lightColor="text-black"
            darkColor="text-white"
            content="All Rated Products"
          />
          <Div
            themeDivClasses="shadow-lg mt-10 rounded-2xl overflow-hidden pb-14"
            lightColor=""
            darkColor="bg-dullblack"
            content={
              <>
                <table className="min-w-full rounded-lg ">
                  <thead className="bg-lightGray">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">SL</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">Image</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">Product Name</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">Customer</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">Review</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 ">
                    {allRatedItems.map((item, index) => (
                      <tr key={item.name} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
                        <td className="px-4 py-2 text-center text-sx flex justify-center">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-full" />
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">{item.name}</td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">Customer Name</td> {/* Replace with actual customer name */}
                        <td className="px-4 py-2 text-center whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">{item.review || 'No review'}</td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-xs text-blue-500 ">
                          <div className="flex justify-center items-center w-full">
                            <div className="flex justify-center items-center bg-blue-100 rounded-md w-8 h-5 ">
                              {item.rating}
                              <FaStar className="inline ml-1 text-blue-500 " />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            }
          />
        </>
      }
    />
  );
};

export default RatedProductsPage;
