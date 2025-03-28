const WelcomeController = require("../apps/controllers/WelcomeController");
const express = require("express");
const router = express.Router();

router.get("/", WelcomeController.index);

module.exports = router;
