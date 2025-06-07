const homeRouter = require("./homeRoute");
const authRouter = require("./authRoute");
const meRouter = require("./meRoute");
const schoolRouter = require("./schoolRoute");
const combinationRouter = require("./combinationRoute");
const recommendRouter = require("./recommendRoute");

function routes(app) {
  app.use("/", homeRouter);
  app.use("/me", meRouter);
  app.use("/auth", authRouter);
  app.use("/combination", combinationRouter);
  app.use("/recommend", recommendRouter);
  app.use("/school", schoolRouter);
}

module.exports = routes;
