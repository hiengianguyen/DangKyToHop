const CombinationController = require("../apps/controllers/CombinationController");
const express = require("express");
const multer = require("multer");
const pathh = require("path");
// Multer config
const upload = multer({ dest: pathh.join(__dirname, "../uploads") });
const router = express.Router();

router.post("/submited", CombinationController.submited);
router.get("/submited-list", CombinationController.submitedList);
router.get("/submit-combination", CombinationController.submitCombination);
router.get("/submited-list/:id", CombinationController.submitedDetail);
router.get("/:id", CombinationController.detail);

module.exports = router;
