const { FirestoreModel, UserModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class AuthController {
  constructor() {
    this.userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
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
      res.locals.role = existedUser.role;
      // save info to cookie in 1 week
      res.cookie("isLogin", true, { maxAge: 604800000, httpOnly: true });
      res.cookie("userId", existedUser.id, { maxAge: 604800000, httpOnly: true });
      res.cookie("fullName", existedUser.fullName, { maxAge: 604800000, httpOnly: true });
      res.cookie("avatar", existedUser.avatar, { maxAge: 604800000, httpOnly: true });
      res.cookie("role", existedUser.role, { maxAge: 604800000, httpOnly: true });

      return res.redirect(`/combination/submit-combination?role=${existedUser.role}`);
    } else {
      return res.redirect("/?signinError=incorrect-phone-password");
    }
  }

  async signUp(req, res, next) {
    const { fullName, password, phone } = req.body;
    const existedPhone = await this.userDbRef.getItemByFilter({ phone: phone });

    if (existedPhone) {
      return res.redirect("/?signupError=existed-phone");
    } else {
      const userModel = new UserModel(undefined, fullName, password, phone, undefined, undefined, undefined);
      await this.userDbRef.addItem(userModel);
      return res.redirect("/");
    }
  }

  async signOut(req, res, next) {
    // save isLogin to cookie in 1 week
    res.cookie("isLogin", false, { maxAge: 604800000, httpOnly: true });
    res.locals.isLogin = false;
    return res.redirect("/");
  }
}

module.exports = new AuthController();
