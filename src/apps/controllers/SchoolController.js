const { FirestoreModel, HighSchoolModel, ImageActivityModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class SchoolController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(CollectionNameConstant.HighSchools, HighSchoolModel);
    this.imageActivityDbRef = new FirestoreModel(CollectionNameConstant.ImageActivity, ImageActivityModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      let highSchool, imgStudentDancings, imgStudentCampings, imgStudentActivitys, imgStudentAchievements;

      await Promise.all([
        (highSchool = await this.highSchoolDbRef.getItemByFilter({
          name: "Trường THPT Duy Tân"
        })),
        (imgStudentDancings = await this.imageActivityDbRef.getItemsByFilter({
          type: "dance"
        })),
        (imgStudentCampings = await this.imageActivityDbRef.getItemsByFilter({
          type: "camp"
        })),
        (imgStudentActivitys = await this.imageActivityDbRef.getItemsByFilter({
          type: "activity"
        })),
        (imgStudentAchievements = await this.imageActivityDbRef.getItemsByFilter({
          type: "achievement"
        }))
      ]);

      const studentAchievementsSorted = imgStudentAchievements.sort((a, b) => {
        const stringNumberFirstA = a.imgUrl.split("cap_tinh_")[1];
        const stringNumberFirstB = b.imgUrl.split("cap_tinh_")[1];

        return parseInt(stringNumberFirstA) - parseInt(stringNumberFirstB);
      });

      return res.render("school/school-detail", {
        avatar: req?.cookies?.avatar,
        studentAchievements: studentAchievementsSorted,
        imgStudentDancings: imgStudentDancings,
        imgStudentCampings: imgStudentCampings,
        imgStudentActivitys: imgStudentActivitys,
        highSchool: highSchool,
        signin: req?.cookies?.isLogin,
        userId: req?.cookies?.userId,
        role: req?.cookies?.role,
        btnRedirectTop: true
      });
    } else {
      return res.redirect("/");
    }
  }

  async contact(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      return res.render("school/contact", {
        avatar: req?.cookies?.avatar,
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
