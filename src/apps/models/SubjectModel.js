class SubjectModel {
  constructor(id, name, description, group, isDeleted) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.group = group;
    this.isDeleted = isDeleted || false;
  }
}

module.exports = SubjectModel;
