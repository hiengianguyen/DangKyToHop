const { FirestoreModel, HighSchoolModel } = require("../models");
const { HighSchoolsCollectionName } = require("../../constants");

class SchoolController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(HighSchoolsCollectionName, HighSchoolModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    if (req.cookies.isLogin === "true") {
      if (req.query.role === undefined) {
        return res.redirect(`/school?role=${req.cookies.role}`);
      }
      const highSchool = await this.highSchoolDbRef.getItemByFilter({
        name: "Trường THPT Duy Tân"
      });

      return res.render("school/school_detail", {
        highSchool: highSchool,
        signin: req.cookies.isLogin
      });
    } else {
      return res.redirect("/");
    }
  }

  async contact(req, res, next) {
    if (req.cookies.isLogin === "true") {
      if (req.query.role === undefined) {
        return res.redirect(`/school/contact?role=${req.cookies.role}`);
      }
      return res.render("school/contact", {
        signin: req.cookies.isLogin
      });
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new SchoolController();
