const FileController = require("../apps/controllers/FileController");
const express = require("express");
const router = express.Router();

router.get("/excel/submited-list", FileController.exportSubmitedListExcel);
router.get("/pdf/submited/:userId", FileController.exportSubmitedPDF);

module.exports = router;
