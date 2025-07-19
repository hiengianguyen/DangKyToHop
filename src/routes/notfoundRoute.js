const NotfoundController = require("../apps/controllers/NotfoundController");
const express = require("express");
const router = express.Router();

router.use(NotfoundController.handleNotfound);

module.exports = router;
