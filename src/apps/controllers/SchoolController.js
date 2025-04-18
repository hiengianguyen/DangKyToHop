const { FirestoreModel, HighSchoolModel } = require("../models");
const { HighSchoolsCollectionName } = require("../../constants");

class SchoolController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(HighSchoolsCollectionName, HighSchoolModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    const highSchool = await this.highSchoolDbRef.getItemByFilter({
      name: "Trường THPT Duy Tân"
    });

    return res.render("school/school_detail", {
      highSchool: highSchool
    });
  }
}

module.exports = new SchoolController();
