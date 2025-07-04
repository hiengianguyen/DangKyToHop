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
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);
      return res.render("me/profile", {
        user: user,
        signin: req?.cookies?.isLogin,
        role: req?.cookies?.role,
        userId: req?.cookies?.userId
      });
    } else {
      return res.redirect("/");
    }
  }

  async edit(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);

      return res.render("me/edit-profile", {
        role: req?.cookies?.role,
        user: user,
        signin: req?.cookies?.isLogin,
        userId: req?.cookies?.userId
      });
    } else {
      return res.redirect("/");
    }
  }

  async update(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
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
      return res.redirect("/me/profile");
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new MeController();
