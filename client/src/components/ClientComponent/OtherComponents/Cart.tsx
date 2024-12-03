import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button } from "react-bootstrap";
import CartStoreContext, { CartItem } from "../../../store/CartStore";
import OrderStoreContext from "../../../store/OrderStore";
import UserStoreContext from "../../../store/UserStore";
import ProductStoreContext from "../../../store/ProductStore";
import Image from "next/image";
import { Alert } from "@mui/material";
import Link from "next/link";

const Cart: React.FC = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);
  const cartStore = useContext(CartStoreContext);
  const [messageBox, setMessageBox] = useState(false);
  useEffect(() => {
    setMessageBox(false);
    cartStore.cart.items.forEach(async (item) => {
      await productStore.fetchProductById(item?.product_id);
    });
  }, [cartStore, productStore]);
  console.log(cartStore.cart.items)
  const calculateTotalPrice = () => {
    return cartStore.cart.items.reduce((total, item) => {
      const product = productStore.products.find(
        (p) => p._id === item.product_id,
      );
      const productPrice = product ? product.price : 0;

      return total + productPrice * item.quantity;
    }, 0);
  };
  const totalPrice = calculateTotalPrice();
  const increaseQuantity = (productId: string) => {
    cartStore.updateQuantity(productId, 1, userStore.user?.id);
  };
  const decreaseQuantity = (productId: string) => {
    cartStore.updateQuantity(productId, -1, userStore.user?.id);
  };
  return (
    <div className="w-full md:w-[1180px] m-auto mt-5 pb-10">
      <h2 className="font-bold text-2xl mt-4 mb-5">Cart</h2>
      {cartStore.cart.items.length === 0 ? (
        <Alert variant="outlined" severity="error">
          Your cart is empty.
        </Alert>
      ) : (
        <div>
          {messageBox ? (
            <Alert variant="outlined" severity="success">
              Your Order has been Placed
            </Alert>
          ) : (
            <div className="flex gap-x-6 mt-5">
              <div className="gap-4 flex flex-col w-[60%]">
                {cartStore.cartItems.map((item: CartItem, index: number) => {
                  const product = productStore.products.find(
                    (p) => p._id === item.product_id,
                  );
                  if (!product) {
                    return (
                      <div
                        key={index}
                        className="flex shadow-xl rounded-lg items-center justify-between p-4 h-[100px]"
                      >
                        <p>Loading product details...</p>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      className="bg-white flex shadow-xl rounded-lg items-center justify-between p-4 h-[100px]"
                    >
                      <div className="flex cursor-pointer w-full">
                        <Image
                          className="rounded-md"
                          src={product.image}
                          width={80}
                          height={60}
                          alt={product.name}
                        />
                        <div className="ml-3">
                          <p className="text-lg font-semibold">
                            {product.name} -{" "}
                            <span className="text-sm text-gray-600">
                              {product.price.toFixed(2)} rs
                            </span>
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs pt-2">Quantity:</p>
                            <div className="flex items-center">
                              <Button
                                variant="light"
                                onClick={() =>
                                  decreaseQuantity(item.product_id)
                                }
                              >
                                -
                              </Button>
                              <span className="px-3">{item.quantity}</span>
                              <Button
                                variant="light"
                                onClick={() =>
                                  increaseQuantity(item.product_id)
                                }
                              >
                                +
                              </Button>
                            </div>
                            <div className="text-xs pt-2 ml-4">
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() =>
                          cartStore.removeItemFromCart(
                            item.product_id,
                            userStore.user?.id,
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="w-[40%]">
                <div className="bg-white shadow-xl rounded-lg px-3 pb-6 pt-3">
                  <div className="items-center mb-4 border-b-2 pb-3 border-ExtraLightGray flex justify-center">
                    <span className="font-bold flex items-center text-2xl">
                      Total Cost
                    </span>
                  </div>
                  <div className="items-center p-1 flex justify-between">
                    <span className="font-semibold text-base">Item Price</span>
                    <span className="text-base">
                      {totalPrice.toFixed(2)} rs
                    </span>
                  </div>
                  <div className="items-center p-1 pt-4 border-t-2 mt-5 border-ExtraLightGray flex justify-between">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="text-lg font-semibold">
                      {totalPrice.toFixed(2)} rs
                    </span>
                  </div>
                  <div className="flex justify-center pr-4 pl-4">
                    <Link href={"/checkout"}
                      className="text-white bg-themeYellow w-full font-bold text-lg p-2 flex mt-4 align-middle justify-center rounded-md"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
      }
    </div >
  );
};

export default observer(Cart);
