const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const UserController = require("../controller/user");

router.get("/get-user-info", auth, UserController.getUserInfo);
router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);
router.delete("/logout", UserController.logout);
router.post("/verify-email", UserController.verifyEmail);
router.post("/reset-password", UserController.resetPassword);

module.exports = router;
