const { FirestoreModel, UserModel, SecondarySchoolModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { capitalizeFirstLetter } = require("../../utils/capitalizeFirstLetter");

class MeController {
  constructor() {
    this.userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
    this.secondarySchoolDbRef = new FirestoreModel(CollectionNameConstant.SecondarySchools, SecondarySchoolModel);
    this.index = this.index.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);
      return res.render("me/profile", {
        showToast: req?.query?.toastmessage === "true"
      });
    } else {
      return res.redirect("/");
    }
  }

  async edit(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      const user = await this.userDbRef.getItemById(req?.cookies?.userId);
      return res.render("me/edit-profile");
    } else {
      return res.redirect("/");
    }
  }

  async update(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      const { fullName, phone, avatar } = req?.body;
      let formData = {
        fullName: capitalizeFirstLetter(fullName),
        phone: phone
      };

      if (avatar && avatar != "") {
        formData.avatar = avatar;
        await res.cookie("avatar", avatar, { maxAge: 604800000, httpOnly: true });
      }

      try {
        await Promise.all([
          await this.userDbRef.updateItem(req?.cookies?.userId, formData),
          await res.cookie("fullName", fullName, { maxAge: 604800000, httpOnly: true })
        ]);
        return res.json({
          message: "Cập nhật trang cá nhân thành công",
          type: "success",
          icon: "✅"
        });
      } catch {
        return res.json({
          message: "Lỗi khi cập nhật trang cá nhân",
          type: "error",
          icon: "❌"
        });
      }
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new MeController();
