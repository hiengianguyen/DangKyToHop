const { FirestoreModel, UserModel } = require("../models");
const { UsersCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.index = this.index.bind(this);
  }

  // For Testing
  async index(req, res) {
    return res.send("Hellooooooooo World!");
  }
}

module.exports = new WelcomeController();
