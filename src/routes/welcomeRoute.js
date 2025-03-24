const express = require("express");
const router = express.Router();
const WelcomeController = require("../apps/controllers/WelcomController");

router.get("/", WelcomeController.index);

module.exports = router; 