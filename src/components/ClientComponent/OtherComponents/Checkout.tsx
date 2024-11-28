"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CartStoreContext from "@/store/CartStore";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
import { Alert } from "@mui/material"; // Import Alert component

const CheckoutPage = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);
  const cartStore = useContext(CartStoreContext);
  const userId = userStore.user?.id;
  const [deliveryMethod, setDeliveryMethod] = useState("homeDelivery");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    orderNote: "",
  });
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the Alert
  const [isLoading, setIsLoading] = useState(false); // State to control the loading animation

  useEffect(() => {
    setIsLoading(true);
    if (cartStore.cart.items.length > 0) {
      setIsLoading(false)
      cartStore.cart.items.forEach(async (item) => {
        await productStore.fetchProductById(item?.product_id);
      });
    } else {
      userStore.changePage('/')
    }
  }, [cartStore, productStore]);

  const calculateTotalPrice = () => {
    return cartStore.cart.items.reduce((total, item) => {
      const product = productStore.products.find(
        (p) => p._id === item.product_id
      );
      const productPrice = product ? product.price : 0;
      return total + productPrice * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const deliveryFee = deliveryMethod === "homeDelivery" ? 100 : 0;
  const total = deliveryFee + totalPrice;

  const handleDeliveryTypeChange = (value: string) => {
    setDeliveryMethod(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckout = async () => {
    setIsLoading(true); // Start loading state
    try {
      const orderObject = {
        status: "In Process",
        paymentMethod: deliveryMethod === "homeDelivery" ? "cash on delivery" : "cash",
        products: cartStore.cart.items.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
        })),
        totalAmount: total,
        userInfo: {
          userId: userStore.user?.id,
          orderNote: formData.orderNote,
          phoneNumber: formData.phone,
          address: formData.address,
        },
        address: deliveryMethod === "homeDelivery" ? formData.address : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: {
          $date: new Date().toISOString(),
        },
      };

      // Place the order
      await orderStore.placeOrder(orderObject);

      // Clear the cart
      await cartStore.clearCart(userStore.user?.id);

      // Show success alert and hide page content
      setShowAlert(true);
      setIsLoading(false);

      // After 3 seconds, hide the alert and redirect to "/"
      setTimeout(() => {
        userStore.changePage("/"); // Redirect to home page
      }, 3000);

    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue placing your order. Please try again.");
      setIsLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <div className={`relative ${isLoading ? 'opacity-0 pointer-events-none' : ''}`}>
      {/* Show Alert on Successful Order */}
      {showAlert && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
          <Alert severity="success" sx={{ width: '100%' }}>
            Your order has been placed!
          </Alert>
        </div>
      )}

      {/* Checkout Form */}
      <form className={`flex flex-wrap justify-center items-start gap-6 p-8 ${isLoading ? 'opacity-0' : ''}`}>
        {/* Left Section: Checkout Form */}
        <div className="w-[55%] p-6 rounded-lg shadow-lg bg-white">
          <h2 className="font-bold text-2xl mb-6 text-center">Checkout</h2>
          {/* Delivery Method Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Delivery Method:</label>
            <div className="flex flex-row gap-4">
              <label
                className={`flex w-full items-center border p-2 rounded-md transition duration-150 ease-in-out hover:cursor-pointer ${deliveryMethod === "homeDelivery"
                  ? "bg-red-100 border-red-400"
                  : "border-ExtraLightGray hover:bg-red-100 hover:border-red-400"
                  }`}
              >
                <input
                  type="radio"
                  value="homeDelivery"
                  checked={deliveryMethod === "homeDelivery"}
                  onChange={() => handleDeliveryTypeChange("homeDelivery")}
                  className="mr-2"
                />
                Home Delivery
                <span className="flex justify-end w-[60%]">$30.00</span>
              </label>
              <label
                className={`flex w-full items-center border p-2 rounded-md transition duration-150 ease-in-out hover:cursor-pointer ${deliveryMethod === "takeaway"
                  ? "bg-red-100 border-red-400"
                  : "border-ExtraLightGray hover:bg-red-100 hover:border-red-400"
                  }`}
              >
                <input
                  type="radio"
                  value="takeaway"
                  checked={deliveryMethod === "takeaway"}
                  onChange={() => handleDeliveryTypeChange("takeaway")}
                  className="mr-2"
                />
                Takeaway
                <span className="flex justify-end w-[60%]">$0.00</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {deliveryMethod === "homeDelivery" && (
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium mb-2">Address:</label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              ></textarea>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="orderNote" className="block text-sm font-medium mb-2">Order Note:</label>
            <textarea
              id="orderNote"
              name="orderNote"
              rows={3}
              value={formData.orderNote}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* Right Section: Cost Summary */}
        <div className="w-[40%]">
          <div className="shadow-xl rounded-lg px-3 pb-6 pt-3 bg-white">
            <div className="gap-4 grid grid-cols-1 mb-4">
              {cartStore.cart.items.map((item, index) => {
                const product = productStore.products.find(
                  (p) => p._id === item.product_id
                );
                if (!product) {
                  return (
                    <div
                      key={index}
                      className="flex shadow-xl rounded-lg items-center justify-between p-4 h-[100px]"
                    >
                      <p>Loading product details...</p>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className="bg-white flex shadow-xl rounded-lg items-center justify-between p-4 h-[100px]"
                  >
                    <div className="flex cursor-pointer w-full">
                      <Image
                        className="rounded-md"
                        src={product.image}
                        width={80}
                        height={60}
                        alt={product.name}
                      />
                      <div className="ml-2">
                        <p>{product.name}</p>
                        <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-bold">${product.price * item.quantity}</div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="flex justify-between py-2">
              <p className="text-lg font-semibold">Total Amount:</p>
              <p className="font-bold">${total}</p>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex mt-4 align-middle justify-center rounded-md"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
