const FileController = require("../apps/controllers/FileController");
const express = require("express");
const router = express.Router();

router.get("/excel/submited-list", FileController.exportSubmitedListExcel);

module.exports = router;
