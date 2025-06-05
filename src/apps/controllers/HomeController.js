const { FirestoreModel, HighSchoolModel, CombinationModel, SubjectModel } = require("../models");
const { HighSchoolsCollectionName, CombinationsCollectionName, SubjectsCollectionName } = require("../../constants");

class HomeController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(HighSchoolsCollectionName, HighSchoolModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.subjectDbRef = new FirestoreModel(SubjectsCollectionName, SubjectModel);
    this.homePage = this.homePage.bind(this);
  }

  async homePage(req, res, next) {
    if (req.cookies.isLogin === "true") {
      if (req.query.role) {
        return res.render("home");
      } else {
        return res.redirect(`/home?role=${req.cookies.role}`);
      }
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new HomeController();
