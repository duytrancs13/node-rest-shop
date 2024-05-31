const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const VideoController = require("../controller/video");

router.get("/", VideoController.stream);

module.exports = router;
