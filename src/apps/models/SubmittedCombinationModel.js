class SubmittedCombinationModel {
  constructor(id, combinationId, userId, isDeleted) {
    this.id = id;
    this.combinationId = combinationId;
    this.userId = userId;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return undefined;
    const data = doc.data();
    return new SubmittedCombinationModel(doc.id, data.combinationId, data.userId, data.isDeleted);
  }

  toFirestore() {
    return {
      combinationId: this.combinationId,
      userId: this.userId,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = SubmittedCombinationModel;
