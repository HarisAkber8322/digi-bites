// OrderStore.ts
"use client";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import React from "react";
import { AddOn, CartItem } from "./CartStore"; // Import the cartStore instance

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
  status: string;
  paymentMethod: string;
  products: Product[];
  totalAmount: number;
  userInfo: UserInfo;
  createdAt: string;
  updatedAt: string;
  addOns: AddOn[];
}


class OrderStore {
  orderList: Orders[] = [];
  userOrders: any;
  statusCounts: any;
  statusProgression: Record<string, string> = {
    Pending: "Confirmed",
    Confirmed: "Processing",
    Processing: "Readyforpickup",
    Readyforpickup: "Completed",
    Completed: "", // No next status
  };

  constructor() {
    makeAutoObservable(this);
    this.loadOrders();
    this.startStatusUpdateInterval();
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
      const response = await axios.get(
        `http://localhost:3001/api/orders/${orderId}`,
      );
      if (response.status === 200) {
        return response.data; // Returns the specific order
      }
    } catch (error) {
      console.error("Error fetching order by ID:", error);
    }
  }

  async getOrdersByUserId(userId: string) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/orders/userInfo/${userId}`,
      );
      if (response.status === 200) {
        this.userOrders = response.data.orders; // Store user-specific orders
      }
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
    }
  }

  async placeOrder(
    cartItems: CartItem[],
    userId: string | undefined,
    paymentMethod: string,
    orderNote: string,
    totalPrice: number,
  ) {
    try {
      if (!userId) throw new Error("User ID is required");

      const products = cartItems.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
      }));

      const totalAmount = totalPrice;

      const userInfo = {
        userId,
        orderNote,
      };

      const orderData = {
        status: "Pending",
        paymentMethod,
        products,
        totalAmount,
        userInfo,
      };

      const response = await axios.post(
        "http://localhost:3001/api/orders",
        orderData,
      );

      if (response.status === 201) {
        this.orderList.push(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
  async updateStatus(orderId: string) {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/orders/${orderId}/update-status`,
      );
      const updatedOrder = response.data;

      const index = this.orderList.findIndex((order) => order._id === orderId);
      if (index !== -1) {
        this.orderList[index] = updatedOrder; // Replace with the updated order
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }
  startStatusUpdateInterval() {
    setInterval(
      () => {
        this.orderList.forEach((order) => {
          setTimeout(
            () => {
              const nextStatus = this.statusProgression[order.status];
              if (nextStatus) {
                this.updateStatus(order._id);
              }
            },
            1 * 60 * 1000,
          );
        });
      },
      5 * 60 * 1000,
    ); // 5 minutes in milliseconds
  }
}


export const orderStore = new OrderStore();
const OrderStoreContext = React.createContext(orderStore);

const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <OrderStoreContext.Provider value={orderStore}>
      {children}
    </OrderStoreContext.Provider>
  );
};

export default OrderStoreContext;
export { OrderProvider };


