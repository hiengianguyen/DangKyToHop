class HighSchoolModel {
  constructor(
    id,
    name,
    address,
    establishedDate,
    phone,
    teachers,
    description,
    isDeleted
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.establishedDate = establishedDate;
    this.phone = phone;
    this.teachers = teachers;
    this.description = description;
    this.isDeleted = isDeleted;
  }
}

module.exports = HighSchoolModel;
