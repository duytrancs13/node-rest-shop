const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const PaymentController = require("../controller/payment");

router.post("/", PaymentController.requestPayment);

module.exports = router;
