const { FirestoreModel, UserModel, SecondarySchoolModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class MeController {
  constructor() {
    this.userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
    this.secondarySchoolDbRef = new FirestoreModel(CollectionNameConstant.SecondarySchools, SecondarySchoolModel);
    this.index = this.index.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.query?.role === "") {
        return res.redirect(`/me/profile?role=${req?.cookies?.role}`);
      }
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);
      return res.render("me/profile", {
        user: user,
        signin: req?.cookies?.isLogin
      });
    } else {
      return res.redirect("/");
    }
  }

  async edit(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.query?.role === "") {
        return res.redirect(`/me/profile/edit?role=${req?.cookies?.role}`);
      }
      const role = req?.query?.role;
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);

      return res.render("me/edit_profile", {
        role: role,
        user: user,
        signin: req?.cookies?.isLogin
      });
    } else {
      return res.redirect("/");
    }
  }

  async update(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const role = req?.query?.role;
      const { fullName, phone, avatar } = req?.body;
      let formData = {
        fullName: fullName,
        phone: phone
      };

      if (req?.cookies?.role === "manager") {
        formData = {
          fullName: fullName,
          phone: phone
        };
      }

      if (avatar && avatar != "") {
        formData.avatar = avatar;
        await res.cookie("avatar", avatar, { maxAge: 604800000, httpOnly: true });
      }

      await this.userDbRef.updateItem(req?.cookies?.userId, formData);
      await res.cookie("fullName", fullName, { maxAge: 604800000, httpOnly: true });
      return res.redirect(`/me/profile?role=${role}`);
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new MeController();
