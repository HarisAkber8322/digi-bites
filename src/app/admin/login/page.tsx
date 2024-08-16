"use client"; // Add this line to indicate it's a Client Component

import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className=" w-[70%] relative">
        <div className="">  <Image
            width={""}
            height={""}
            className="text-center m-auto mb-8"
            src="/images/loginBg.png"
            alt="logo"
          /></div>
          <div className="absolute top-32 right-36">
          <Image
            width={300}
            height={300}
            className="text-center m-auto mb-2"
            src="/images/digibites.png"
            alt="logo"
          />
          <div className="flex justify-center ml-14">
            
          <h2 className="text-5xl gap-3 flex flex-col font-normal">
            Your
            <span className="text-themeOrange">Cafe</span>
            <strong className="text-themeOrange ">Your Food...</strong>
          </h2>
          </div>
          </div>
        </div>
        <div className="w-[30%] mx-auto p-6 bg-white ">
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
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:border-themeOrange sm:text-sm"
            />
          </div>
          <div className="relative mb-6">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
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
          </div>
          <div className="mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm font-medium">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div className="mt-4 flex justify-between text-sm">
            <a
              href="/forgot-password"
              className="text-themeOrange hover:underline"
            >
              Forgot Password?
            </a>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
