const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const CurriculumController = require("../controller/curriculum");
const verifyMyCourse = require("../utils/verify-my-course");

router.get(
  "/:courseId",
  auth,
  verifyMyCourse,
  CurriculumController.getCurriculum
);

module.exports = router;
