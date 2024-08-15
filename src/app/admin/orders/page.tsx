// OrdersPage.tsx
"use client";
import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import OrderStoreContext, { Orders } from "@/store/OrderStore";

const OrdersPage: React.FC = () => {
  const orderStore = useContext(OrderStoreContext);
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      await orderStore.loadOrders();
      setOrders(orderStore.orderList);
    };

    fetchOrders();
  }, [orderStore]);

  return (
    <div>
      <h1>Orders List</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h2>Order ID: {order._id}</h2>
              <p>Status: {order.status}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p>User ID: {order.userInfo.userId}</p>
              <p>Order Note: {order.userInfo.orderNote}</p>
              <h3>Products:</h3>
              <ul>
                {order.products.map((product) => (
                  <li key={product.productId}>
                    <p>Product ID: {product.productId}</p>
                    <p>Quantity: {product.quantity}</p>
                    <h4>Add-Ons:</h4>
                    <ul>
                      {product.addOns.map((addOn, index) => (
                        <li key={index}>
                          {addOn.name} - ${addOn.price.toFixed(2)} (Selected: {addOn.value ? "Yes" : "No"})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(OrdersPage);
