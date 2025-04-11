const homeRouter = require("./homeRoute");
const welcomeRouter = require("./welcomeRoute");
const authRouter = require("./authRoute");
const schoolRouter = require("./schoolRoute");
const combinationRouter = require("./combinationRoute");
const recommendRouter = require("./recommendRoute");

function routes(app) {
  app.use("/home", homeRouter);
  app.use("/auth", authRouter);
  app.use("/combination", combinationRouter);
  app.use("/recommend", recommendRouter);
  app.use("/school", schoolRouter);
  app.use("/", welcomeRouter);
}

module.exports = routes;
