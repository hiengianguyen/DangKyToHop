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
      let signupSuccess = false;
      let messageError;
      if (req?.query?.signup) {
        signupSuccess = true;
      } else if (req?.query?.signinError === "incorrect-phone-password") {
        messageError = "Số điện thoại hoặc mật khẩu sai";
        signupSuccess = true;
      }
      return res.render("home", {
        signupSuccess: signupSuccess,
        messageError: messageError
      });
    }
  }
}

module.exports = new HomeController();
