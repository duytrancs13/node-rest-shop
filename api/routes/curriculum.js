const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const CurriculumController = require("../controller/curriculum");

router.get("/:courseId", auth, CurriculumController.getCurriculum);

module.exports = router;
