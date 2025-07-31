const { FirestoreModel, UserModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");
const { capitalizeFirstLetter } = require("../../utils/capitalizeFirstLetter");

class AuthController {
  constructor() {
    this.userDbRef = new FirestoreModel(CollectionNameConstant.Users, UserModel);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async renderLogin(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.cookies?.role === "manager") {
        return res.redirect("/combination/submited-list");
      } else {
        return res.redirect("/combination/submit-combination");
      }
    } else {
      let signupSuccess = false;
      let messageError;
      if (req?.query?.signup) {
        signupSuccess = true;
      } else if (req?.query?.signinError === "incorrect-phone-password") {
        messageError = "Số điện thoại hoặc mật khẩu sai!";
      }
      return res.render("auth/signin", {
        layout: false,
        signupSuccess: signupSuccess,
        messageError: messageError,
        showToast: req?.query?.toastmessage === "true"
      });
    }
  }

  async renderSignUp(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      if (req?.cookies?.role === "manager") {
        return res.redirect("/combination/submited-list");
      } else {
        return res.redirect("/combination/submit-combination");
      }
    } else {
      let signupSuccess = false;
      let messageError;
      if (req?.query?.signupError === "existed-phone") {
        messageError = "Số điện thoại tồn tại!";
      }
      return res.render("auth/signup", {
        layout: false,
        signupSuccess: signupSuccess,
        messageError: messageError
      });
    }
  }

  async signIn(req, res, next) {
    const { phone, password } = req?.body;

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

      if (existedUser.role === "manager") {
        return res.redirect("/combination/submited-list");
      } else {
        return res.redirect("/combination/submit-combination");
      }
    } else {
      return res.redirect("/auth/signin?signinError=incorrect-phone-password");
    }
  }

  async signUp(req, res, next) {
    const { fullName, password, phone } = req?.body;
    const existedPhone = await this.userDbRef.getItemByFilter({ phone: phone });

    if (existedPhone) {
      return res.redirect("/auth/signup?signupError=existed-phone");
    } else {
      const userModel = new UserModel(undefined, capitalizeFirstLetter(fullName), password, phone, undefined, undefined, undefined);
      await this.userDbRef.addItem(userModel);
      return res.redirect("/auth/signin?toastmessage=true");
    }
  }

  async signOut(req, res, next) {
    // save isLogin to cookie in 1 week
    res.cookie("isLogin", false, { maxAge: 604800000, httpOnly: true });
    res.locals.isLogin = false;
    return res.redirect("/auth/signin");
  }

  async forgotPassword(req, res, next) {
    return res.render("other/forgot-password");
  }
}

module.exports = new AuthController();
