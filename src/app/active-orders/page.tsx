"use client";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import { FaHashtag } from "react-icons/fa";
import { Image } from "react-bootstrap";

const OrdersPage: React.FC = observer(() => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);

  const [productDetails, setProductDetails] = useState<{
    [key: string]: { name: string; image: string };
  }>({});

  useEffect(() => {
    if (userStore.user?.id) {
      orderStore.loadOrders();
    }
  }, [orderStore, userStore.user?.id]);

  useEffect(() => {
    if (userStore.user?.id) {
      const fetchProductDetails = async () => {
        const productIds = orderStore.orderList
          .filter((order) => order.userInfo.userId === userStore.user?.id)
          .flatMap((order) =>
            order.products.map((product) => product.productId),
          );
        const uniqueProductIds = Array.from(new Set(productIds));

        const productDetailsMap: {
          [key: string]: { name: string; image: string };
        } = {};
        for (const id of uniqueProductIds) {
          const product = await productStore.fetchProductById(id);
          if (product) {
            productDetailsMap[id] = {
              name: product.name,
              image: product.image,
            };
          } else {
            productDetailsMap[id] = { name: "Unknown Product", image: "" };
          }
        }

        setProductDetails(productDetailsMap);
      };

      fetchProductDetails();
    }
  }, [orderStore.orderList, userStore, productStore]);

  return (
    <Div
      themeDivClasses="pb-20 px-[80px]"
      darkColor="bg-dullBlack"
      lightColor="bg-bgGrey"
      content={
        <>
          <Text
            themeDivClasses="text-3xl font-bold block pt-10"
            lightColor="text-black"
            darkColor="text-white"
            content="Active Orders List"
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
                        Status
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Product Details
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
                    {orderStore.orderList
                      .filter(
                        (order) => order.userInfo.userId === userStore.user?.id,
                      )
                      .map((order, index) => (
                        <React.Fragment key={order._id}>
                          {order.products.map((product, productIndex) => (
                            <tr
                              key={`${order._id}-${productIndex}`}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray h-[20px]"
                            >
                              {productIndex === 0 && (
                                <>
                                  <td
                                    rowSpan={order.products.length}
                                    className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100 w-[80px]"
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    rowSpan={order.products.length}
                                    className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    {order.status}
                                  </td>
                                </>
                              )}
                              <td className="px-4 py-2 text-center text-sx flex justify-center items-center gap-3">
                                <Image
                                  src={
                                    productDetails[product.productId]?.image ||
                                    ""
                                  }
                                  alt={
                                    productDetails[product.productId]?.name ||
                                    ""
                                  }
                                  className="w-10 h-10 object-cover rounded-full"
                                />
                                <span>
                                  {productDetails[product.productId]?.name ||
                                    "Loading..."}{" "}
                                </span>
                                <FaHashtag className="ml-1" />
                                <span className="ml-1">{product.quantity}</span>
                              </td>
                              {productIndex === 0 && (
                                <>
                                  <td
                                    rowSpan={order.products.length}
                                    className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    <ul>
                                      {order.addOns
                                        .filter((addOn) => addOn.value)
                                        .map((addOn, addOnIndex) => (
                                          <li key={addOnIndex} className="mb-2">
                                            {addOn.name} - Rs.
                                            {addOn.price.toFixed(2)}
                                          </li>
                                        ))}
                                    </ul>
                                  </td>
                                  <td
                                    rowSpan={order.products.length}
                                    className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    {order.paymentMethod}
                                  </td>
                                  <td
                                    rowSpan={order.products.length}
                                    className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    Rs. {order.totalAmount.toFixed(2)}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </React.Fragment>
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
});

export default OrdersPage;
