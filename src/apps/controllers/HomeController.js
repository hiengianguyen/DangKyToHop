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
        const schoolInfo = await this.highSchoolDbRef.getItemByFilter({
          name: "Trường THPT Duy Tân"
        });

        const subjects = await this.subjectDbRef.getAllItems(false);
        const combinations = await this.combinationDbRef.getAllItems(false);
        //sort by name (asc)
        combinations.sort((a, b) => (a.name > b.name ? 1 : -1));

        let compulsorySubjects = combinations[0].compulsorySubjects;
        let optionalSubjects = combinations[0].optionalSubjects;

        compulsorySubjects = subjects.filter((subject) => compulsorySubjects.includes(subject.name));
        optionalSubjects = subjects.filter((subject) => optionalSubjects.includes(subject.name));

        return res.render("home", {
          role: req.query.role,
          schoolInfo: schoolInfo,
          combinations: combinations,
          combination: combinations[0],
          compulsorySubjects: compulsorySubjects,
          optionalSubjects: optionalSubjects
        });
      } else {
        return res.redirect(`/home?role=${req.cookies.role}`);
      }
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new HomeController();
