class FavouriteSubmittedModel {
  constructor(id, userId, submittedId, isDeleted) {
    this.id = id;
    this.userId = userId;
    this.submittedId = submittedId;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new FavouriteSubmittedModel(doc.id, data.userId, data.submittedId, data.isDeleted);
  }

  toFirestore() {
    return {
      userId: this.userId,
      submittedId: this.submittedId,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = FavouriteSubmittedModel;
