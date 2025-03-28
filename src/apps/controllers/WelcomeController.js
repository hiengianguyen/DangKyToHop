const FirestoreModel = require("../models/FirestoreModel");
const { UsersCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.firestoreModel = new FirestoreModel(UsersCollectionName);
    this.index = this.index.bind(this);
  }

  // For Testing
  async index(req, res) {
    return res.send("Welcome to my project!");
  }
}

module.exports = new WelcomeController();
