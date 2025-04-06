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

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new CombinationModel(
      doc.id,
      data.name,
      data.description,
      data.classesCount,
      data.classesCapacity,
      data.compulsorySubjects,
      data.optionalSubjects,
      data.isDeleted
    );
  }

  toFirestore() {
    return {
      name: this.name,
      description: this.description,
      classesCount: this.classesCount,
      classesCapacity: this.classesCapacity,
      compulsorySubjects: this.compulsorySubjects,
      optionalSubjects: this.optionalSubjects,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = CombinationModel;
