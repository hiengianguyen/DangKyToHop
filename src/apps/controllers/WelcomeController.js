const { FirestoreModel, UserModel, SecondarySchoolModel } = require("../models");
const { UsersCollectionName, SecondarySchoolsCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.secondarySchoolDbRef = new FirestoreModel(SecondarySchoolsCollectionName, SecondarySchoolModel);
    this.index = this.index.bind(this);
  }

  // For Testing
  async index(req, res) {
    const secondarySchools = await this.secondarySchoolDbRef.getAllItems();
    const districts = secondarySchools.map((doc) => doc.district);

    return res.render("index", {
      districts: districts,
      secondarySchools: JSON.stringify(secondarySchools)
    });
  }
}

module.exports = new WelcomeController();
