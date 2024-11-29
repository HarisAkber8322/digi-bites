"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/navigation";

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

class UserStore {
  user: User | null = null;
  userList: User[] = [];
  isLoggedin = false;
  router: ReturnType<typeof useRouter> | null = null;
  favoriteProductIds: Set<string> = new Set();
  currentUser: any;

  constructor() {
    makeAutoObservable(this);
    this.checkLoginState();
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
  async loadUsers() {
    try {
      const response = await axios.get("http://localhost:3001/api/users");
      this.setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

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
            this.setUser(response.data.user);
            this.fetchFavoriteProducts(response.data.user.id);
            this.setIsLoggedIn(true);
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
  async updateUserById(userId: string | undefined, updateData: User | null) {
    if (!userId) {
      console.error("User ID is required for updating user.");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:3001/api/users/${userId}`, updateData);
  
      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        if (this.user?.id === userId) {
          this.setUser({ ...this.user, ...updateData });
        }
      } else {
        console.error("Failed to update user:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
          const favProductIds: string[] = response.data; 
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
      await axios.post(
        `http://localhost:3001/api/users/${userId}/favoritestoggle`,
        { productId },
      );
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
    userStore.router = router;
    userStore.checkLoginState(); 

  }, [router, userStore.user]);

  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreContext;
export { UserProvider };
