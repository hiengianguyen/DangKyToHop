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
    const user = await this.userDbRef.getItemById(req.cookies.userId);
    const districtDoc = await this.secondarySchoolDbRef.getItemByFilter({ districtId: user.districtId });
    const districtName = districtDoc.districtName;
    return res.render("me/profile", {
      user: user,
      districtName: districtName
    });
  }

  async edit(req, res, next) {
    const user = await this.userDbRef.getItemById(req.cookies.userId);
    const secondarySchools = await this.secondarySchoolDbRef.getAllItems();
    const districts = secondarySchools.map((doc) => {
      return {
        districtId: doc.districtId,
        districtName: doc.districtName
      };
    });
    return res.render("me/edit_profile", {
      user: user,
      districts: districts
    });
  }

  async update(req, res, next) {
    const { fullName, districtId, phone, avatar } = req.body;
    await this.userDbRef.updateItem(req.cookies.userId, {
      fullName: fullName,
      districtId: districtId,
      phone: phone,
      avatar: avatar
    });
    await res.cookie("fullName", fullName, { maxAge: 604800000, httpOnly: true });
    await res.cookie("avatar", avatar, { maxAge: 604800000, httpOnly: true });
    return res.redirect("/me/profile");
  }
}

module.exports = new MeController();
