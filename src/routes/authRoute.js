const AuthController = require("../apps/controllers/AuthController");
const express = require("express");
const router = express.Router();

router.post("/signin", AuthController.signIn);
router.post("/signup", AuthController.signUp);
router.get("/signout", AuthController.signOut);

module.exports = router;
