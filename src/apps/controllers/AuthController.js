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
      console.log("Login success!!!");
      return res.redirect("/");
    } else {
      console.log("Login faill!!!");
      return res.redirect("/");
    }
  }

  async signUp(req, res, next) {
    const { fullName, password, secondarySchoolName, districtId, phone, dateOfBirth } = req.body;

    const existedPhone = await this.userDbRef.getItemByFilter({
      phone: phone
    });

    if (existedPhone) {
      console.log("The phone is exited!");
      return res.redirect("/");
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
