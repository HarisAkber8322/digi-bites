// store.js
"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";
class AppStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }

  user = {};
  userList = [];

  async loadUsers() {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      this.userList = response.data.users;
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }
    // get users() {
    //   return this.userList;
    // }
}

const MainStore = new AppStore();
const MainStoreContext = React.createContext(MainStore);
export default MainStoreContext;
