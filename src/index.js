const express = require("express");
const firebaseAdmin = require("firebase-admin");
const app = express();
const port = 3000;
const route = require("./routes");
const serviceAccount = require("../src/config/database/storageAccount.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

route(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
