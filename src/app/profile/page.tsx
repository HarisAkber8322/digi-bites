"use client";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
import Div from "@/components/UI/Div";

import { Alert } from "@mui/material"; // Import Alert component
const Profile = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the Alert
  const [orderProductsMap, setOrderProductsMap] = useState({}); // Map orders to products
  const [updatedDetails, setUpdatedDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    contact_no: "",
  }); // State for handling updated form data
  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      if (userStore.user?.id) {
        try {
          // Fetch user details
          const user = await userStore.getUserById(userStore.user.id);
          setUserDetails(user);
          setUpdatedDetails({
            fname: user.fname || "",
            lname: user.lname || "",
            email: user.email || "",
            contact_no: user.contact_no || "",
          });
          // Fetch orders for the user
          await orderStore.getOrdersByUserId(userStore.user?.id);

          const productsMap = {};
          for (const order of orderStore.userOrders) {
            productsMap[order._id] = []; // Initialize array for this order
            for (const item of order.products) {
              const product = await productStore.fetchProductById(item.productId);
              if (product) {
                productsMap[order._id].push({ ...product, quantity: item.quantity });
              }
            }
          }
          setOrderProductsMap(productsMap);
        } catch (error) {
          console.error("Error fetching orders or products:", error);
        }
      }
    };

    fetchOrdersAndProducts();
  }, [userStore.user?.id, userStore, orderStore, productStore]);
  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (userDetails) {
      try {
        await userStore.updateUserById(userStore.user?.id, {
          fname: userDetails.fname,
          lname: userDetails.lname,
          email: userDetails.email,
          contact_no: userDetails.contact_no,
        });
        setShowAlert(true)
        // alert("Profile updated successfully!");
        setTimeout(() => {
          setShowAlert(false)
        }, 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    }
  };


  return (
    <Div
      themeDivClasses="min-h-screen md:w-[1180px] m-auto pt-6"
      lightColor="bg-bgGrey"
      darkColor="bg-pepperblack"
      content={
        <div>
          {showAlert && (
            <Alert severity="success"  variant="outlined" sx={{ width: '100%' }} className="mb-4">
              Profile Updated Successfuly
            </Alert>
          )}
          <div className="md:flex  md:space-x-10">
            <div className="w-full md:w-3/4">
              <h1 className="flex justify-start text-3xl font-semibold mb-10">User Profile</h1>
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="fname" className="block text-sm font-semibold">
                      First Name
                    </label>
                    <input
                      id="fname"
                      type="text"
                      value={userDetails?.fname || ""}
                      onChange={(e) => setUserDetails({ ...userDetails, fname: e.target.value })}
                      className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="lname" className="block text-sm font-semibold">
                      Last Name
                    </label>
                    <input
                      id="lname"
                      type="text"
                      value={userDetails?.lname || ""}
                      onChange={(e) => setUserDetails({ ...userDetails, lname: e.target.value })}
                      className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={userDetails?.email || ""}
                      onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                      className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact_no" className="block text-sm font-semibold">
                      Contact No
                    </label>
                    <input
                      id="contact_no"
                      type="text"
                      value={userDetails?.contact_no || ""}
                      onChange={(e) => setUserDetails({ ...userDetails, contact_no: e.target.value })}
                      className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                </div>
              </form>
              {/* Update Button */}
              <button
                type="button"
                onClick={handleUpdateProfile}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Profile
              </button>
            </div>
            {/* Sidebar with Orders */}
            <div className="w-full md:w-1/4 mt-10 md:mt-0">
              <h3 className="text-xl font-semibold">Your Orders</h3>
              <ul className="mt-4 space-y-3">
                {orderStore.userOrders?.length > 0 ? (
                  orderStore.userOrders?.map((order, index) => (
                    <div className="bg-white p-4 rounded-lg shadow-md" key={index}>
                      <p>Order #{index + 1}</p>
                      <p className="text-sm text-gray-500">
                        Total: {order.totalAmount} RS
                      </p>

                      <div className="mt-2">
                        <h4 className="text-sm font-semibold">Products:</h4>
                        {orderProductsMap[order._id]?.map((product, idx) => (
                          <div key={idx} className="flex items-center gap-4 mt-2">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-md"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No orders found.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default observer(
  dynamic(() => Promise.resolve(Profile), { ssr: false })
);
