import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Text from "@/components/UI/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { observer } from "mobx-react";
import Link from "next/link";
import Div from "@/components/UI/Div";
import Image from "next/image";
import AdminStoreContext, { Admin } from "@/store/AdminStore";
interface AuthComponentProps {
  setAuthComponent: React.Dispatch<React.SetStateAction<string>>;
}

const AdminSignUpForm = ({ setAuthComponent }: AuthComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const adminStore = useContext(AdminStoreContext); // Use AdminStoreContext

  const initialValues: Admin = {
    id: "",
    username: "",
    email: "",
    password: "",
    role: "admin", // default to "admin"
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
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

  const handleSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const result = await adminStore.handleSignup(values);
    console.log(result);
    if (result) {
      setAuthComponent("login");
    }
    console.log(result, "Admin sign-up result");
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
            themeDivClasses="w-[400px] mx-auto p-6 rounded-lg shadow-lg"
            content={
              <>
                <Text
                  themeDivClasses="font-bold text-xl flex justify-center"
                  content={<>Admin Registration</>}
                />
                <div className="cursor-pointer">
                  <Image
                    width={150}
                    height={135}
                    className="text-center m-auto mb-8"
                    src="/images/digibites.png"
                    alt="logo"
                  />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium"
                  >
                    <Text themeDivClasses="" content={<>Username:</>} />
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                  />
                </div>

                <div className="relative mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    <Text themeDivClasses="" content={<>Email:</>} />
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
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
                    className="block text-sm font-medium"
                  >
                    <Text themeDivClasses="" content={<>Password:</>} />
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
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
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
                    className="block text-sm font-medium"
                  >
                    <Text themeDivClasses="" content={<>Confirm Password:</>} />
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
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
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

                {/* Hidden field for role */}
                <Field type="hidden" name="role" value="admin" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>

                <div className="mt-4 flex justify-between text-sm">
                  <span
                    onClick={() => setAuthComponent("login")}
                    className="cursor-pointer text-themeOrange hover:underline"
                  >
                    Already have an account? Login
                  </span>
                </div>
              </>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(AdminSignUpForm);
