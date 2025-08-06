const { FirestoreModel, NotificationModel, UserNotificationModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { convertToVietnameseDateTime } = require("../../utils/convertToVietnameseDateTime");

class NotificationController {
  constructor() {
    this.notiDBRef = new FirestoreModel(CollectionNameConstant.Notification, NotificationModel);
    this.userNotificationDbRef = new FirestoreModel(CollectionNameConstant.UserNotification, UserNotificationModel);
    this.index = this.index.bind(this);
    this.notiGenerator = this.notiGenerator.bind(this);
    this.notiDetail = this.notiDetail.bind(this);
    this.userNotiDelete = this.userNotiDelete.bind(this);
    this.notiDelete = this.notiDelete.bind(this);
    this.createNoti = this.createNoti.bind(this);
    this.notiEdit = this.notiEdit.bind(this);
    this.updateNoti = this.updateNoti.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const notifications = await this.notiDBRef.getAllItems({
        fieldName: "publishAt",
        type: "desc"
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

  async notiEdit(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const notiId = req?.params?.id;
      const notification = await this.notiDBRef.getItemById(notiId);
      if (!notification) {
        return res.redirect("back");
      }

      return res.render("other/notification-edit", {
        notification: notification
      });
    } else {
      return res.redirect("/");
    }
  }

  async notiDetail(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const notiId = req?.params?.id;
      const notification = await this.notiDBRef.getItemById(notiId);

      return res.render("other/notification-detail", {
        notification: notification
      });
    } else {
      return res.redirect("/");
    }
  }

  async userNotiDelete(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const userId = req?.params?.id;
      const userNotiId = req?.query?.notiId;
      await this.userNotificationDbRef.hardDeleteItem(userNotiId);
      res.locals.quantityNoti = res.locals.quantityNoti - 1;
      return res.redirect(`/combination/submited-detail/${userId}`);
    } else {
      return res.redirect("/");
    }
  }

  async notiDelete(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const notiId = req?.params?.id;
      const result = await this.notiDBRef.hardDeleteItem(notiId);
      if (result) {
        return res.json({
          message: "Xoá thông báo thành công.",
          isSuccess: true
        });
      } else {
        return res.json({
          message: "Xoá thông báo không thành công.",
          isSuccess: false
        });
      }
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

  async updateNoti(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const { id, title = null, message = null, fileUrl = null, type = "text" } = req.body;

      let typeNoti = type;
      if (fileUrl) {
        typeNoti = "file";
      }

      const currentTime = new Date();

      const response = await this.notiDBRef.updateItem(id, {
        title: title,
        message: message,
        fileUrl: fileUrl,
        type: typeNoti,
        publishAt: convertToVietnameseDateTime(currentTime)
      });
      if (response) {
        return res.json({
          message: "Cập nhật thông báo thành công",
          type: "success",
          isSuccess: true
        });
      } else {
        return res.json({
          message: "Cập nhật thông báo không thành công",
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
