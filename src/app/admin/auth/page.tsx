"use client"; // Add this line to indicate it's a Client Component

import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { adminStore } from "@/store/AdminStore"; // Ensure this path is correct based on your project structure
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation"; // Use this hook for navigation in Next.js
import * as Yup from "yup"; // For validation schema
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SignupForm from "@/components/AdminComponents/auth/SignupForm";
import AdminLoginComponent from "@/components/AdminComponents/auth/AdminLoginComponent";
import ForgetLayout from "@/components/AdminComponents/auth/ForgetLayout";
const AdminLogin = observer(() => {
  const [authComponent, setAuthComponent] = React.useState("login");
  const router = useRouter();
  useEffect(() => {
 
    // console.log(adminStore.isAdminLoggedIn);
    // If admin is logged in, redirect to the admin dashboard
    if (adminStore.isAdminLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  // if (adminStore.isAdminLoggedIn) {
  //   return null; // Prevent login form from rendering during redirect
  // }
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    setAuthComponent(value);
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="w-[70%] relative">
          <div className="h-screen">
            <Image
              width={""}
              height={""}
              className="text-center h-screen w-full"
              src="/images/loginBg.png"
              alt="logo"
            />
          </div>
          <div className="absolute top-32 right-48">
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
                <strong className="text-themeOrange">Your Food...</strong>
              </h2>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex flex-col items-center justify-center mx-auto p-6 bg-white">
          <ToggleButtonGroup
            color="primary"
            value={authComponent}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="sign_up">Sign Up</ToggleButton>
            <ToggleButton value="forget">Forget</ToggleButton>
          </ToggleButtonGroup>
          {authComponent === "login" ? (
            <AdminLoginComponent setAuthComponent={setAuthComponent} />
          ) : authComponent === "sign_up" ? (
            <SignupForm setAuthComponent={setAuthComponent} />
          ) : (
            authComponent === "forget" && <ForgetLayout />
          )}
        </div>
      </div>
    </>
  );
});

export default AdminLogin;
