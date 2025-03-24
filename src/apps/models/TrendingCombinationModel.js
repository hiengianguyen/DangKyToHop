class TrendingCombinationModel {
  constructor(id, year, combinationId, registeredCount, isDeleted) {
    this.id = id;
    this.year = year;
    this.combinationId = combinationId;
    this.registeredCount = registeredCount;
    this.isDeleted = isDeleted;
  }
}

module.exports = TrendingCombinationModel;
