const { FirestoreModel, UserModel, SecondarySchoolModel } = require("../models");
const { UsersCollectionName, SecondarySchoolsCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.secondarySchoolDbRef = new FirestoreModel(SecondarySchoolsCollectionName, SecondarySchoolModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    const secondarySchools = await this.secondarySchoolDbRef.getAllItems();
    const districts = secondarySchools.map((doc) => {
      return {
        districtId: doc.districtId,
        districtName: doc.districtName
      };
    });

    return res.render("index", {
      currentTab: req.query.signupError ? "signup" : "signin",
      districts: districts,
      secondarySchools: JSON.stringify(secondarySchools),
      signinError: req.query.signinError ? "Số điện thoại hoặc mật khẩu không đúng" : "",
      signupError: req.query.signupError ? "Số điện thoại đã tồn tại" : ""
    });
  }
}

module.exports = new WelcomeController();
