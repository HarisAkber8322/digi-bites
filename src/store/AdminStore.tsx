import { makeAutoObservable } from "mobx";
import axios from "axios";
import Cookies from "js-cookie";

class AdminStore {
  isLoggedIn = false;
  admin = null;

  constructor() {
    makeAutoObservable(this);
    this.checkLoginState();
  }

  async handleLogin(admin: { email: string; password: string; }) { 
    console.log("Admin credentials sent to backend:", admin);
    try {
      const response = await axios.post("/api/auth/adminLogin", admin);

      if (response.status === 200) {
        const { token, admin: adminData } = response.data;
        Cookies.set("token", token, { expires: 7 });
        this.setIsLoggedIn(true);
        this.setAdmin(adminData);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      this.setIsLoggedIn(false);
      return false;
    }
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  setAdmin(admin: null) {
    this.admin = admin;
  }

  checkLoginState() {
    const token = Cookies.get("token");
    if (token) {
      this.setIsLoggedIn(true);
    } else {
      this.setIsLoggedIn(false);
    }
  }

  logout() {
    Cookies.remove("token");
    this.setIsLoggedIn(false);
    this.setAdmin(null);
  }
}

export const adminStore = new AdminStore();
