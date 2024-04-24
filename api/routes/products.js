const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const ProductController = require("../controller/product");

router.get("/", ProductController.getProducts);

router.post("/", auth, ProductController.createProduct);

router.get("/:productId", auth, ProductController.getProductById);

router.patch("/:productId", auth, ProductController.updateProduct);

router.delete("/:productId", auth, ProductController.deleteProduct);

module.exports = router;
