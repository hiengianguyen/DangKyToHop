const { FirestoreModel, HighSchoolModel, CombinationModel, SubjectModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class HomeController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(CollectionNameConstant.HighSchools, HighSchoolModel);
    this.combinationDbRef = new FirestoreModel(CollectionNameConstant.Combinations, CombinationModel);
    this.subjectDbRef = new FirestoreModel(CollectionNameConstant.Subjects, SubjectModel);
    this.homePage = this.homePage.bind(this);
  }

  async homePage(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.cookies?.role === "manager") {
        return res.redirect("/combination/submited-list");
      } else {
        return res.redirect("/combination/submit-combination");
      }
    } else {
      return res.render("home", {
        isNotHomePage: false
      });
    }
  }
}

module.exports = new HomeController();
