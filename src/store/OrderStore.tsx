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

export interface Order {
  _id: string;
  status: string;
  paymentMethod: string;
  products: { productId: string; quantity: number; }[];
  totalAmount: number;
  userInfo: { userId: string | undefined; orderNote: string; phoneNumber: string | undefined; }; address: string | undefined;
  createdAt: string;
  updatedAt: string;
}

class OrderStore {
  orderList: Order[] = [];
  userOrders: any;
  statusCounts: any;
  customStatusOptions: { value: string; label: string }[] = [   
    { value: "In Process", label: "In Process" },
    { value: "Ready", label: "Ready" },
    { value: "Delayed", label: "Delayed" },
    { value: "On Way", label: "On Way" },
    { value: "Delivered", label: "Delivered" },
  ];

  constructor() {
    makeAutoObservable(this);
    this.loadOrders();
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

  async getOrdersByUserId(userId: string | undefined) {
    console.log(userId)
    try {
      const response = await axios.get(
        `http://localhost:3001/api/orders/userInfo/${userId}`,
      );
      console.log(response.data)
      if (response.status === 200) {
        this.userOrders = response.data.orders; // Store user-specific orders
      }
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
    }
  }
  // Update order status function (using axios)
  async updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/orders/${orderId}/update-status`,
        { status: newStatus }
      );

      if (response.status === 200) {
        const updatedOrder = response.data.updatedOrder;
        const orderIndex = this.orderList.findIndex((o) => o._id === orderId);

        if (orderIndex !== -1) {
          this.orderList[orderIndex].status = updatedOrder.status;
        }

        console.log("Order status updated successfully:", updatedOrder.status);
      } else {
        console.error("Error updating order status:", response.data.error);
      }
    } catch (error) {
      console.error("Error while updating order status:", error);
    }
  }
  getStatusOptions() {
    return this.customStatusOptions;
  }
  async placeOrder(orderDetails: Order) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/orders",
        orderDetails,
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


