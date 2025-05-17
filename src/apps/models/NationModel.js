class NationModel {
  constructor(id, name, isDeleted) {
    this.id = id;
    this.name = name;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new NationModel(doc.id, data.name, data.isDeleted);
  }

  toFirestore() {
    return {
      name: this.name,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = NationModel;
