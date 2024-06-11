// store.js
"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";
// import { useRouter } from "next/navigation";
interface Users {
  fname: string;
  lname: string;
  email: string;
  password: string;
  contact_no: string;
  type: string;
}
class AppStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }
  // router = useRouter();
  user = {
    email: "admin@digibites.com",
    password: "tacos"
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
  handleLogin = (user: { email: string; password: string; }) => {
    console.log(user)
    if (user.email === "admin@digibites.com" && user.password === "tacos") {
      this.setIsLoggedIn(true);
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
