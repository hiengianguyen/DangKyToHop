const { MaintenanceController } = require("../apps/controllers/index");
const express = require("express");
const router = express.Router();

router.use(MaintenanceController.maintenance);

module.exports = router;
