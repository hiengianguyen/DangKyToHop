const { FirestoreModel, HighSchoolModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class SchoolController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(CollectionNameConstant.HighSchools, HighSchoolModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.query?.role === undefined) {
        return res.redirect(`/school?role=${req?.cookies?.role}`);
      }
      const highSchool = await this.highSchoolDbRef.getItemByFilter({
        name: "Trường THPT Duy Tân"
      });

      return res.render("school/school-detail", {
        highSchool: highSchool,
        signin: req?.cookies?.isLogin,
        userId: req?.cookies?.userId,
        role: req?.query?.role
      });
    } else {
      return res.redirect("/");
    }
  }

  async contact(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.query?.role === undefined) {
        return res.redirect(`/school/contact?role=${req?.cookies?.role}`);
      }
      return res.render("school/contact", {
        signin: req?.cookies?.isLogin,
        userId: req?.cookies?.userId,
        role: req?.query?.role
      });
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new SchoolController();
