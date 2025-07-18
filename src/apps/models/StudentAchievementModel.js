class StudentAchievementModel {
  constructor(id, description, imgUrl, isDeleted) {
    this.id = id;
    this.description = description;
    this.imgUrl = imgUrl;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new StudentAchievementModel(doc.id, data.description, data.imgUrl, data.isDeleted);
  }

  toFirestore() {
    return {
      description: this.description,
      imgUrl: this.imgUrl,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = StudentAchievementModel;
