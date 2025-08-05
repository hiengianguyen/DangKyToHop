class NotificationModel {
  constructor(id, title, message, fileUrl, type, publishAt, isDeleted) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.fileUrl = fileUrl;
    this.type = type || "text";
    this.publishAt = publishAt;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new NotificationModel(doc.id, data.title, data.message, data.fileUrl, data.type, data.publishAt, data.isDeleted);
  }

  toFirestore() {
    return {
      title: this.title,
      message: this.message,
      fileUrl: this.fileUrl,
      type: this.type,
      publishAt: this.publishAt,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = NotificationModel;
