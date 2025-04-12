class SubjectModel {
  constructor(id, name, description, isDeleted) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new SubjectModel(doc.id, data.name, data.description, data.isDeleted);
  }

  toFirestore() {
    return {
      name: this.name,
      description: this.description,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = SubjectModel;
