import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Text from "../../UI/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { observer } from "mobx-react";
import Link from "next/link";
import Div from "../../UI/Div";
import Image from "next/image";
import UserStoreContext, { User } from "../../../store/UserStore";
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userStore = useContext(UserStoreContext); 
  const initialValues: User = {
    id: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    contact_no: "",
    type: "customer",
    social_links: [{ link: "", name: "" }],
    favoriteProductsIds: [],
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z\s]+$/, "First name must only contain letters"),
    lname: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z\s]+$/, "Last name must only contain letters"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/,
        "invalid email"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
    contact_no: Yup.string()
      .required("required")
      .matches(/^\d{11}$/, "Contact number must be  11 digits"),
    favoriteProductsIds: Yup.array().of(Yup.string()),
  });

  const handleSubmit = async (values: User) => {
    console.log(values);
    let result = await userStore.handleSignUp(values);
    console.log(result, "result");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="">
          <Div
            themeDivClasses="w-[400px]  mx-auto p-6 rounded-lg shadow-lg"
            content={
              <>
                <Text
                  themeDivClasses="font-bold text-xl flex justify-center"
                  content={<>Register To</>}
                />
                <div
                  onClick={() => userStore.changePage("/")}
                  className="cursor-pointer"
                >
                  <Image
                    width={150}
                    height={135}
                    className="text-center m-auto mb-8"
                    src="/images/digibites.png"
                    alt="logo"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-4">
                    <label
                      htmlFor="fname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <Text themeDivClasses="" content={<>First Name:</>} />
                    </label>
                    <Field
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Enter your first name"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <ErrorMessage
                      name="fname"
                      component="div"
                      className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="lname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <Text themeDivClasses="" content={<>Last Name:</>} />
                    </label>
                    <Field
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Enter your last name"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <ErrorMessage
                      name="lname"
                      component="div"
                      className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      <Text themeDivClasses="" content={<> Email:</>} />
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="****@gmail.com"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="contact_no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <Text themeDivClasses="" content={<>Contact Number:</>} />
                    </label>
                    <Field
                      type="text"
                      id="contact_no"
                      name="contact_no"
                      placeholder="Enter your contact number"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <ErrorMessage
                      name="contact_no"
                      component="div"
                      className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                    />
                  </div>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <Text themeDivClasses="" content={<> New Password:</>} />
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <Text
                      themeDivClasses=""
                      content={<> Confirm Password:</>}
                    />
                  </label>

                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                  />
                </div>
                <Field type="hidden" name="favoriteProductsIds" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
                <div className="mt-4 flex justify-between text-sm">
                  <Link
                    href="/login"
                    className="text-themeOrange hover:underline"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(SignUpForm);