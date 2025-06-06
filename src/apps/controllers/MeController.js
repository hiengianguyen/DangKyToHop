const { FirestoreModel, UserModel, SecondarySchoolModel } = require("../models");
const { UsersCollectionName, SecondarySchoolsCollectionName } = require("../../constants");

class MeController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.secondarySchoolDbRef = new FirestoreModel(SecondarySchoolsCollectionName, SecondarySchoolModel);
    this.index = this.index.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res, next) {
    const role = req.query.role;
    const user = await this.userDbRef.getItemById(req.cookies.userId, false);
    return res.render("me/profile", {
      role: role,
      user: user,
      signin: req.cookies.isLogin
    });
  }

  async edit(req, res, next) {
    const role = req.query.role;
    const user = await this.userDbRef.getItemById(req.cookies.userId, false);

    return res.render("me/edit_profile", {
      role: role,
      user: user,
      signin: req.cookies.isLogin
    });
  }

  async update(req, res, next) {
    const role = req.query.role;
    const { fullName, phone, avatar } = req.body;
    let formData = {
      fullName: fullName,
      phone: phone
    };

    if (req.cookies.role === "manager") {
      formData = {
        fullName: fullName,
        phone: phone
      };
    }

    if (avatar && avatar != "") {
      formData.avatar = avatar;
      await res.cookie("avatar", avatar, { maxAge: 604800000, httpOnly: true });
    }

    await this.userDbRef.updateItem(req.cookies.userId, formData);
    await res.cookie("fullName", fullName, { maxAge: 604800000, httpOnly: true });
    return res.redirect(`/me/profile?role=${role}`);
  }
}

module.exports = new MeController();
