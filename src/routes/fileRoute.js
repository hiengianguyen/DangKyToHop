const { FileController } = require("../apps/controllers/index");
const express = require("express");
const router = express.Router();

router.get("/excel/submited-list", FileController.exportSubmitedListExcel);
router.post("/excel/filter-submited-list", FileController.exportSubmitedListFilterExcel);
router.get("/pdf/submited/:userId", FileController.exportSubmitedPDF);

module.exports = router;
