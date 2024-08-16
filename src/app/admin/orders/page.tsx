"use client";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";

const OrdersPage: React.FC = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);

  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [productNames, setProductNames] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    orderStore.loadOrders();
  }, [orderStore]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const userIds = orderStore.orderList.flatMap(
        (order) => order.userInfo.userId
      );

      const uniqueUserIds = Array.from(new Set(userIds));
      const userNamePromises = uniqueUserIds.map(async (id) => {
        const user = await userStore.getUserById(id);
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
        {} as { [key: string]: string }
      );

      setUserNames(userNamesMap);
    };

    const fetchProductNames = async () => {
      const productIds = orderStore.orderList.flatMap((order) =>
        order.products.map((product) => product.productId)
      );

      const uniqueProductIds = Array.from(new Set(productIds));
      const productNamePromises = uniqueProductIds.map(async (id) => {
        const product = await productStore.fetchProductById(id);
        return { id, name: product ? product.name : "Unknown Product" };
      });

      const productNamesArray = await Promise.all(productNamePromises);
      const productNamesMap = productNamesArray.reduce(
        (map, product) => {
          map[product.id] = product.name;
          return map;
        },
        {} as { [key: string]: string }
      );

      setProductNames(productNamesMap);
    };

    fetchUserNames();
    fetchProductNames();
  }, [orderStore.orderList, userStore, productStore]);

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
            content="Orders List"
          />

          <Div
            themeDivClasses="shadow-lg mt-10 rounded-2xl overflow-hidden pb-14"
            darkColor="bg-dullblack"
            content={
              orderStore.orderList.length === 0 ? (
                <Text
                  themeDivClasses="text-center mt-10"
                  lightColor="text-black"
                  darkColor="text-white"
                  content="No orders available."
                />
              ) : (
                <table className="min-w-full rounded-lg">
                  <thead className="bg-lightGray">
                    <tr className="py-3">
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        SL
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        User Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Add-Ons
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Total Amount (Rs)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {orderStore.orderList.map((order, index) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray h-[20px]"
                      >
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100 w-[80px]">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {userNames[order.userInfo.userId] || "Loading..."}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {order.status}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {order.products.map((product, productIndex) => (
                            <p key={productIndex}>
                              {productNames[product.productId] || "Loading..."}{" "}
                              (Quantity: {product.quantity})
                            </p>
                          ))}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          <ul>
                            {order.addOns
                              .filter((addOn) => addOn.value) // Filter out add-ons with value: true
                              .map((addOn, addOnIndex) => (
                                <li key={addOnIndex} className="mb-2">
                                  {addOn.name} - Rs.{addOn.price.toFixed(2)}
                                </li>
                              ))}
                          </ul>
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {order.paymentMethod}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          Rs. {order.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
          />
        </>
      }
    />
  );
};

export default observer(OrdersPage);
