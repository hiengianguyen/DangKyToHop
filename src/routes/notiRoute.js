const { NotificationController } = require("../apps/controllers/index");
const express = require("express");
const router = express.Router();

router.get("/", NotificationController.index);
router.get("/generator", NotificationController.notiGenerator);
router.get("/info", NotificationController.info);
router.post("/create-noti", NotificationController.createNoti);
router.get("/detail/:id", NotificationController.notiDetail);

module.exports = router;
