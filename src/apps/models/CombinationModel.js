class CombinationModel {
  constructor(
    id,
    name,
    description,
    classCount,
    compulsorySubjects,
    optionalSubjects,
    isDeleted
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.classCount = classCount;
    this.compulsorySubjects = compulsorySubjects;
    this.optionalSubjects = optionalSubjects;
    this.isDeleted = isDeleted;
  }
}

module.exports = CombinationModel;
