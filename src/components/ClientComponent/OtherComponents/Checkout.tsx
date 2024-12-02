"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import CartStoreContext from "@/store/CartStore";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
const CheckoutPage = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);
  const cartStore = useContext(CartStoreContext);

  const [deliveryMethod, setDeliveryMethod] = useState("homeDelivery");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotalPrice = () =>
    cartStore.cart.items.reduce((total, item) => {
      const product = productStore.products.find((p) => p._id === item.product_id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);

  const totalPrice = calculateTotalPrice();
  const deliveryFee = deliveryMethod === "homeDelivery" ? 100 : 0;
  const total = deliveryFee + totalPrice;

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits.")
      .required("Phone number is required."),
    address: deliveryMethod === "homeDelivery" ? Yup.string()
      .trim()   
      .required("Address is required for home delivery.")
      .test("is-valid", "Address cannot be empty or just spaces.", (value) => value?.trim().length > 0)
      : Yup.string()
        .notRequired(),
    orderNote: Yup.string()
      .trim()
      .min(5, "Order note must be at least 5 characters.")
      .required("Order note is required.")
      .test("is-valid", "Order note cannot be empty or just spaces.", (value) => value?.trim().length > 0),
  });


  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
      orderNote: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        formik.setTouched({
          phone: true,
          address: deliveryMethod === "homeDelivery",
          orderNote: true,
        });
        return;
      }

      setIsLoading(true);
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
            orderNote: values.orderNote,
            phoneNumber: values.phone,
            address: values.address,
          },
          address: deliveryMethod === "homeDelivery" ? values.address : undefined,
          createdAt: new Date().toISOString(),
        };

        await orderStore.placeOrder(orderObject);
        await cartStore.clearCart(userStore.user?.id);

        setShowAlert(true);
        setTimeout(() => userStore.changePage("/"), 3000);
      } catch (error) {
        console.error("Error placing order:", error);
        alert("There was an issue placing your order. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (cartStore.cart.items.length > 0) {
      cartStore.cart.items.forEach(async (item) => {
        await productStore.fetchProductById(item.product_id);
      });
    } else {
      userStore.changePage("/");
    }
  }, [cartStore, productStore, userStore]);

  const handleDeliveryTypeChange = (value: string) => {
    setDeliveryMethod(value);
    formik.setFieldValue("address", "");
  };

  return (
    <div className={`relative ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
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

      <form onSubmit={formik.handleSubmit} className="flex flex-wrap justify-center items-start gap-6 p-8">
        <div className="w-[55%] p-6 rounded-lg shadow-lg bg-white">
          <h2 className="font-bold text-2xl mb-6 text-center">Checkout</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Delivery Method:</label>
            <div className="flex flex-row gap-4">
              {["homeDelivery", "takeaway"].map((method) => (
                <label
                  key={method}
                  className={`flex w-full items-center border p-2 rounded-md ${deliveryMethod === method ? "bg-red-100 border-red-400" : "border-gray-300"}`}
                >
                  <input
                    type="radio"
                    value={method}
                    checked={deliveryMethod === method}
                    onChange={() => handleDeliveryTypeChange(method)}
                    className="mr-2"
                  />
                  {method === "homeDelivery" ? "Home Delivery (Rs 100)" : "Takeaway (Free)"}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number:</label>
            <input
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
            )}
          </div>
          {deliveryMethod === "homeDelivery" && (
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium mb-2">Address:</label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full px-3 py-2 border rounded-md"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-xs">{formik.errors.address}</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="orderNote" className="block text-sm font-medium mb-2">Order Note:</label>
            <textarea
              id="orderNote"
              name="orderNote"
              rows={3}
              value={formik.values.orderNote}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-3 py-2 border rounded-md"
            />
            {formik.touched.orderNote && formik.errors.orderNote && (
              <p className="text-red-500 text-xs">{formik.errors.orderNote}</p>
            )}
          </div>
        </div>
        <div className="w-[40%] shadow-xl rounded-lg px-3 pb-6 pt-3 bg-white">
          <h2 className="font-bold text-xl text-center mb-4">Order Summary</h2>
          <div className="mb-4">
            {cartStore.cart.items.map((item, index) => {
              const product = productStore.products.find((p) => p._id === item.product_id);
              return product ? (
                <div key={index} className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <Image src={product.image} alt={product.name} width={60} height={60} className="rounded-md" />
                    <div className="ml-2">
                      <p>{product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold">Rs {product.price * item.quantity}</p>
                </div>
              ) : (
                <p key={index}>Loading...</p>
              );
            })}
          </div>
          <div className="text-sm text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>Rs {totalPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Fee:</span> <span>Rs {deliveryFee}</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between font-bold">
              <span>Total:</span> <span>Rs {total}</span>
            </p>
          </div>
          <button type="submit" className="bg-blue-500 text-white w-full py-2 mt-6 rounded-lg hover:bg-blue-600">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
