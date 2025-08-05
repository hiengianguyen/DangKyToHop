const homeRouter = require("./homeRoute");
const authRouter = require("./authRoute");
const meRouter = require("./meRoute");
const schoolRouter = require("./schoolRoute");
const combinationRouter = require("./combinationRoute");
const fileRouter = require("./fileRoute");
const notfoundRouter = require("./notfoundRoute");
const maintenanceRouter = require("./maintenanceRoute");
const notiRouter = require("./notiRoute");

function routes(app) {
  app.use(maintenanceRouter);
  app.use("/", homeRouter);
  app.use("/me", meRouter);
  app.use("/notification", notiRouter);
  app.use("/auth", authRouter);
  app.use("/combination", combinationRouter);
  app.use("/school", schoolRouter);
  app.use("/file", fileRouter);
  app.get("/healthz", (req, res, next) => res.sendStatus(200));
  app.use(notfoundRouter);
}

module.exports = routes;
