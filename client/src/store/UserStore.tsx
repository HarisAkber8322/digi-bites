"use client";
import { makeAutoObservable } from "mobx";
import React from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios"; // Assuming axios instance is set up in `src/api/axios.ts`

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

  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
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
      const response = await api.get("/users");
      this.setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error loading users:", error);
    }
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
  }, [router, userStore.user]);

  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreContext;
export { UserProvider };
