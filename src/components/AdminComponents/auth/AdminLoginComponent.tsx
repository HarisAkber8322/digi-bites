
"use client";

import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { adminStore } from "@/store/AdminStore"; 
import { observer } from "mobx-react-lite";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AuthComponentProps {
  setAuthComponent: React.Dispatch<React.SetStateAction<string>>;
}

const AdminLoginComponent = ({ setAuthComponent }: AuthComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: adminStore.admin?.email || "",
    password: adminStore.admin?.password || "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async (
    admin: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      await adminStore.handleLogin(admin);
      if (adminStore.isAdminLoggedIn) {
        console.log("Login successful");
        setError(null);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="font-bold text-xl flex justify-center">LOGIN To</h2>
      <div className="cursor-pointer">
        <Image
          width={150}
          height={135}
          className="text-center m-auto mb-8"
          src="/images/digibites.png"
          alt="logo"
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            {error && (
              <div className="mb-4 text-red-500 font-semibold text-sm text-center">
                {error}
              </div>
            )}
            <div className="mb-4 relative">
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:border-themeOrange sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="relative mb-6">
              <label htmlFor="password" className="block text-sm font-medium">
                Password:
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:border-themeOrange sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm font-medium">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            {/* <div className="mt-4 flex justify-between text-sm">
              <span
                onClick={() => setAuthComponent("forget")}
                className="cursor-pointer text-themeOrange hover:underline"
              >
                Forgot Password?
              </span>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(AdminLoginComponent);
