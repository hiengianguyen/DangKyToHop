const CombinationController = require("../apps/controllers/CombinationController");
const express = require("express");
const router = express.Router();

router.post("/submited", CombinationController.submited);
router.get("/submit", CombinationController.submit);
router.get("/submited-list", CombinationController.submitedList);
router.get("/:id", CombinationController.index);

module.exports = router;
