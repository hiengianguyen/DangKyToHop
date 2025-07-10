const ErrorController = require("../apps/controllers/ErrorController");
const express = require("express");
const router = express.Router();

router.use(ErrorController.handleErrorRoute);

module.exports = router;
