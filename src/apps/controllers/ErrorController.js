class ErrorController {
  async handleErrorRoute(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.status(404).render("notfound/notfound-user");
    } else {
      return res.status(404).render("notfound/notfound-guest");
    }
  }
}

module.exports = new ErrorController();
