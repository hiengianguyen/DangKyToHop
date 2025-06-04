const SchoolController = require("../apps/controllers/SchoolController");
const express = require("express");
const router = express.Router();

router.get("/", SchoolController.index);
router.get("/contact", SchoolController.contact);

module.exports = router;
