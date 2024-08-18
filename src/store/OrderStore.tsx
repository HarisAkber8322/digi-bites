// OrderStore.ts
"use client";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import React from "react";
import { AddOn, CartItem, cartStore } from "./CartStore"; // Import the cartStore instance


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

  constructor() {
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

  async getOrdersByUserId(userId: string) {
    try {
      const response = await axios.get(`http://localhost:3001/api/orders/userInfo/${userId}`);
      if (response.status === 200) {
        this.userOrders = response.data.orders; // Store user-specific orders
      }
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
    }
  }

  async triggerStatusUpdate() {
    try {
      const response = await axios.put('http://localhost:3001/api/orders/update-status');
      if (response.status === 200) {
        await this.loadOrders(); // Refresh the orders list after update
      }
    } catch (error) {
      console.error("Failed to update order statuses:", error);
    }
  }

  // Example of updateStatus function in OrderStore
  async updateStatus(orderId: string) {
    try {
      // Update the status on the server
      const response = await axios.put(`http://localhost:3001/api/orders/${orderId}/update-status`);
      const updatedOrder = response.data;

      // Update the order in the local store
      const index = this.orderList.findIndex(order => order._id === orderId);
      if (index !== -1) {
        this.orderList[index] = updatedOrder; // Replace with the updated order
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }
  // async fetchStatusCounts() {
  //     try {
  //       // Fetch status counts from the server
  //       const response = await axios.get('http://localhost:3001/api/orders/status-counts');
  //       const statusCounts = response.data;

  //       // Update the status counts in the local store
  //       runInAction(() => {
  //         this.statusCounts = statusCounts.reduce((acc: { [key: string]: number }, item: { _id: string, count: number }) => {
  //           acc[item._id] = item.count;
  //           return acc;
  //         }, {});
  //       });
  //     } catch (error) {
  //       console.error("Failed to fetch status counts:", error);
  //     }
  //   }



  async placeOrder(cartItems: CartItem[], userId: string | undefined, paymentMethod: string, orderNote: string, totalPrice: number) {
    try {
      console.log("Placing order for user ID:", userId); // Debugging line
      if (!userId) throw new Error("User ID is required");

      const products = cartItems.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        // addOns: item.addOns, // Ensure add-ons are included in the order
      }));

      const totalAmount = totalPrice;

      const userInfo = {
        userId, // Use the provided userId
        orderNote,
      };

      const orderData = {
        status: "pending", // Default status
        paymentMethod,
        products,
        totalAmount,
        userInfo,
      };

      const response = await axios.post("http://localhost:3001/api/orders", orderData);

      if (response.status === 201) {
        this.orderList.push(response.data);
        // this.cartStore.clearCart(); // Clear the cart after placing the order
        return response.data;
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }
}


export const orderStore = new OrderStore();
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
