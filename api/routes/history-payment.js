const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const historyPaymentController = require("../controller/history-payment");

router.get("/", auth, historyPaymentController.getHistoryPayment);

module.exports = router;
