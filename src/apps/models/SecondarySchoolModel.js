class SecondarySchoolModel {
  constructor(id, districtId, districtName, schools, order, isDeleted) {
    this.id = id;
    this.districtId = districtId;
    this.districtName = districtName;
    this.schools = schools;
    this.order = order;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new SecondarySchoolModel(doc.id, data.districtId, data.districtName, data.schools, data.order, data.isDeleted);
  }

  toFirestore() {
    return {
      districtId: this.districtId,
      districtName: this.districtName,
      schools: this.schools,
      order: this.order,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = SecondarySchoolModel;
