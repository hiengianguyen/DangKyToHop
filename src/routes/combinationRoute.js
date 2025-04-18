const CombinationController = require("../apps/controllers/CombinationController");
const express = require("express");
const router = express.Router();

router.get("/submit", CombinationController.submit);
router.get("/:id", CombinationController.index);

module.exports = router;
