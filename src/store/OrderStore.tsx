// OrderStore.ts
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
  status: string;
  paymentMethod: string;
  products: Product[];
  totalAmount: number;
  userInfo: UserInfo;
  createdAt: string;
  updatedAt: string;
  addOns: AddOn[];
}

// Define CartStore type
type CartStoreType = typeof cartStore;

class OrderStore {
  orderList: Orders[] = [];
  userOrders: any;
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
  async triggerStatusUpdate(orderId?: string) {
    try {
      const response = await axios.put('http://localhost:3001/api/orders/update-status');
      if (response.status === 200) {
        await this.loadOrders(); // Refresh the orders list after update
      }
    } catch (error) {
      console.error("Failed to update order statuses:", error);
    }
  }
  async placeOrder(userId: string | undefined, paymentMethod: string, orderNote: string, totalAmount: number) {
    try {
      console.log("Placing order for user ID:", userId); // Debugging line
      if (!userId) throw new Error("User ID is required");
  
      const products = this.cartStore.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
       
      }));
  
      const totalAmount = this.cartStore.totalPrice;
  
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
        addOns: this.cartStore.addOns,
      };
  
      const response = await axios.post("http://localhost:3001/api/orders", orderData);
  
      if (response.status === 201) {
        this.orderList.push(response.data);
        this.cartStore.clearCart(); // Clear the cart after placing the order
        return response.data;
      }
    } catch (error) {
      console.error("Error placing order:", error);
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
