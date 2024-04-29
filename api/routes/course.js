const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const CourseController = require("../controller/course");

router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourseById);

module.exports = router;
