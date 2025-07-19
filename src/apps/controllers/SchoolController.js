const { FirestoreModel, HighSchoolModel, ImageActivityModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class SchoolController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(CollectionNameConstant.HighSchools, HighSchoolModel);
    this.imageActivityDbRef = new FirestoreModel(CollectionNameConstant.ImageActivity, ImageActivityModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const highSchool = await this.highSchoolDbRef.getItemByFilter({
        name: "Trường THPT Duy Tân"
      });

      const imgStudentDancings = await this.imageActivityDbRef.getItemsByFilter({
        type: "dance"
      });

      const imgStudentCampings = await this.imageActivityDbRef.getItemsByFilter({
        type: "camp"
      });

      const imgStudentActivitys = await this.imageActivityDbRef.getItemsByFilter({
        type: "activity"
      });
      const imgStudentAchievements = await this.imageActivityDbRef.getItemsByFilter({
        type: "achievement"
      });
      const studentAchievementsSorted = imgStudentAchievements.sort((a, b) => {
        const stringNumberFirstA = a.imgUrl.split("cap_tinh_")[1];
        const stringNumberFirstB = b.imgUrl.split("cap_tinh_")[1];

        return parseInt(stringNumberFirstA) - parseInt(stringNumberFirstB);
      });

      return res.render("school/school-detail", {
        studentAchievements: studentAchievementsSorted,
        imgStudentDancings: imgStudentDancings,
        imgStudentCampings: imgStudentCampings,
        imgStudentActivitys: imgStudentActivitys,
        highSchool: highSchool,
        signin: req?.cookies?.isLogin,
        userId: req?.cookies?.userId,
        role: req?.cookies?.role
      });
    } else {
      return res.redirect("/");
    }
  }

  async contact(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("school/contact", {
        signin: req?.cookies?.isLogin,
        userId: req?.cookies?.userId,
        role: req?.cookies?.role
      });
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new SchoolController();
