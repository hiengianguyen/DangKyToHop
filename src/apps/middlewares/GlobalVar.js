const { FirestoreModel, RegisteredCombinationModel, UserModel, UserNotificationModel, NotificationModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

module.exports = async (req, res, next) => {
  const userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
  const registeredCombinationsDbRef = new FirestoreModel(CollectionNameConstant.RegisteredCombinations, RegisteredCombinationModel);
  const userNotificationDbRef = new FirestoreModel(CollectionNameConstant.UserNotification, UserNotificationModel);
  const notiDBRef = new FirestoreModel(CollectionNameConstant.Notification, NotificationModel);

  const userId = req?.cookies?.userId;
  if (userId === undefined) {
    return next();
  }

  let otherNotifications = [],
    quantityNoti = 0;

  let [user, submited, noti = null, notiText = null, notiFile = null] = await Promise.all([
    userDbRef.getItemById(userId),
    registeredCombinationsDbRef.getItemByFilter({
      userId: userId
    }),
    userNotificationDbRef.getItemByFilter({
      userId: userId
    }),
    notiDBRef.getItemsByFilter({
      type: "text"
    }),
    notiDBRef.getItemsByFilter({
      type: "file"
    })
  ]);

  if (notiText) {
    otherNotifications = [...notiText];
  }

  if (notiFile) {
    otherNotifications = [...otherNotifications, ...notiFile];
  }

  quantityNoti = quantityNoti + otherNotifications.length;

  res.locals.otherNotifications = otherNotifications;

  if (noti) {
    quantityNoti++;
    const notificationDetail = await notiDBRef.getItemById(noti.notificationId);
    res.locals.notificationIsApprove = notificationDetail;
    res.locals.userNotiId = noti.id;
    res.locals.notiTime = noti.publishAt;
  }

  res.locals.quantityNoti = quantityNoti;

  if (user) {
    res.locals.user = user;
    res.locals.fullName = user.fullName;
    res.locals.role = user.role;
    res.locals.userId = userId;
  }

  res.locals.isLogin = req?.cookies?.isLogin === "true";
  res.locals.avatar = req?.cookies?.avatar;
  res.locals.submited = submited;
  next();
};
