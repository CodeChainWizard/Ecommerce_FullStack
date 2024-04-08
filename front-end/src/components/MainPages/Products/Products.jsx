import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../Utils/ProductsList";

// INTERNAL IMPORT;

const Product = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "fantasy",
          fontSize: "50px",
        }}
      >
        PRODUCT
      </h1>
      <div
        className="products"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridGap: "20px",
          marginLeft: "35px",
        }}
      >
        {products.map((product) => {
          return (
            <ProductList
              key={Math.random()}
              product={product}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
