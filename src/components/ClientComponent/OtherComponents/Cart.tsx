import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import CartStoreContext from "@/store/CartStore";
import OrderStoreContext from "@/store/OrderStore";
import UserStoreContext from "@/store/UserStore";
import ProductStoreContext from "@/store/ProductStore";
import { AddOn } from "@/store/OrderStore"; // Import AddOn type

const Cart: React.FC = () => {
  const orderStore = useContext(OrderStoreContext);
  const userStore = useContext(UserStoreContext);
  const productStore = useContext(ProductStoreContext);
  const cartStore = useContext(CartStoreContext);

  const [orderNote, setOrderNote] = useState<string>("");

  if (!orderStore || !userStore || !productStore || !cartStore) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    cartStore.cartItems.forEach(async (item) => {
      await productStore.fetchProductById(item.productId);
    });
  }, [cartStore.cartItems, productStore]);

  const handlePlaceOrder = async () => {
    if (!userStore.isLoggedin || !userStore.user) {
      console.error("User is not logged in");
      return;
    }

    const userId = userStore.user.id;
    const paymentMethod = "credit_card"; // Example payment method

    try {
      await orderStore.placeOrder(userId, paymentMethod, orderNote, cartStore.totalPrice);
      // Optionally clear the cart or redirect the user here
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ListGroup>
        {cartStore.cartItems.map((item) => {
          const product = productStore.products.find(p => p._id === item.productId);

          if (!product) {
            return (
              <ListGroupItem key={item.productId} className="d-flex justify-content-between align-items-center">
                <div>Loading product details...</div>
              </ListGroupItem>
            );
          }

          return (
            <ListGroupItem key={item.productId} className="d-flex justify-content-between align-items-center">
              <div>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded me-2" />
                <strong>{product.name}</strong> x {item.quantity}
                <div>
                  {item.addOns.map((addOn: AddOn) => (
                    addOn.value && <span key={addOn.name}>{addOn.name} </span>
                  ))}
                </div>
              </div>
              <div>${(product.price * item.quantity + item.addOns.filter((a: AddOn) => a.value).reduce((sum: number, addOn: { price: number }) => sum + addOn.price, 0)).toFixed(2)}</div>
              <Button variant="danger" onClick={() => cartStore.removeItemFromCart(item.productId)}>Remove</Button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <div className="mt-3">
        <strong>Total: ${cartStore.totalPrice.toFixed(2)}</strong>
      </div>
      <div className="mt-3">
        <Form.Group controlId="orderNote">
          <Form.Label>Order Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="Enter any special instructions here"
          />
        </Form.Group>
      </div>
      <Button variant="primary" onClick={handlePlaceOrder} className="mt-3">
        Place Order
      </Button>
    </div>
  );
};

export default observer(Cart);
