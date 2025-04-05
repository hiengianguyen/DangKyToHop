const { FirestoreModel, UserModel } = require("../models");
const { UsersCollectionName } = require("../../constants");

class AuthController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async signIn(req, res, next) {
    const { phone, password } = req.body;

    const existedUser = await this.userDbRef.getItemByFilter({
      phone: phone,
      password: password
    });

    if (existedUser) {
      return res.redirect("/home");
    } else {
      return res.redirect("/?signinError=incorrect-phone-password");
    }
  }

  async signUp(req, res, next) {
    const { fullName, password, secondarySchoolName, districtId, phone, dateOfBirth } = req.body;
    const existedPhone = await this.userDbRef.getItemByFilter({ phone: phone });

    if (existedPhone) {
      return res.redirect("/?signupError=existed-phone");
    } else {
      const userModel = new UserModel(
        undefined,
        fullName,
        password,
        secondarySchoolName,
        districtId,
        phone,
        dateOfBirth,
        undefined,
        undefined,
        undefined
      );
      await this.userDbRef.addItem(userModel);
      return res.redirect("/");
    }
  }
}

module.exports = new AuthController();
