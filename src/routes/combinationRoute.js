const express = require("express");
const router = express.Router();
const CombinationController = require("../apps/controllers/CombinationController");

router.get("/", CombinationController.index);

module.exports = router;