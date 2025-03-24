class SecondarySchoolModel {
  constructor(id, districtId, districtName, schools, isDeleted) {
    this.id = id;
    this.districtId = districtId;
    this.districtName = districtName;
    this.schools = schools;
    this.isDeleted = isDeleted;
  }
}

module.exports = SecondarySchoolModel;
