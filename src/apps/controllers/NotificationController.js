class NotificationController {
  constructor() {
    this.index = this.index.bind(this);
    this.notiGenerator = this.notiGenerator.bind(this);
    this.notiDetail = this.notiDetail.bind(this);
  }

  async index(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification");
    } else {
      return res.redirect("/");
    }
  }

  async notiGenerator(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification-generator");
    } else {
      return res.redirect("/");
    }
  }

  async notiDetail(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification-detail");
    } else {
      return res.redirect("/");
    }
  }

  async createNoti(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      const { title, message } = req.body;
      console.log("title:", title);
      console.log("message:", message);
      // return res.render("other/notification-detail");
    } else {
      return res.redirect("/");
    }
  }

  async info(req, res, next) {
    if (req?.cookies?.isLogin === "true") {
      return res.render("other/notification-generator-info");
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new NotificationController();
