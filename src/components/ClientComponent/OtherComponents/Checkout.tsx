
// "use client";
// import React, { useState } from "react";
// import Div from "../../UI/Div";
// import Text from "../../UI/Text";
// import { observer } from "mobx-react";
// import { Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleInfo, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css"; // Import leaflet CSS

// const Checkout = () => {
//   const [deliveryType, setDeliveryType] = useState("home");
//   const [deliveryNote, setDeliveryNote] = useState("");
//   const [showPopup, setShowPopup] = useState(false); // Payment popup state
//   const [showMapPopup, setShowMapPopup] = useState(false); // Map popup state
//   const [paymentMethod, setPaymentMethod] = useState("None");
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const handleDeliveryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDeliveryType(e.target.value);
//   };

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const toggleMapPopup = () => {
//     setShowMapPopup(!showMapPopup);
//   };

//   const handlePaymentMethodChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleConfirmPayment = () => {
//     togglePopup(); // Close the popup on confirm
//   };

//   const LocationMarker = () => {
//     useMapEvents({
//       click(e: { latlng: React.SetStateAction<null>; }) {
//         setSelectedLocation(e.latlng);
//         toggleMapPopup(); // Close map popup on selecting a location
//       },
//     });

//     return selectedLocation ? (
//       <Marker position={selectedLocation}></Marker>
//     ) : null;
//   };

//   return (
//     <>
//       <Div
//         themeDivClasses="w-full md:w-[1180px] m-auto mt-5"
//         darkColor="lightBlack"
//         lightColor="transparent"
//         content={
//           <>
//             <Text
//               themeDivClasses="font-bold text-2xl mt-4 mb-5"
//               content={"Checkout"}
//             />
//             <div className="flex gap-x-6 mt-5 pb-5">
//               <div className="w-[60%]">
//                 <Div
//                   themeDivClasses="mb-6 p-6 rounded-lg shadow-md"
//                   content={
//                     <>
//                       {deliveryType === "home" && (
//                         <div className="mb-6 w-full transition duration-200 ease-in-out">
//                           <div className="flex items-center justify-between">
//                             <Text
//                               themeDivClasses="font-semibold text-lg mb-2"
//                               content={"Deliver to"}
//                             />
//                             <span
//                               onClick={toggleMapPopup}
//                               className="text-themeYellow font-bold hover:cursor-pointer"
//                             >
//                               Add Address
//                             </span>
//                           </div>
//                           <div className="flex justify-center">
//                             <span className="text-red-500 gap-1 flex items-center">
//                               <FontAwesomeIcon icon={faCircleInfo} />
//                               {selectedLocation
//                                 ? `Lat: ${selectedLocation.lat.toFixed(
//                                     2
//                                   )}, Lng: ${selectedLocation.lng.toFixed(2)}`
//                                 : "No contact info added"}
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex flex-col gap-2">
//                         <Text
//                           themeDivClasses="font-semibold text-lg"
//                           content={"Delivery Type"}
//                         />
//                         <div className="flex gap-x-5 mt-2 w-full justify-between">
//                           <label
//                             className={`flex w-full border p-2 ease-in-out hover:cursor-pointer rounded-md duration-150 transition hover:bg-red-100 hover:border-red-400  ${
//                               deliveryType === "home"
//                                 ? "bg-red-100 border-red-400"
//                                 : "border-ExtraLightGray"
//                             }`}
//                           >
//                             <input
//                               type="radio"
//                               value="home"
//                               checked={deliveryType === "home"}
//                               onChange={handleDeliveryTypeChange}
//                               className="mr-2"
//                             />
//                             Home Delivery
//                             <span className="flex justify-end w-[60%]">
//                               $30.00
//                             </span>
//                           </label>
//                           <label
//                             className={`flex w-full border p-2 ease-in-out hover:cursor-pointer rounded-md duration-150 transition hover:bg-red-100 hover:border-red-400  ${
//                               deliveryType === "takeaway"
//                                 ? "bg-red-100 border-red-400"
//                                 : "border-ExtraLightGray"
//                             }`}
//                           >
//                             <input
//                               type="radio"
//                               value="takeaway"
//                               checked={deliveryType === "takeaway"}
//                               onChange={handleDeliveryTypeChange}
//                               className="mr-2"
//                             />
//                             Take Away
//                             <span className="flex justify-end w-[68%]">
//                               Free
//                             </span>
//                           </label>
//                         </div>
//                       </div>
//                     </>
//                   }
//                 />
//                 <Div
//                   themeDivClasses="mb-6 p-6 rounded-lg shadow-md"
//                   content={
//                     <>
//                       <div className="flex justify-between border-b-2 border-ExtraLightGray pb-2 mb-4 ">
//                         <Text
//                           themeDivClasses="font-semibold text-lg mb-2"
//                           content={"Payment Method"}
//                         />
//                         <span
//                           onClick={togglePopup}
//                           className="text-themeYellow font-bold hover:cursor-pointer"
//                         >
//                           Change
//                         </span>
//                       </div>
//                       <div className="flex ">
//                         <span
//                           onClick={togglePopup}
//                           className="text-red-500 gap-1 flex items-center hover:cursor-pointer"
//                         >
//                           <FontAwesomeIcon icon={faCirclePlus} />
//                           {paymentMethod === "None"
//                             ? "Add Payment Method"
//                             : paymentMethod}
//                         </span>
//                       </div>
//                     </>
//                   }
//                 />

//                 <Div
//                   themeDivClasses="mb-6 p-6 rounded-lg shadow-md"
//                   content={
//                     <>
//                       <div className="mb-2">
//                         <Text
//                           themeDivClasses="font-semibold text-lg mb-2"
//                           content={"Delivery Note"}
//                         />
//                         <textarea
//                           placeholder="Add delivery note"
//                           value={deliveryNote}
//                           rows={4}
//                           onChange={(e) => setDeliveryNote(e.target.value)}
//                           className="w-full text-md p-2 border-2 border-ExtraLightGray rounded mt-3 focus-visible:border-ExtraLightGray"
//                         />
//                       </div>
//                     </>
//                   }
//                 />
//               </div>
//               <div className="w-[40%]">
//                 <Div
//                   themeDivClasses="shadow-xl rounded-lg px-3 pb-6 pt-3"
//                   content={
//                     <>
//                       <Text
//                         themeDivClasses="items-center mb-4 border-b-2 pb-3 border-ExtraLightGray flex justify-center"
//                         content={
//                           <>
//                             <span className="font-bold flex items-center text-2xl">
//                               Cost Summary
//                             </span>
//                           </>
//                         }
//                       />
//                       <Text
//                         themeDivClasses="items-center p-1 flex justify-between"
//                         content={
//                           <>
//                             <span className="font-semibold text-base">
//                               Subtotal
//                             </span>{" "}
//                             <span className="text-base">200 rs</span>
//                           </>
//                         }
//                       />
//                       <Text
//                         themeDivClasses="items-center p-1 flex justify-between"
//                         content={
//                           <>
//                             <span className="font-semibold text-base">
//                               Delivery fee
//                             </span>{" "}
//                             <span className="text-base">150 rs</span>
//                           </>
//                         }
//                       />
//                       <Text
//                         themeDivClasses="items-center p-1 pt-4 border-t-2 mt-5 border-ExtraLightGray flex justify-between"
//                         content={
//                           <>
//                             <span className="font-semibold text-lg">
//                               Total:
//                             </span>{" "}
//                             <span className="text-lg font-semibold">
//                               $00,00
//                             </span>
//                           </>
//                         }
//                       />
//                       <div className="flex justify-center pr-4 pl-4">
//                         <Button className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex mt-4 align-middle justify-center rounded-md">
//                           Place Order
//                         </Button>
//                       </div>
//                     </>
//                   }
//                 />
//               </div>
//             </div>
//           </>
//         }
//       />

//       {/* Payment Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center">
//               <Text
//                 themeDivClasses="font-bold text-lg mb-2"
//                 content={"Select Your Payment"}
//               />
//               <button onClick={togglePopup} className="text-xl font-bold">
//                 ×
//               </button>
//             </div>
//             <div className="mt-4">
//               <div className="flex flex-col gap-2">
//                 <label>
//                   <input
//                     type="radio"
//                     value="Cash on Delivery"
//                     checked={paymentMethod === "Cash on Delivery"}
//                     onChange={handlePaymentMethodChange}
//                     className="mr-2"
//                   />
//                   Cash on Delivery
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     value="Card Payment"
//                     checked={paymentMethod === "Card Payment"}
//                     onChange={handlePaymentMethodChange}
//                     className="mr-2"
//                   />
//                   Card Payment
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end mt-4">
//               <Button
//                 onClick={handleConfirmPayment}
//                 className="bg-themeYellow text-white rounded-md px-4 py-2"
//               >
//                 Confirm Payment
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Map Popup */}
//       {showMapPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center">
//               <Text
//                 themeDivClasses="font-bold text-lg mb-2"
//                 content={"Select Address on Map"}
//               />
//               <button onClick={toggleMapPopup} className="text-xl font-bold">
//                 ×
//               </button>
//             </div>
//             <div className="mt-4">
//               <MapContainer
//                 center={[31.5497, 74.3436]} // Centered at Lahore, Pakistan
//                 zoom={12} // Zoom level to show the city in detail
//                 className="leaflet-container"
//               >
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <LocationMarker />
//               </MapContainer>
//             </div>
//             <div className="flex justify-end mt-4">
//               <Button
//                 onClick={() => {
//                   setShowMapPopup(false);
//                 }}
//                 className="bg-themeYellow text-white rounded-md px-4 py-2"
//               >
//                 Confirm Address
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default observer(Checkout);




