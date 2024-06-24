// // store.js
// "use client";
// import { makeAutoObservable } from "mobx";
// import axios from "axios";
// import React from "react";
// // import { useRouter } from "next/navigation";
// interface Users {
//   // _id: string;
//   fname: string;
//   lname: string;
//   email: string;
//   password: string;
//   contact_no: string;
//   type: string;
//   social_links: [{ name: string, link: string }]
// }
// class AppStore {
//   constructor() {
//     makeAutoObservable(this);
//     this.loadUsers();
//   }
//   // router = useRouter();
//   user = {
//     email: "admin@digibites.com",
//     password: "tacos",
//   };
//   userList: Users[] = [];
//   cartCount = 0;
//   isLoggedin = false;
//   setIsLoggedIn = (value: boolean) => {
//     this.isLoggedin = value ? value : false;
//   };
//   async loadUsers() {
//     try {
//       const response = await axios.get("http://localhost:3001/api/users");
//       this.userList = response.data.users;
//     } catch (error) {
//       console.error("Error loading users:", error);
//     }
//   }
//   handleLogin = (user: { email: string; password: string }) => {
//     console.log(user);
//     if (user.email === "admin@digibites.com" && user.password === "tacos") {
//       this.setIsLoggedIn(true);
//     }
//   };
//   setCartCount(value: number) {
//     this.cartCount = value;
//   }
//   logout(value: boolean) {
//     this.setIsLoggedIn(value);
//   }

//   // get users() {
//   //   return this.userList;
//   // }
// }

// const MainStore = new AppStore();
// const MainStoreContext = React.createContext(MainStore);
// export default MainStoreContext;


// store.js
"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";
// import { useRouter } from "next/navigation";
interface Users {
  // _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  contact_no: string;
  type: string;
  social_links: [{ name: string, link: string }]
}

class AppStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }
  
  // router = useRouter();
  user = {
    email: "admin@digibites.com",
    password: "tacos",
  };
  userList: Users[] = [];
  cartCount = 0;
  isLoggedin = false;
  
  setIsLoggedIn = (value: boolean) => {
    this.isLoggedin = value ? value : false;
  };
  
  async loadUsers() {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      this.userList = response.data.users;
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }
  
  handleLogin = (user: { email: string; password: string }) => {
    console.log(user);
    if (user.email === "admin@digibites.com" && user.password === "tacos") {
      this.setIsLoggedIn(true);
    }
  };

  handleSignUp = async (user: { email: string; password: string }) => {
    // Logic for handling sign up
    try {
      const response = await axios.post("http://localhost:3001/api/signup", user);
      console.log("User signed up:", response.data);
      // Handle successful sign up, e.g., redirecting the user or showing a success message
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  handleForgotPassword = async (email: string) => {
    // Logic for handling forgot password
    try {
      const response = await axios.post("http://localhost:3001/api/forgot-password", { email });
      console.log("Password reset link sent to:", email);
      // Handle successful password reset request, e.g., showing a success message
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  setCartCount(value: number) {
    this.cartCount = value;
  }
  
  logout(value: boolean) {
    this.setIsLoggedIn(value);
  }

  // get users() {
  //   return this.userList;
  // }
}

const MainStore = new AppStore();
const MainStoreContext = React.createContext(MainStore);
export default MainStoreContext;
