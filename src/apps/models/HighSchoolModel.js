class HighSchoolModel {
  constructor(id, name, address, establishedDate, phone, teachers, description, isDeleted) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.establishedDate = establishedDate;
    this.phone = phone;
    this.teachers = teachers;
    this.description = description;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return undefined;
    const data = doc.data();
    return new HighSchoolModel(
      doc.id,
      data.name,
      data.address,
      data.establishedDate,
      data.phone,
      data.teachers,
      data.description,
      data.isDeleted
    );
  }

  toFirestore() {
    return {
      name: this.name,
      address: this.address,
      establishedDate: this.establishedDate,
      phone: this.phone,
      teachers: this.teachers,
      description: this.description,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = HighSchoolModel;
