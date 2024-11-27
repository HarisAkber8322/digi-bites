import axios from "axios";
import { makeAutoObservable } from "mobx";
import React from "react";
import { productStore } from "./ProductStore";
import { userStore } from "./UserStore";

export interface Cart {
  items: CartItem[];
  total: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  _id: string;
}

export interface CartItem {
  price: number;
  product_id: string;
  quantity: number;
}

export interface AddOn {
  name: string;
  price: number;
  value: boolean;
}

class CartStore {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  productStore = productStore;
  cart: Cart = {
    items: [],
    total: 0,
    created_at: "",
    updated_at: "",
    user_id: "",
    _id: "",
  };

  constructor() {
    makeAutoObservable(this);
    this.loadCart();
  }
  setCartItems(items: CartItem[]) {
    // console.log(items);
    this.cartItems = items;
  }
  // Load cart from the server
  loadCart = async () => {
    try {
      await userStore.checkLoginState();
      const userId = userStore.user?.id;
      if (!userId) {
        console.error("User ID is missing. Cannot load cart.");
        return;  // Or handle this error appropriately
      }

      console.log("userId: ", userId);
      const response = await axios.get(`http://localhost:3001/api/cart/${userId}`);
      console.log("res: ", response.data);

      const cart = response.data.cart;

      if (cart) {
        this.cart = cart;

        this.setCartItems(cart.items);
        this.calculateTotal();
      } else {
        console.error(
          "Cart is null or has an unexpected structure:",
          response.data,
        );
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Add item to the cart
  addItemToCart = async (item: CartItem, userId: string | undefined) => {
    try {
      if (!item.product_id || !userId) return;
      console.log(item, userId);

      const response = await axios.post(
        `http://localhost:3001/api/cart/${userId}/add`,
        item,
      );
      if (response.status === 200) {
        const cart = response.data.cart;
        if (cart) {
          this.cart = cart;
          this.setCartItems(cart.items);
          this.calculateTotal();
        } else {
          console.error(
            "Cart is null or has an unexpected structure:",
            response.data,
          );
        }
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove item from the cart
  // Remove item from the cart
  removeItemFromCart = async (
    productId: string,
    userId: string | undefined,
  ) => {
    if (!userId) {
      console.error("User ID is undefined. Cannot remove item from cart.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/cart/${userId}/remove`,
        { productId },
      );
      if (response.status === 200) {
        const cart = response.data.cart;
        if (cart) {
          this.cart = cart;
          this.setCartItems(cart.items);
          this.calculateTotal();
        } else {
          console.error(
            "Cart is null or has an unexpected structure:",
            response.data,
          );
        }
      } else {
        console.error(
          "Failed to remove item from cart:",
          response.status,
          response.data,
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Clear all items in the cart
  clearCart = async (userId: string | undefined) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/cart/${userId}`,
      );
      if (response.status === 200) {
        this.setCartItems([]);
        this.totalPrice = 0;
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  updateAddOns = async (
    productId: string,
    addOns: AddOn[],
    userId: string | undefined,
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/cart/${userId}/update-addons`,
        { productId, addOns },
      );
      if (response.status === 200) {
        const cart = response.data.cart;
        if (cart) {
          this.cart = cart;
          this.setCartItems(cart.items);
          this.calculateTotal();
        } else {
          console.error(
            "Cart is null or has an unexpected structure:",
            response.data,
          );
        }
      }
    } catch (error) {
      console.error("Error updating add-ons:", error);
    }
  };

  // Calculate total price of items in the cart
  calculateTotal = async () => {
    let total = 0;

    for (const item of this.cartItems) {
      // Fetch product details
      console.log(item.product_id);
      const product = await this.productStore.fetchProductById(item.product_id);

      if (product) {
        const productPrice = product.price;
        const quantity = item.quantity;

        // Calculate add-ons total
        // const addOnsTotal = item.addOns
        //   .filter(addOn => addOn.value)
        //   .reduce((sum, addOn) => sum + addOn.price, 0);

        // Calculate total for this item
        const itemTotal = productPrice * quantity; //+  addOnsTotal|0;
        total += itemTotal;
      }
    }

    this.totalPrice = total;
  };

  // Place an order using the order store
  placeOrder = async (
    orderStore: any,
    paymentMethod: string,
    orderNote: string,
    userId: string | undefined,
  ) => {
    try {
      const order = await orderStore.placeOrder(
        userId!,
        paymentMethod,
        orderNote,
        this.totalPrice,
      );
      if (order) {
        await this.clearCart(userId); // Clear cart after placing order
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  // Update quantity of a specific item in the cart
  updateQuantity = async (
    productId: string,
    delta: number,
    userId: string | undefined,
  ) => {
    const item = this.cartItems.find((item) => item.product_id === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta); // Ensure quantity is at least 1
      this.calculateTotal(); // Recalculate total price
      try {
        const response = await axios.post(
          `http://localhost:3001/api/cart/${userId}/update-quantity`,
          { productId, quantity: item.quantity },
        );
        if (response.status === 200) {
          const cart = response.data.cart;
          if (cart) {
            this.cart = cart;
            this.setCartItems(cart.items);
            this.calculateTotal();
          } else {
            console.error(
              "Cart is null or has an unexpected structure:",
              response.data,
            );
          }
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };
}

// Create and export CartStore instance
export const cartStore = new CartStore();
const CartStoreContext = React.createContext(cartStore);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartStoreContext.Provider value={cartStore}>
      {children}
    </CartStoreContext.Provider>
  );
};

export default CartStoreContext;
export { CartProvider };
