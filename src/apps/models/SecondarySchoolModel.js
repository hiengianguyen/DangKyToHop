class SecondarySchoolModel {
  constructor(id, districtId, districtName, schools, isDeleted) {
    this.id = id;
    this.districtId = districtId;
    this.districtName = districtName;
    this.schools = schools;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new SecondarySchoolModel(doc.id, data.districtId, data.districtName, data.schools, data.isDeleted);
  }

  toFirestore() {
    return {
      districtId: this.districtId,
      districtName: this.districtName,
      schools: this.schools,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = SecondarySchoolModel;
