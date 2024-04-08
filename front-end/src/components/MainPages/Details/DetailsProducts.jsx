import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

//INERNAL IMPORT
import "./DetailProduct.css";

const DetailsProducts = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailsProduct, setDetailsProduct] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailsProduct(product);
        }
      });
    }
  }, [params, products]);

  console.log(detailsProduct);

  if (detailsProduct.length === 0) return null;
  return (
    // <div className="details">
    //   <img src={detailsProduct.images.url} alt="" />
    // </div>

    <section class="box">
      <div class="content">
        <div class="left">
          <div class="product_img">
            <img
              src={detailsProduct.images.url}
              alt="ProductImage"
              width={250}
              height={250}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div class="product_details">
            <h4 class="title">{detailsProduct.title}</h4>
            <p class="discription">{detailsProduct.content}</p>
            <p class="price">
              ₹{detailsProduct.price}{" "}
              <span class="price_original">₹{detailsProduct.price + 200}</span>{" "}
              {/* <span class="offer"> 79% OFF</span> */}
            </p>
            <p class="other">inclusive of all taxes</p>
          </div>
        </div>

        <div class="right">
          <div class="product_description">
            <h4>PRODUCT DESCRIPTION</h4>
            <p>{detailsProduct.description}</p>
            <p>
              <span class="highlight">Country of Origin -</span>
              India
            </p>
            <p>
              <span class="highlight">Category Of this Item -</span>
              {detailsProduct.category}
            </p>

            <p>
              <span class="highlight">Sold By -</span> CodeChainWizard Private
              Limited
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsProducts;
