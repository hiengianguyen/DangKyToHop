const { FirestoreModel, UserModel } = require("../models");
const { UsersCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.userDbRef = new FirestoreModel(UsersCollectionName, UserModel);
    this.index = this.index.bind(this);
  }

  // For Testing
  async index(req, res) {
    return res.render("index");
  }
}

module.exports = new WelcomeController();
