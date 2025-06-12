const CombinationController = require("../apps/controllers/CombinationController");
const express = require("express");
// Multer config
const router = express.Router();

router.post("/submited", CombinationController.submited);
router.get("/submited-list", CombinationController.submitedList);
router.get("/submit-combination", CombinationController.submitCombination);
router.get("/submited-detail", CombinationController.submitedDetail);
router.get("/delete/submited-combination/:id", CombinationController.delete);
router.get("/submited-detail/:id", CombinationController.submitedDetail);

module.exports = router;
