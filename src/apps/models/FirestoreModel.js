const db = require("../../config/database/index");

class FirestoreModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = db.collection(collectionName);
  }

  async getAllItems() {
    const allDocs = await this.collectionRef.get();
    return allDocs;
  }

  async getItemById(id) {
    const doc = await this.collectionRef.doc(id).get();
    return doc;
  }

  async getItemByFilter(query) {
    let snapshot = this.collectionRef;
    const queryKeys = Object.keys(query);
    const queryValues = Object.values(query);

    for (var i = 0; i < queryKeys.length; i++) {
      snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
    }

    const docs = await snapshot.get();
    return docs[0];
  }

  async getItemsByFilter(query) {
    let snapshot = this.collectionRef;
    const queryKeys = Object.keys(query);
    const queryValues = Object.values(query);

    for (var i = 0; i < queryKeys.length; i++) {
      snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
    }

    const docs = await snapshot.get();
    return docs;
  }

  async addItem(object) {
    const addedDoc = await this.collectionRef.add(object);
    if (addedDoc) {
      return true;
    } else {
      return false;
    }
  }

  async addItems(objects) {
    const addedDocs = [];
    for (var object of objects) {
      const addedDoc = await this.collectionRef.add(object);
      addedDocs.push(addedDoc);
    }

    if (objects.length === addedDocs.length) {
      return true;
    } else {
      return false;
    }
  }

  async updateItem(id, object) {
    const docRef = await this.collectionRef.doc(id).add(object);
    const updatedDoc = docRef.get();
    if (updatedDoc) {
      return true;
    } else {
      return false;
    }
  }

  async updateItems(query, object) {}

  async softDeleteItem(id) {
    const docRef = await this.collectionRef.doc(id).add({ isDeleted: true });
    const deletedDoc = docRef.get();
    if (deletedDoc) {
      return true;
    } else {
      return false;
    }
  }

  async hardDeleteItem(id) {
    try {
      const deletedDoc = await this.collectionRef.doc(id).delete();
      if (deletedDoc && deletedDoc.writeTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async softDeleteItems(ids) {
    const deletedDocs = [];
    for (var id of ids) {
      const docRef = await this.collectionRef.doc(id).add({ isDeleted: true });
      const deletedDoc = docRef.get();
      deletedDocs.push(deletedDoc);
    }

    if (ids.length === deletedDocs.length) {
      return true;
    } else {
      return false;
    }
  }

  async hardDeleteItems(ids) {
    try {
      for (var id of ids) {
        await this.collectionRef.doc(id).delete();
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = FirestoreModel;