import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import UserStoreContext from "@/store/UserStore";
import OrderStoreContext from "@/store/OrderStore";
import ProductStoreContext from "@/store/ProductStore";
import CartStoreContext, { AddOn, CartItem } from "@/store/CartStore";
const CheckoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);
  const cartStore = useContext(CartStoreContext);
  useEffect(() => {
    // setMessageBox(false);
    cartStore.cart.items.forEach(async (item) => {
      await productStore.fetchProductById(item?.product_id);
    });
  }, [cartStore, productStore]);
  console.log(cartStore.cart.items)
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
    email: Yup.string().email("Invalid email address").required("Email is required"),
    address: Yup.string().required("Address is required"),
    deliveryNote: Yup.string().max(200, "Delivery note can't exceed 200 characters"),
  });



  return (
    <div className="flex flex-wrap justify-center items-start gap-6 p-8">
      {/* Left Section: Checkout Form */}
      <div className="w-[55%]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={""}
        >
          {() => (
            <Form className="w-full p-6 rounded-lg shadow-lg bg-white">
              <h2 className="font-bold text-2xl mb-6 text-center">Checkout</h2>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-themeOrange focus:border-themeOrange"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone:
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
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-themeOrange focus:border-themeOrange"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

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

              <Button
                type="submit"
                className="w-full py-2 px-4 bg-themeOrange text-white rounded-md shadow-sm font-medium hover:bg-themeYellow"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Save and Continue"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Right Section: Cost Summary */}
      <div className="w-[40%]">
        <Div
          themeDivClasses="shadow-xl rounded-lg px-3 pb-6 pt-3 bg-white"
          content={
            <>
              <Text
                themeDivClasses="items-center mb-4 border-b-2 pb-3 border-ExtraLightGray flex justify-center"
                content={
                  <>
                    <span className="font-bold flex items-center text-2xl">
                      Cost Summary
                    </span>
                  </>
                }
              />
              <Text
                themeDivClasses="items-center p-1 flex justify-between"
                content={
                  <>
                    <span className="font-semibold text-base">Subtotal</span>{" "}
                    <span className="text-base">200 rs</span>
                  </>
                }
              />
              <Text
                themeDivClasses="items-center p-1 flex justify-between"
                content={
                  <>
                    <span className="font-semibold text-base">Delivery fee</span>{" "}
                    <span className="text-base">150 rs</span>
                  </>
                }
              />
              <Text
                themeDivClasses="items-center p-1 pt-4 border-t-2 mt-5 border-ExtraLightGray flex justify-between"
                content={
                  <>
                    <span className="font-semibold text-lg">Total:</span>{" "}
                    <span className="text-lg font-semibold">$00,00</span>
                  </>
                }
              />
              <div className="flex justify-center pr-4 pl-4">
                <Button className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex mt-4 align-middle justify-center rounded-md">
                  Place Order
                </Button>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
