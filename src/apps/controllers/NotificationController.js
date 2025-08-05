const { FirestoreModel, NotificationModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");

class NotificationController {
  constructor() {
    this.notiDBRef = new FirestoreModel(CollectionNameConstant.Notification, NotificationModel);
    this.index = this.index.bind(this);
    this.notiGenerator = this.notiGenerator.bind(this);
    this.notiDetail = this.notiDetail.bind(this);
    this.createNoti = this.createNoti.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const notifications = await this.notiDBRef.getAllItems({
        fieldName: "publishAt",
        type: "asc"
      });

      return res.render("other/notification", {
        notifications: notifications
      });
    } else {
      return res.redirect("/");
    }
  }

  async notiGenerator(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification-generator");
    } else {
      return res.redirect("/");
    }
  }

  async notiDetail(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification-detail");
    } else {
      return res.redirect("/");
    }
  }

  async createNoti(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const { title = null, message = null, fileUrl = null, type = "text" } = req.body;

      let typeNoti = type;
      if (fileUrl) {
        typeNoti = "file";
      }

      const currentTime = new Date();

      const notificationModel = new NotificationModel(
        null, //id
        title,
        message,
        fileUrl,
        typeNoti,
        convertToVietnameseDateTime(currentTime),
        null //isDeleted
      );

      const response = await this.notiDBRef.addItem(notificationModel);
      if (response) {
        return res.json({
          message: "Gữi thông báo thành công",
          type: "success",
          isSuccess: true
        });
      } else {
        return res.json({
          message: "Gữi thông báo không thành công",
          type: "errer",
          isSuccess: false
        });
      }
    } else {
      return res.redirect("/");
    }
  }

  async info(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification-generator-info");
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new NotificationController();
