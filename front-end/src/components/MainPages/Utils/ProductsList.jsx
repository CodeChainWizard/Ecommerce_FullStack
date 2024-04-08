import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { useContext } from "react";

//INTRTNAL IMPORT
import "./ProductList.css";
import { GlobalState } from "../../../GlobalState";

const ProductList = ({ product, isAdmin }) => {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  return (
    <div className="card_components">
      <div className="card">
        <div className="imgBx">
          <img
            src={product.images.url}
            alt=""
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="contextBx">
          <h3>{product.title}</h3>
          <h2 className="price">₹{product.price}</h2>
          <p style={{ color: "white", fontSize: "12px" }}>{product.content}</p>

          <div style={{ display: "flex" }}>
            {isAdmin ? (
              <>
                <Link id="btn_buy" to={`#!`}>
                  Delete
                </Link>
                <Link id="btn_view" to={`detail/${product._id}`}>
                  Edit
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"#!"}
                  className="buy"
                  onClick={() => addCart(product)}
                >
                  Buy now
                </Link>
                <Link to={`details/${product._id}`} className="buy">
                  View
                </Link>
              </>
            )}
          </div>

          {/* ------------- */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
