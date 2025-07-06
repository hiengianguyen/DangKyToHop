const CombinationController = require("../apps/controllers/CombinationController");
const express = require("express");
const router = express.Router();

router.post("/submited", CombinationController.submited);
router.post("/save", CombinationController.saveDoc);
router.post("/unsave", CombinationController.unsaveDoc);
router.get("/submitted-chart", CombinationController.chart);
router.get("/table", CombinationController.table);
router.post("/update/:id", CombinationController.updateCombination);
router.get("/submited-list", CombinationController.submitedList);
router.get("/submited-list/saved", CombinationController.savedSubmitted);
router.get("/submit-combination", CombinationController.submitCombination);
router.get("/delete/submited-combination/:id", CombinationController.delete);
router.get("/submited-detail/:userId", CombinationController.submitedDetail);

module.exports = router;
