class HighSchoolModel {
  constructor(id, name, address, establishedDate, phone, teachers, description, longDescription, isDeleted) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.establishedDate = establishedDate;
    this.phone = phone;
    this.teachers = teachers;
    this.description = description;
    this.longDescription = longDescription;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new HighSchoolModel(
      doc.id,
      data.name,
      data.address,
      data.establishedDate,
      data.phone,
      data.teachers,
      data.description,
      data.longDescription,
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
      shortDescription: this.description,
      longDescription: this.longDescription,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = HighSchoolModel;
