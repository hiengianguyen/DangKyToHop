const db = require("../../config/database/index");

class FirestoreModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = db.collection(collectionName);
  }

  async getAllItems() {}
  async getItemById(ids) {}
  async getItemByFilter(ids) {}
  async getItemsByFilter(ids) {}
  async updateItem(id, object) {}
  async updateItems(ids, object) {}
  async softDeleteItem(id) {}
  async hardDeleteItem(id) {}
  async softDeleteItems(ids) {}
  async hardDeleteItems(ids) {}
}

module.exports = FirestoreModel;
