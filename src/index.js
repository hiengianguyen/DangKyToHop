const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = 3000;
const route = require("./routes");
const serviceAccount = require("../storageAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

route(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
