const { FirestoreModel, HighSchoolModel, CombinationModel, SubjectModel, StudentAchievementModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class HomeController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(CollectionNameConstant.HighSchools, HighSchoolModel);
    this.combinationDbRef = new FirestoreModel(CollectionNameConstant.Combinations, CombinationModel);
    this.subjectDbRef = new FirestoreModel(CollectionNameConstant.Subjects, SubjectModel);
    this.studentAchievementDbRef = new FirestoreModel(CollectionNameConstant.StudentAchievement, StudentAchievementModel);
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
      const studentAchievements = await this.studentAchievementDbRef.getAllItems();
      const studentAchievementsSorted = studentAchievements.sort((a, b) => {
        const stringNumberFirstA = a.imgUrl.split("cap_tinh_")[1];
        const stringNumberFirstB = b.imgUrl.split("cap_tinh_")[1];

        return parseInt(stringNumberFirstA) - parseInt(stringNumberFirstB);
      });
      return res.render("home", {
        studentAchievements: studentAchievementsSorted,
        isNotHomePage: false
      });
    }
  }
}

module.exports = new HomeController();
