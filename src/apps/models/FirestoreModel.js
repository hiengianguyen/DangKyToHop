const db = require("../../config/database/index");

class FirestoreModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = db.collection(collectionName);
  }

  async getAllItems() {}
  async getItemById(id) {}
  async getItemByFilter(query) {}
  async getItemsByFilter(query) {}
  async updateItem(id, object) {}
  async updateItems(query, object) {}
  async softDeleteItem(id) {}
  async hardDeleteItem(id) {}
  async softDeleteItems(query) {}
  async hardDeleteItems(query) {}
}

module.exports = FirestoreModel;
