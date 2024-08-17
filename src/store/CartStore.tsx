import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import React from 'react';
import { AddOn } from './OrderStore';

export interface CartItem {
  addOns: AddOn[];
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

class CartStore {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  userId: any;
  addOns: any;

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

  updateAddOns(productId: string, addOns: AddOn[]) {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      item.addOns = addOns;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      const addOnsTotal = item.addOns.filter(addOn => addOn.value).reduce((sum, addOn) => sum + addOn.price, 0);
      return sum + (item.price * item.quantity) + addOnsTotal;
    }, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.totalPrice = 0;
  }

  async placeOrder(orderStore: any, paymentMethod: string, orderNote: string) {
    try {
      const order = await orderStore.placeOrder(this.userId!, paymentMethod, orderNote, this.totalPrice);
      if (order) {
        this.clearCart();
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
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
