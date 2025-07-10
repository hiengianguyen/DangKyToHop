class ErrorController {
  constructor() {
    this.handleErrorRoute = this.handleErrorRoute.bind(this);
  }

  async handleErrorRoute(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.status(404).render("404");
    } else {
      return res.status(404).render("404-home");
    }
  }
}

module.exports = new ErrorController();
