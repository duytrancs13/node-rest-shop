const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const PaymentMomoController = require("../controller/payment-momo");

router.post("/", auth, PaymentMomoController.requestPayment);

module.exports = router;
