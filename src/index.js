const route = require("./routes");
const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
