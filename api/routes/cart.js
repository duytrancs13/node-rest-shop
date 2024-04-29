const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const CartController = require("../controller/cart");

router.get("/", auth, CartController.getCart);
router.post("/add-to-cart", auth, CartController.addToCart);
router.post("/remove-to-cart", auth, CartController.removeToCart);

module.exports = router;
