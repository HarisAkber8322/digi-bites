"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

interface Users {
  fname: string;
  lname: string;
  email: string;
  password: string;
  contact_no: string;
  type: string;
  social_links: [{ name: string; link: string }];
}

interface Orders {
  items: [
    {
      name: string,
      price: number,
      quantity: number,
      funOption?: any,
      addOns?: any
    }
  ],
  total: number;
  status: string;
}

interface Product {
  name: string;
  price: number;
  image: string;
  rating: number;
}

class AppStore {
  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
    this.loadProducts();
  }

  user = {
    email: "admin@digibites.com",
    password: "tacos",
  };
  userList: Users[] = [];
  cartCount = 0;
  isLoggedin = false;
  router: any;
  orderList: Orders[] = [];
  products: Product[] = [];

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

  async loadOrders() {
    try {
      const response = await axios.get("http://localhost:3001/api/orders");
      this.orderList = response.data.orders;
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }

  async loadProducts() {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      this.products = response.data.products;
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  handleLogin = async (user: { email: string; password: string }) => {
    if (user.email === "admin@digibites.com" && user.password === "tacos") {
      this.setIsLoggedIn(true);
      this.changePage("/");
    }
  };

  handleSignUp = async (user: { email: string; password: string }) => {
    // Add your sign-up logic here
  };

  setCartCount(value: number) {
    this.cartCount = value;
  }

  logout(value: boolean) {
    this.setIsLoggedIn(value);
  }
  handleForgotPassword(email: string) {
    console.log(email)
  }
  changePage = (uri: string) => {
    this.router?.push(uri);
    console.log("Router:", this.router);
  };
}

const mainStore = new AppStore();
const MainStoreContext = React.createContext(mainStore);

const MainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  React.useEffect(() => {
    mainStore.router = router; // Initialize router after component mounts
  }, [router]);

  return (
    <MainStoreContext.Provider value={mainStore}>
      {children}
    </MainStoreContext.Provider>
  );
};

export default MainStoreContext;
export { MainProvider };
