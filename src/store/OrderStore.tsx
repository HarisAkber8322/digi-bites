"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";
import { cartStore } from "./CartStore"; // Import the cartStore instance

export interface Order {
  _id: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}

// Define CartStore type
type CartStoreType = typeof cartStore;

class OrderStore {
  orders: Order[] = [];

  constructor(private cartStore: CartStoreType) { // Use the CartStoreType here
    makeAutoObservable(this);
  }

  async placeOrder() {
    try {
      const response = await axios.post("/api/orders", {
        items: this.cartStore.cartItems,
        total: this.cartStore.total,
      });
      if (response.status === 201) {
        this.cartStore.clearCart();
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  async loadOrderHistory() {
    try {
      const response = await axios.get("/api/orders");
      this.orders = response.data.orders;
    } catch (error) {
      console.error("Error loading order history:", error);
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
