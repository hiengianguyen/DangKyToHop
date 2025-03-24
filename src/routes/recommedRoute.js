const express = require("express");
const router = express.Router();
const RecommedController = require("../apps/controllers/RecommedController");

router.get("/", RecommedController.index);

module.exports = router;