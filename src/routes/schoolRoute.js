const SchoolController = require("../apps/controllers/SchoolController");
const express = require("express");
const router = express.Router();

router.get("/", SchoolController.index);

module.exports = router;
