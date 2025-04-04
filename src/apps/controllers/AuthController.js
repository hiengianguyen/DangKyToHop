class AuthController {
  signIn(req, res, next) {
    res.redirect("/");
  }

  signUp(req, res, next) {
    res.redirect("/");
  }
}

module.exports = new AuthController();
