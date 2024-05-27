const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const CartController = require("../controller/cart");
const RequestPaymentController = require("../controller/request-payment");

router.post(
  "/",
  auth,
  CartController.verifyCart,
  RequestPaymentController.requestPayment
);

module.exports = router;
