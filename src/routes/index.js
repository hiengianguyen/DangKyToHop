const homeRouter = require("./homeRoute");
const welcomeRouter = require("./wellcomeRoute");
const authRouter = require("./authRoute");
const combinationRouter = require("./combinationRoute");
const recommedRouter = require("./recommedRoute");

function routes(app) {
  app.use("/home", homeRouter);
  app.use("/auth", authRouter);
  app.use("/combination", combinationRouter);
  app.use("/recommed", recommedRouter);
  app.use("/", welcomeRouter);
}

module.exports = routes;
