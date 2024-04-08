import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

import "./Cart.css";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );
  return (
    <div>
      {cart.map((product) => (
        <main>
          <img
            class="headset"
            src={product.images.url}
            alt="headphones set with pink color"
            style={{ borderRadius: "20px" }}
          />

          <div id="cart-text">
            <button class="free-shipping">Free shipping</button>
            <h2>{product.title}</h2>
            <h1>R$ {product.price}</h1>
            <h4>
              The offer is valid until April 3, or as long as stock lasts!
            </h4>
            <button class="add-to-cart">Buy Now</button>
            <h3 class="stock">
              <i class="fa-solid fa-circle"></i> 50+ pcs. in stock.
            </h3>
          </div>
        </main>
      ))}
    </div>
  );
};

export default Cart;
