class UserModel {
  constructor(id, fullName, password, secondarySchoolName, districtId, className, phone, dateOfBirth, avatar, role, isDeleted) {
    this.id = id;
    this.fullName = fullName;
    this.password = password;
    this.secondarySchoolName = secondarySchoolName;
    this.districtId = districtId;
    this.className = className;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.avatar = avatar;
    this.role = role;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return undefined;
    const data = doc.data();
    return new UserModel(
      doc.id,
      data.fullName,
      data.password,
      data.secondarySchoolName,
      data.districtId,
      data.className,
      data.phone,
      data.dateOfBirth,
      data.avatar,
      data.role,
      data.isDeleted
    );
  }

  toFirestore() {
    return {
      fullName: this.fullName,
      password: this.password,
      secondarySchoolName: this.secondarySchoolName,
      districtId: this.districtId,
      className: this.className,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      avatar: this.avatar,
      role: this.role,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = UserModel;
