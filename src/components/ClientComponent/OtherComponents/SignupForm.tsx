import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Text from "@/components/UI/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { observer } from "mobx-react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Div from "@/components/UI/Div";
import Image from "next/image";
import UserStoreContext, { User } from "@/store/UserStore";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userStore = useContext(UserStoreContext); // Use UserStoreContext

  const initialValues: User = {
     _id: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    contact_no: "",
    type: "customer",
    social_links: [{ link: "", name: "" }],
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: User) => {
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
                <div className="relative mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    <Text themeDivClasses="" content={<> Email:</>} />
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email" placeholder="Enter your email"
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
                {/* <div className="grid grid-cols-2 gap-4"> */}
                {/* <div className="mt-6 flex justify-center">
                  <Button className="w-full py-2 px-4 mb-2 flex justify-center items-center bg-blue-600  rounded-md shadow-sm text-sm font-medium text-gray-700 text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      color="white"
                      className="h-3 w-3 mr-2"
                    />
                    Continue with Facebook
                  </Button>
                </div>
                <div className="mt-2 flex justify-center">
                  <Button className="w-full py-2 px-4 flex justify-center items-center  text-white bg-red-500 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FontAwesomeIcon
                      icon={faGoogle}
                      color="white"
                      className="h-3 w-3 mr-2"
                    />
                    Continue with Google
                  </Button>
                </div> */}
              </>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(SignUpForm);
