const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const MyCourseController = require("../controller/my-course");

router.get("/", auth, MyCourseController.getMyCourse);

module.exports = router;
