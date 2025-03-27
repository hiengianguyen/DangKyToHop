const route = require("./routes");
const express = require("express");
const app = express();
const port = 3000;

route(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
