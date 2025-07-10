const homeRouter = require("./homeRoute");
const authRouter = require("./authRoute");
const meRouter = require("./meRoute");
const schoolRouter = require("./schoolRoute");
const combinationRouter = require("./combinationRoute");
const fileRouter = require("./fileRoute");
const errorRouter = require("./errorRoute");

function routes(app) {
  app.use("/", homeRouter);
  app.use("/me", meRouter);
  app.use("/auth", authRouter);
  app.use("/combination", combinationRouter);
  app.use("/school", schoolRouter);
  app.use("/file", fileRouter);
  app.use(errorRouter);
}

module.exports = routes;
