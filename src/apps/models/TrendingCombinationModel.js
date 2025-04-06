class TrendingCombinationModel {
  constructor(id, year, combinationId, registeredCount, isDeleted) {
    this.id = id;
    this.year = year;
    this.combinationId = combinationId;
    this.registeredCount = registeredCount;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new TrendingCombinationModel(doc.id, data.year, data.combinationId, data.registeredCount, data.isDeleted);
  }

  toFirestore() {
    return {
      year: this.year,
      combinationId: this.combinationId,
      registeredCount: this.registeredCount,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = TrendingCombinationModel;
