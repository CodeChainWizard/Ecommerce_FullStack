import React from "react";
import { Routes, Route } from "react-router-dom";

// INERNAL IMPORTS
import Products from "./Products/Products";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Cart from "./Cart/Cart.jsx";
import DetailsProduct from "./Details/DetailsProducts.jsx";

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details/:id" element={<DetailsProduct />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
