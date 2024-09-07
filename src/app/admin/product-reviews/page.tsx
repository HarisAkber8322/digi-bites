"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import { FaStar } from "react-icons/fa";
import ProductStoreContext, { Product } from "@/store/ProductStore";
import { observer } from "mobx-react";
import UserStoreContext from "@/store/UserStore";

const RatedProductsPage: React.FC = () => {
  const ProductStore = useContext(ProductStoreContext);
  const UserStore = useContext(UserStoreContext);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  // const fetchUserById = async (id: string | undefined) => {
  //     const result = await UserStore.getUserById(id);
  // }
  useEffect(() => {
    const fetchUserNames = async () => {
      const userIds = ProductStore.products.flatMap((product) =>
        product.ratings.map((rating) => rating.user_id),
      );

      const uniqueUserIds = Array.from(new Set(userIds));
      const userNamePromises = uniqueUserIds.map(async (id) => {
        const user = await UserStore.getUserById(id);
        return {
          id,
          name: user ? `${user.fname} ${user.lname}` : "Unknown User",
        };
      });

      const userNamesArray = await Promise.all(userNamePromises);
      const userNamesMap = userNamesArray.reduce(
        (map, user) => {
          map[user.id] = user.name;
          return map;
        },
        {} as { [key: string]: string },
      );

      setUserNames(userNamesMap);
    };

    fetchUserNames();
  }, [ProductStore.products, UserStore]);

  return (
    <Div
      themeDivClasses="pb-20"
      darkColor="bg-dullBlack"
      lightColor="bg-bgGrey"
      content={
        <>
          <Text
            themeDivClasses="text-3xl font-bold block"
            lightColor="text-black"
            darkColor="text-white"
            content="Product Ratings"
          />

          <Div
            themeDivClasses="shadow-lg mt-10 rounded-2xl overflow-hidden pb-14"
            darkColor="bg-dullblack"
            content={
              <>
                <table className="min-w-full rounded-lg">
                  <thead className="bg-lightGray ">
                    <tr className="py-3">
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        SL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {ProductStore.products.map((product, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray"
                      >
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center text-sx flex justify-start items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <span>{product.name}</span>
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                          <div className="flex justify-center flex-col gap-1 items-center w-full">
                            {product.ratings.map((item, index) => (
                              <span key={index}>
                                {userNames[item.user_id] || "Unknown User"}{" "}
                                <br />
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-xs text-blue-500">
                          <div className="flex justify-center flex-col gap-1 items-center w-full">
                            {product.ratings.map((item, index) => (
                              <div>
                                <div
                                  key={index}
                                  className="flex justify-center items-center bg-blue-100 rounded-md w-8 h-5"
                                >
                                  <span>{item.rating + " "}</span>{" "}
                                  <FaStar className="inline ml-1 text-blue-500" />
                                </div>
                              </div>
                            ))}
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

export default observer(RatedProductsPage);
