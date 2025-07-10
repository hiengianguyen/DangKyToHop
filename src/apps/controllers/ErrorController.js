class ErrorController {
  async handleErrorRoute(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.status(404).render("404");
    } else {
      return res.status(404).render("404-home");
    }
  }
}

module.exports = new ErrorController();
