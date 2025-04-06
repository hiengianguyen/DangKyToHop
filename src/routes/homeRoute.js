const HomeController = require("../apps/controllers/HomeController");
const express = require("express");
const router = express.Router();

router.get("/", HomeController.homePage);

module.exports = router;
