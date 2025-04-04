class SecondarySchoolModel {
  constructor(id, districtId, district, schools, isDeleted) {
    this.id = id;
    this.districtId = districtId;
    this.district = district;
    this.schools = schools;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return undefined;
    const data = doc.data();
    return new SecondarySchoolModel(doc.id, data.districtId, data.district, data.schools, data.isDeleted);
  }

  toFirestore() {
    return {
      districtId: this.districtId,
      district: this.district,
      schools: this.schools,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = SecondarySchoolModel;
