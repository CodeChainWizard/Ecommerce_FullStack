const productCtrl = require("../controllers/productCtrl");

const router = require("express").Router();

router
  .route("/products")
  .get(productCtrl.getProduct)
  .post(productCtrl.createProduct);

router
  .route("/products/:id")
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct);

module.exports = router;
