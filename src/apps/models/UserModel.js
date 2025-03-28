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
    this.isDeleted = isDeleted;
  }
}

module.exports = UserModel;
