class SubjectModel {
  constructor(id, name, description, group, isDeleted) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.group = group;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new SubjectModel(doc.id, data.name, data.description, data.group, data.isDeleted);
  }

  toFirestore() {
    return {
      name: this.name,
      description: this.description,
      group: this.group,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = SubjectModel;
