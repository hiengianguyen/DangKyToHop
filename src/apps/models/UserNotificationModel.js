class UserNotificationModel {
  constructor(id, userId, notificationId, publishAt, isDeleted) {
    this.id = id;
    this.userId = userId;
    this.notificationId = notificationId;
    this.publishAt = publishAt;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new UserNotificationModel(doc.id, data.userId, data.notificationId, data.publishAt, data.isDeleted);
  }

  toFirestore() {
    return {
      userId: this.userId,
      notificationId: this.notificationId,
      publishAt: this.publishAt,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = UserNotificationModel;
