import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import './cartPage.scss';
import apiRequest from "../../lib/apiRequest"; 
import Card from '../../components/card/Card'; 

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleCheckout = async () => {
    const stripe = await loadStripe("pk_test_51PZq4jI807HAPOrlegVd1DMMVpcjpPIxN7Ov710DUwWBvBFaKCJ18KS9G1BWTt7s8fp5dFxwHBvAJii70QVjcbmn00rRTPv1oW");
    const body = {
      products: cartItems, 
    };
    console.log(body); 
    const headers = {
      "Content-Type": "application/json",
    };
    
    try {
      // Send POST request to create checkout session
      const response = await apiRequest.post("/payment/create-checkout-session", body, { headers });
      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const removeFromCart = (itemId) => {
    // Filter out the item with the matching itemId
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Update state to reflect the removal
    setCartItems(updatedCart);
  };

  return (
    <div className="cartPage">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cartItems">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout} className="checkoutButton">
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default CartPage;
