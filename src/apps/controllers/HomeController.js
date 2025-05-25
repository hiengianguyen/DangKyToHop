const { FirestoreModel, HighSchoolModel, CombinationModel } = require("../models");
const { HighSchoolsCollectionName, CombinationsCollectionName } = require("../../constants");

class HomeController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(HighSchoolsCollectionName, HighSchoolModel);
    this.combinationDbRef = new FirestoreModel(CombinationsCollectionName, CombinationModel);
    this.homePage = this.homePage.bind(this);
  }

  async homePage(req, res, next) {
    if (req.cookies.isLogin === "true") {
      if (req.query.role) {
        const schoolInfo = await this.highSchoolDbRef.getItemByFilter({
          name: "Trường THPT Duy Tân"
        });

        const combinations = await this.combinationDbRef.getAllItems(false);
        //sort by name (asc)
        combinations.sort((a, b) => (a.name > b.name ? 1 : -1));

        return res.render("home", {
          role: req.query.role,
          schoolInfo: schoolInfo,
          combinations: combinations
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
