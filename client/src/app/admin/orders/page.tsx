"use client";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Select from "react-select"; 
import OrderStoreContext from "../../../store/OrderStore";
import UserStoreContext from "../../../store/UserStore";
import ProductStoreContext from "../../../store/ProductStore";
import Div from "../../../components/UI/Div";
import Text from "../../../components/UI/Text";
import { Image } from "react-bootstrap";

const OrdersPage: React.FC = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [productNames, setProductNames] = useState<{ [key: string]: { name: string; image: string } }>({}); 
  const [statusFilter, setStatusFilter] = useState<string>("All Orders");

  useEffect(() => {
    orderStore.loadOrders();
  }, [orderStore]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const userIds = orderStore.orderList.flatMap(
        (order) => order.userInfo.userId,
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
        {} as { [key: string]: string },
      );

      setUserNames(userNamesMap);
    };

    const fetchProductNames = async () => {
      const productIds = orderStore.orderList.flatMap((order) =>
        order.products.map((product) => product.productId),
      );

      const uniqueProductIds = Array.from(new Set(productIds));
      const productNamePromises = uniqueProductIds.map(async (id) => {
        const product = await productStore.fetchProductById(id);
        return {
          id,
          name: product ? product.name : "Unknown Product",
          image: product && product.image ? product.image : "", 
        };
      });

      const productNamesArray = await Promise.all(productNamePromises);
      const productNamesMap = productNamesArray.reduce(
        (map, product) => {
          map[product.id] = { name: product.name, image: product.image };
          return map;
        },
        {} as { [key: string]: { name: string; image: string } },
      );

      setProductNames(productNamesMap);
    };

    fetchUserNames();
    fetchProductNames();
  }, [orderStore.orderList, userStore, productStore]);
  const filteredOrders = orderStore.orderList.filter((order) => {
    const userName = userNames[order.userInfo.userId] || "";
    const productNamesInOrder = order.products
      .map((product) => productNames[product.productId]?.name)
      .join(", ");
    const searchLower = searchTerm.toLowerCase();
    const statusFilterLower = statusFilter.toLowerCase();

    const matchesSearch = 
      userName.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      productNamesInOrder.toLowerCase().includes(searchLower) ||
      order.paymentMethod.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === "All Orders" || order.status.toLowerCase() === statusFilterLower;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderStore.updateOrderStatus(orderId, newStatus);
      await orderStore.loadOrders(); 
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const statusOptions = [
    { label: "All Orders", value: "All Orders" },
    { label: "In Process", value: "In Process" },
    { label: "Ready", value: "Ready" },
    { label: "Delayed", value: "Delayed" },
    { label: "On Way", value: "On Way" },
    { label: "Delivered", value: "Delivered" },
  ];

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

   
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg w-full text-black"
            />
          </div>


          <div className="mt-5">
            <Select
              value={{ label: statusFilter, value: statusFilter }}
              onChange={(selectedOption) => setStatusFilter(selectedOption?.value || "All Orders")}
              options={statusOptions}
              className="w-48"
            />
          </div>

          <Div
            themeDivClasses="bg-[#00000000] mt-5 rounded-2xl overflow-hidden p-7"
            darkColor="bg-dullBlack"
            content={
              filteredOrders.length === 0 ? (
                <Text
                  themeDivClasses="text-center "
                  lightColor="text-black"
                  darkColor="text-white"
                  content="No orders available."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      className="shadow-lg border border-ExtraLightGray p-4 rounded-lg bg-white"
                    >
                      <p className="font-bold text-sm text-gray-500 dark:text-gray-400">
                        User Name:
                      </p>
                      <p className="mb-2 text-gray-900 dark:text-gray-100">
                        {userNames[order.userInfo.userId] || "Loading..."}
                      </p>

                      <p className="font-bold text-sm text-gray-500 dark:text-gray-400">
                        Status:
                      </p>
                      <Select
                        value={{
                          label: order.status,
                          value: order.status,
                        }}
                        onChange={(selectedOption) =>
                          handleStatusChange(
                            order._id,
                            selectedOption?.value || order.status
                          )
                        }
                        options={orderStore.getStatusOptions()}
                        className="mb-2"
                      />
                      <p className="font-bold text-sm text-gray-500 dark:text-gray-400">
                        Products:
                      </p>
                      <ul className="mb-2 text-gray-900 ">
                        {order.products.map((product) => (
                          <li key={product.productId} className="flex items-center gap-4 mt-2">
                            {productNames[product.productId]?.image && (
                              <Image
                                src={productNames[product.productId]?.image}
                                alt={productNames[product.productId]?.name}
                                className="w-12 h-8 rounded object-cover"
                              />
                            )}
                            <span>
                              {productNames[product.productId]?.name || "Loading..."}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <p className="font-bold text-sm text-gray-500 dark:text-gray-400">
                        Total Amount:
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        Rs. {order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )
            }
          />
        </>
      }
    />
  );
};

export default observer(OrdersPage);
