const FirestoreModel = require("../models/FirestoreModel");
const { UsersCollectionName } = require("../../constants");

class WelcomeController {
  constructor() {
    this.firestoreModel = new FirestoreModel(UsersCollectionName);
    this.index = this.index.bind(this);
  }

  // For Testing
  async index(req, res) {
    const users = await this.firestoreModel.getAllItems();
    return res.json(users[0]);
  }
}

module.exports = new WelcomeController();
