const express = require("express");
const router = express.Router();
const HomeController = require("../apps/controllers/HomeController");

router.get("/", HomeController.index);

module.exports = router;