const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const RequestPaymentController = require("../controller/request-payment");
const MyCourseController = require("../controller/my-course");

router.post(
  "/",
  auth,
  RequestPaymentController.resultPayment,
  MyCourseController.addToMyCourse

);

module.exports = router;
