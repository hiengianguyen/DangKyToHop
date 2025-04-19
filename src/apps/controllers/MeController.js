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
    const user = await this.userDbRef.getItemById(req.cookies.userId);
    const districtDoc = await this.secondarySchoolDbRef.getItemByFilter({ districtId: user.districtId });
    const districtName = districtDoc.districtName;
    return res.render("me/profile", {
      role: role,
      user: user,
      districtName: districtName
    });
  }

  async edit(req, res, next) {
    const role = req.query.role;
    const user = await this.userDbRef.getItemById(req.cookies.userId);
    const secondarySchools = await this.secondarySchoolDbRef.getAllItems();
    const districts = secondarySchools.map((doc) => {
      return {
        districtId: doc.districtId,
        districtName: doc.districtName
      };
    });
    const districtDoc = await this.secondarySchoolDbRef.getItemByFilter({ districtId: user.districtId });
    const districtName = districtDoc.districtName;
    const secondarySchool = user.secondarySchoolName;
    return res.render("me/edit_profile", {
      role: role,
      user: user,
      secondarySchools: JSON.stringify(secondarySchools),
      secondarySchool: JSON.stringify(secondarySchool),
      districts: districts,
      districtName: districtName
    });
  }

  async update(req, res, next) {
    const role = req.query.role;
    const { fullName, districtId, phone, avatar, secondarySchoolName, dateOfBirth } = req.body;
    let formData = {
      fullName: fullName,
      districtId: districtId,
      dateOfBirth: dateOfBirth,
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

    if (secondarySchoolName) formData.secondarySchoolName = secondarySchoolName;

    await this.userDbRef.updateItem(req.cookies.userId, formData);
    await res.cookie("fullName", fullName, { maxAge: 604800000, httpOnly: true });
    return res.redirect(`/me/profile?role=${role}`);
  }
}

module.exports = new MeController();
