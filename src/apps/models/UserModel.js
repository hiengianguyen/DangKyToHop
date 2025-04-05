class UserModel {
  constructor(id, fullName, password, secondarySchoolName, districtId, phone, dateOfBirth, avatar, role, isDeleted) {
    this.id = id;
    this.fullName = fullName;
    this.password = password;
    this.secondarySchoolName = secondarySchoolName;
    this.districtId = districtId;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.avatar = avatar || "https://res.cloudinary.com/dwoymvppw/image/upload/v1743848084/default_user_avatar_dckymx.avif";
    this.role = role || "student";
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
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      avatar: this.avatar,
      role: this.role,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = UserModel;
