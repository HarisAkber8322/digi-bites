"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CartStoreContext from "@/store/CartStore";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
import { Alert } from "@mui/material"; // Import Alert component
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    }
    if (!formData.orderNote) {
      newErrors.orderNote = "Order note is required.";
    }
    if (deliveryMethod === "homeDelivery" && !formData.address) {
      newErrors.address = "Address is required for home delivery.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors.
  };
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
    if (!validateFields()) return; // Stop if validation fails.
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
      {/* {showAlert && (
        <Alert severity="success" variant="outlined"  sx={{ width: '100%' }}>
          Your order has been placed!
        </Alert>
      )} */}
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-green-800 bg-opacity-80 flex justify-center items-center z-50 p-6">
          <div className="bg-white p-12 rounded-lg text-center shadow-lg">
            <FontAwesomeIcon icon={faCheckCircle} size="6x" className="text-green-600" />
            <h1 className="text-3xl font-bold mt-6 text-green-800">
              Your order has been placed!
            </h1>
          </div>
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
                <span className="flex justify-end w-[60%]">Rs 100</span>
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
                <span className="flex justify-end w-[60%]">Rs 0</span>
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
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
             {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          {deliveryMethod === "homeDelivery" && (
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium mb-2">Address:</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              ></textarea>{errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="orderNote" className="block text-sm font-medium mb-2">Order Note:</label>
            <textarea
              id="orderNote"
              name="orderNote"
              placeholder="Enter delivery note"
              rows={3}
              value={formData.orderNote}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            ></textarea>
             {errors.orderNote && <p className="text-red-500 text-xs">{errors.orderNote}</p>}
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
                  <>
                    <div
                      key={index}
                      className="bg-white flex shadow-xl mb-2 rounded-lg items-center justify-between p-4 h-[100px]"
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
                      <div className="font-bold w-16">Rs {product.price * item.quantity}</div>
                    </div>
                  </>
                );
              })}
            </div>
            {/* delivery cost Summary */}
            <h2 className="font-bold text-xl pt-2 mb-4 text-center">Cost Summary</h2>
            <div className="flex justify-between py-2 pt-4 border-t-2 mt-5 border-ExtraLightGray">
              <p className="text-lg font-semibold">Delivery Cost:</p>
              <p className="font-bold">Rs {deliveryFee}</p>
            </div>
            {/* Order Summary */}
            <div className="flex justify-between py-2 pt-4 border-t-2 mt-5 border-ExtraLightGray">
              <p className="text-lg font-semibold">Total Amount:</p>
              <p className="font-bold">Rs {total}</p>
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
