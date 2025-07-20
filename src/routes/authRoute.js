const { AuthController } = require("../apps/controllers/index");
const express = require("express");
const router = express.Router();

router.get("/signin", AuthController.renderLogin);
router.get("/signup", AuthController.renderSignUp);
router.post("/signin", AuthController.signIn);
router.post("/signup", AuthController.signUp);
router.get("/signout", AuthController.signOut);
router.get("/forgot-password", AuthController.forgotPassword);

module.exports = router;
