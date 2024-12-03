"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/navigation";

export interface Admin {
  id: string | undefined;
  username: string;
  email: string;
  password: string;
  role: string;
}
class AdminStore {
  isAdminLoggedIn = false;
  admin: Admin | null = null;
  router: ReturnType<typeof useRouter> | null = null;
  constructor() {
    makeAutoObservable(this);
    // this.checkLoginState();
  }

  // Login method
  async handleLogin(admin: { email: string; password: string }) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/admin/login",
        admin,
      );

      if (response.status === 200) {
        const { adminToken, admin } = response.data;
        Cookies.set("adminToken", adminToken, { expires: 7 });
        this.changePage("/admin");
        this.setIsAdminLoggedIn(true);
        this.setAdmin(admin);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      this.setIsAdminLoggedIn(false);
      return false;
    }
  }
  changePage(uri: string) {
    this.router?.push(uri);
  }
  // Signup method
  async handleSignup(newAdmin: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/admin/signup",
        newAdmin,
      );

      if (response.status === 201) {
        const { admin } = response.data;
        console.log("Admin created successfully:", admin);
        return true;
      }
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  }

  async fetchLoggedInAdmin() {
    // console.log('hi')

  }

  // Logout method
  logout() {
    Cookies.remove("adminToken");
    this.admin = null;
    this.setIsAdminLoggedIn(false);
    this.changePage("/admin/auth");
  }

  // Utility methods
  setIsAdminLoggedIn(value: boolean) {
    this.isAdminLoggedIn = value;
  }

  setAdmin(admin: Admin) {
    this.admin = admin;
  }

  checkLoginState = async () => {
      try {
        const adminToken = Cookies.get("adminToken");
        if (!adminToken) {
          this.setIsAdminLoggedIn(false);
          this.admin = null;
          return;
        }

        const response = await axios.get(
          "http://localhost:3001/api/auth/admin/loggedinAdmin",
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          },
        );

        if (response.status === 200) {
          const { admin } = response.data;
          this.setIsAdminLoggedIn(true);
          this.setAdmin(admin);
        }
      } catch (error) {
        console.error("Error fetching logged-in admin:", error);
        this.setIsAdminLoggedIn(false);
        this.admin = null;
      }
  }
  // send OTP
  async sendOtp(email: string) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/admin/forgot-password",
        {
          email,
        },
      );
      if (response.status === 200) {
        console.log("OTP sent to email:", email);
        return response.data.otpToken; 
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return null;
    }
  }

  // Forgot Password: Verify OTP
  async verifyOtp(otpToken: string, otp: string) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/admin/verify-otp",
        {
          otpToken,
          otp,
        },
      );
      if (response.status === 200) {
        console.log("OTP verified successfully");
        return true;
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    }
  }

  // Forgot Password: Reset Password
  async resetPassword(otpToken: string, newPassword: string) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/admin/reset-password",
        {
          otpToken,
          newPassword,
        },
      );
      if (response.status === 200) {
        console.log("Password reset successfully");
        return true;
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      return false;
    }
  }
}

export const adminStore = new AdminStore();

const AdminStoreContext = React.createContext(adminStore);

const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  
  React.useEffect(() => {
    adminStore.router = router; 
    adminStore.checkLoginState();
  }, [router]);

  return (
    <AdminStoreContext.Provider value={adminStore}>
      {children}
    </AdminStoreContext.Provider>
  );
};

export default AdminStoreContext;
export { AdminProvider };