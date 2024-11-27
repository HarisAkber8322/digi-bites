"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SetStateAction, useState } from "react";

const CheckoutPage = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("homeDelivery"); // State to toggle delivery method
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryNote: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .required("Phone number is required"),
    address: Yup.string().when("deliveryMethod", (deliveryMethod, schema) => {
      return deliveryMethod === "homeDelivery"
        ? schema.required("Address is required")
        : schema;
    }),
    deliveryNote: Yup.string().max(200, "Delivery note can't exceed 200 characters"),
  });

  const handleDeliveryTypeChange = (value: SetStateAction<string>) => {
    setDeliveryMethod(value);
  };

  return (
    <div className="flex flex-wrap justify-center items-start gap-6 p-8">
      {/* Left Section: Checkout Form */}
      <div className="w-[55%]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsSubmitting(true);
            console.log(values);
            setTimeout(() => setIsSubmitting(false), 2000); // Simulate form submission
          }}
        >
          {() => (
            <Form className="w-full p-6 rounded-lg shadow-lg bg-white">
              <h2 className="font-bold text-2xl mb-6 text-center">Checkout</h2>

              {/* Delivery Method Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Delivery Method:
                </label>
                <div className="flex flex-row gap-4">
                  <label
                    className={`flex w-full items-center border p-2 rounded-md transition duration-150 ease-in-out hover:cursor-pointer ${
                      deliveryMethod === "homeDelivery"
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
                    className={`flex w-full items-center border p-2 rounded-md transition duration-150 ease-in-out hover:cursor-pointer ${
                      deliveryMethod === "takeaway"
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

              {/* Conditional Fields for Home Delivery */}
              {deliveryMethod === "homeDelivery" && (
                <>
                
   
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      Address:
                    </label>
                    <Field
                      as="textarea"
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-themeOrange focus:border-themeOrange"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
        
                </>
              )}
                         {/* Phone Field */}
                         <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number:
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-themeOrange focus:border-themeOrange"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
                        <div className="mb-4">
                    <label htmlFor="deliveryNote" className="block text-sm font-medium mb-2">
                      Delivery Note:
                    </label>
                    <Field
                      as="textarea"
                      id="deliveryNote"
                      name="deliveryNote"
                      placeholder="Add any delivery instructions"
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-themeOrange focus:border-themeOrange"
                    />
                    <ErrorMessage
                      name="deliveryNote"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

            </Form>
          )}
        </Formik>
      </div>

      {/* Right Section: Cost Summary */}
      <div className="w-[40%]">
        <div className="shadow-xl rounded-lg px-3 pb-6 pt-3 bg-white">
          <div className="items-center mb-4 border-b-2 pb-3 border-ExtraLightGray flex justify-center">
            <span className="font-bold flex items-center text-2xl">
              Cost Summary
            </span>
          </div>
          <div className="items-center p-1 flex justify-between">
            <span className="font-semibold text-base">Subtotal</span>
            <span className="text-base">200 rs</span>
          </div>
          <div className="items-center p-1 flex justify-between">
            <span className="font-semibold text-base">Delivery fee</span>
            <span className="text-base">150 rs</span>
          </div>
          <div className="items-center p-1 pt-4 border-t-2 mt-5 border-ExtraLightGray flex justify-between">
            <span className="font-semibold text-lg">Total:</span>
            <span className="text-lg font-semibold">$00.00</span>
          </div>
          <div className="flex justify-center pr-4 pl-4">
            <button className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex mt-4 align-middle justify-center rounded-md">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
