class SubmittedCombinationModel {
  constructor(id, combinationId, userId, isDeleted) {
    this.id = id;
    this.combinationId = combinationId;
    this.userId = userId;
    this.isDeleted = isDeleted || false;
  }
}

module.exports = SubmittedCombinationModel;
