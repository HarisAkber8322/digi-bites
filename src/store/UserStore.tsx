"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "./ProductStore";

export interface User {
  id: string | undefined;
  fname: string;
  lname: string;
  email: string;
  password: string;
  contact_no?: string;
  type?: string;
  social_links?: { name: string; link: string }[];
  favoriteProductsIds: string[];
}

// export interface Product {
//   _id: string;
//   name: string;
//   average_rating: number;
// }

class UserStore {
  user: User | null = null;
  userList: User[] = [];
  isLoggedin = false;
  router: ReturnType<typeof useRouter> | null = null;
  favoriteProductIds: Set<string> = new Set();
  currentUser: any;

  constructor() {
    makeAutoObservable(this);
    // this.loadUsers();
    this.checkLoginState();
    this.setUser(this.user);
    this.fetchFavoriteProducts(this.user?.id);
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedin = value;
  }
  setUser(user: User | null) {
    this.user = user;
  }
  setUsers(userList: User[]) {
    this.userList = userList;
  }
  // async loadUsers() {
  //   try {
  //     const response = await axios.get("http://localhost:3001/api/users");
  //     this.setUsers(response.data.users);
  //   } catch (error) {
  //     console.error("Error loading users:", error);
  //   }
  // }

  async getUserById(id: string | undefined) {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching User By id:", error);
    }
  }

  handleLogin = async (user: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        user,
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        Cookies.set("token", token, { expires: 7 });
        this.setIsLoggedIn(true);
        this.setUser(user);
        this.changePage("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      this.setIsLoggedIn(false);
    }
  };

  checkLoginState = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/auth/loggedinUser",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (response.status === 200) {
            this.setIsLoggedIn(true);
            this.setUser(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          this.logout();
        }
      } else {
        this.setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login state:", error);
      this.setIsLoggedIn(false);
    }
    // console.log(this.user)
  };

  async handleSignUp(user: User) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        user,
      );
      if (response.status === 201) {
        this.setIsLoggedIn(true);
        this.changePage("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  logout() {
    Cookies.remove("token");
    this.user = null;
    this.setIsLoggedIn(false);
    this.changePage("/login");
  }

  changePage(uri: string) {
    this.router?.push(uri);
  }
  setFavoriteProductIds(favoriteProductIds: Set<string>) {
    this.favoriteProductIds = favoriteProductIds;
  }
  fetchFavoriteProducts = async (userId: string | undefined) => {
    if (this.isLoggedin == true) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}/favorites`,
        );
        if (response.status === 200) {
          const favProductIds: string[] = response.data; // Assuming response.data is an array of IDs
          this.setFavoriteProductIds(new Set(favProductIds));
        }
      } catch (error) {
        console.error("Error fetching favorite products:", error);
        this.setFavoriteProductIds(new Set());
      }
    }
  };
  async toggleFavorite(productId: string, userId: string | undefined) {
    if (!userId) return;

    try {
      // Send request to add/remove favorite product ID in the user’s favoriteproductIds array
      await axios.post(
        `http://localhost:3001/api/users/${userId}/favoritestoggle`,
        { productId },
      );

      // Update local favorite product IDs
      if (this.favoriteProductIds.has(productId)) {
        this.favoriteProductIds.delete(productId);
      } else {
        this.favoriteProductIds.add(productId);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  isFavorite(productId: string): boolean {
    return this.favoriteProductIds.has(productId);
  }
}

export const userStore = new UserStore();
const UserStoreContext = React.createContext(userStore);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
