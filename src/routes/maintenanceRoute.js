const MaintenanceController = require("../apps/controllers/MaintenanceController");
const express = require("express");
const router = express.Router();

router.use(MaintenanceController.maintenance);

module.exports = router;
