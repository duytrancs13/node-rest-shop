const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const ProductController = require("../controller/product");

router.get("/", ProductController.getProducts);

router.post("/", checkAuth, ProductController.createProduct);

router.get("/:productId", checkAuth, ProductController.getProductById);

router.patch("/:productId", checkAuth, ProductController.updateProduct);

router.delete("/:productId", checkAuth, ProductController.deleteProduct);

module.exports = router;
