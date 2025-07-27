class ImageActivityModel {
  constructor(id, description, imgUrl, type, isDeleted) {
    this.id = id;
    this.description = description;
    this.imgUrl = imgUrl;
    this.type = type;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new ImageActivityModel(doc.id, data.description, data.imgUrl, data.type, data.isDeleted);
  }

  toFirestore() {
    return {
      description: this.description,
      imgUrl: this.imgUrl,
      type: this.type,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = ImageActivityModel;
