"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/navigation";

export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  contact_no?: string;
  type?: string;
  social_links?: [{ name: string; link: string }];
}

class UserStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
    this.checkLoginState();
  }

  user = {
    email: "",
    password: "",
  };
  userList: User[] = [];
  isLoggedin = false;
  router: any;

  setIsLoggedIn = (value: boolean) => {
    this.isLoggedin = value;
  };

  async loadUsers() {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      this.userList = response.data.users;
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  handleLogin = async (user: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", user);
      if (response.status === 200) {
        const { token } = response.data;
        Cookies.set("token", token, { expires: 7 });
        this.setIsLoggedIn(true);
        this.user.email = user.email;
        this.user.password = user.password;
        this.changePage("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      this.setIsLoggedIn(false);
    }
  };

  checkLoginState = () => {
    const token = Cookies.get("token");
    if (token) {
      this.setIsLoggedIn(true);
    } else {
      this.setIsLoggedIn(false);
    }
  };

  handleSignUp = async (user: User) => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/signup", user);
      if (response.status === 201) {
        console.log("User created successfully");
        this.setIsLoggedIn(true);
        this.changePage("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  logout = () => {
    Cookies.remove("token");
    this.setIsLoggedIn(false);
    this.changePage("/login");
  };

  changePage = (uri: string) => {
    this.router?.push(uri);
  };
}

const userStore = new UserStore();
const UserStoreContext = React.createContext(userStore);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  React.useEffect(() => {
    userStore.router = router; // Initialize router after component mounts
  }, [router]);

  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreContext;
export { UserProvider };
