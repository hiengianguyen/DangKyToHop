const { UserConstant } = require("../../constants");

class UserModel {
  constructor(id, fullName, password, phone, avatar, role, isDeleted) {
    this.id = id;
    this.fullName = fullName;
    this.password = password;
    this.phone = phone;
    this.avatar = avatar || UserConstant.DefaultAvatarUrl;
    this.role = role || "student";
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new UserModel(doc.id, data.fullName, data.password, data.phone, data.avatar, data.role, data.isDeleted);
  }

  toFirestore() {
    return {
      fullName: this.fullName,
      password: this.password,
      phone: this.phone,
      avatar: this.avatar,
      role: this.role,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = UserModel;
