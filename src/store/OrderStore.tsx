"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";
import { cartStore } from "./CartStore"; // Import the cartStore instance

export interface AddOn {
  name: string;
  price: number;
  value: boolean;
}

export interface Product {
  productId: string;
  quantity: number;
  addOns: AddOn[];
}

export interface UserInfo {
  userId: string;
  orderNote: string;
}

export interface Orders {
  _id: string;
  userId: string;
  status: string;
  paymentMethod: string;
  products: Product[];
  totalAmount: number;
  userInfo: UserInfo;
  createdAt: string;
  updatedAt: string;
}

// Define CartStore type
type CartStoreType = typeof cartStore;

class OrderStore {
  orderList: Orders[] = [];
  constructor(private cartStore: CartStoreType) { // Use the CartStoreType here
    makeAutoObservable(this);
  }
  async loadOrders() {
    try {
      const response = await axios.get("http://localhost:3001/api/orders");
      this.orderList = response.data.orders;
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }
  async getOrderById(orderId: string) {
    try {
      const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`);
      if (response.status === 200) {
        return response.data; // Returns the specific order
      }
    } catch (error) {
      console.error("Error fetching order by ID:", error);
    }
  }

}

const orderStore = new OrderStore(cartStore); // Use the cartStore instance
const OrderStoreContext = React.createContext(orderStore);

const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OrderStoreContext.Provider value={orderStore}>
      {children}
    </OrderStoreContext.Provider>
  );
};

export default OrderStoreContext;
export { OrderProvider };
