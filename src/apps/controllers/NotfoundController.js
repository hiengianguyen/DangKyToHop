class NotfoundController {
  async handleNotfound(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      return res.status(404).render("notfound/notfound-user");
    } else {
      return res.status(404).render("notfound/notfound-guest");
    }
  }
}

module.exports = new NotfoundController();
