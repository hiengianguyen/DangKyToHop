require("dotenv").config();

class MaintenanceController {
  async maintenance(req, res, next) {
    const isMaintenance = process.env.IS_MAINTENANCE;
    if (isMaintenance === "true") {
      return res.render("orther/maintenance", {
        isNotSideBar: true
      });
    } else {
      return next();
    }
  }
}

module.exports = new MaintenanceController();
