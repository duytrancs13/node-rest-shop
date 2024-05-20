const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const TestPaymentController = require("../controller/test-payment");
const MyCourseController = require("../controller/my-course");
const PaymentController = require("../controller/payment");

router.post(
  "/",
  auth,
  TestPaymentController.requestPayment,
  MyCourseController.addToMyCourse
);

module.exports = router;
