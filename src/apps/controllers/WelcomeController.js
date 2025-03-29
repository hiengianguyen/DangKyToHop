const FirestoreModel = require("../models/FirestoreModel");
const { UsersCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName);
    this.index = this.index.bind(this);
  }

  // For Testing
  async index(req, res) {
    return res.send("Hellooooooooo World!");
  }
}

module.exports = new WelcomeController();
