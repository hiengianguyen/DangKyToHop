class CombinationModel {
  constructor(id, name, description, classesCount, classesCapacity, compulsorySubjects, optionalSubjects, isDeleted) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.classesCount = classesCount;
    this.classesCapacity = classesCapacity;
    this.compulsorySubjects = compulsorySubjects;
    this.optionalSubjects = optionalSubjects;
    this.isDeleted = isDeleted || false;
  }
}

module.exports = CombinationModel;
