const path = require("path");
const route = require("./routes");
const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Static file
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "utils")));

app.use((req, res, next) => {
  res.locals.isLogin = req?.cookies?.isLogin === "true";
  res.locals.fullName = req?.cookies?.fullName;
  res.locals.avatar = req?.cookies?.avatar;
  next();
});

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars")
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () => console.log(`App is listening at port ${port}`));
