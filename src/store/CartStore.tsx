// CartStore.ts
"use client";
import { makeAutoObservable } from "mobx";
import React from "react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

class CartStore {
  cartItems: CartItem[] = [];
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addItemToCart(item: CartItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.calculateTotal();
  }

  removeItemFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.total = 0;
  }
}

export const cartStore = new CartStore();
const CartStoreContext = React.createContext(cartStore);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartStoreContext.Provider value={cartStore}>
      {children}
    </CartStoreContext.Provider>
  );
};

export default CartStoreContext;
export { CartProvider };
