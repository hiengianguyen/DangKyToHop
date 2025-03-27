const database = require("../../config/database/index");

class FirestoreModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = database.collection(collectionName);
  }

  async getAllItems() {
    try {
      const result = await this.collectionRef.get();
      const allDocs = Array.from(result.docs);
      return allDocs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (error) {
      console.log("error:", error);
      return [];
    }
  }

  async getItemById(id) {
    try {
      const doc = await this.collectionRef.doc(id).get();
      return doc.data();
    } catch (error) {
      console.log("error:", error);
      return undefined;
    }
  }

  async getItemByFilter(query) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }

      const result = await snapshot.get();
      const docs = Array.from(result.docs).map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return docs[0];
    } catch (error) {
      console.log("error:", error);
      return undefined;
    }
  }

  async getItemsByFilter(query) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }

      const result = await snapshot.get();
      const docs = Array.from(result.docs).map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return docs;
    } catch (error) {
      console.log("error:", error);
      return [];
    }
  }

  async addItem(object) {
    try {
      const addedDoc = await this.collectionRef.add(object);
      if (addedDoc) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error:", error);
      return false;
    }
  }

  async addItems(objects) {
    try {
      for (var object of objects) {
        await this.collectionRef.add(object);
      }
      return true;
    } catch (error) {
      console.log("error:", error);
      return false;
    }
  }

  async updateItem(id, object) {
    try {
      const updatedDoc = await this.collectionRef.doc(id).update(object);
      if (updatedDoc && updatedDoc.writeTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error:", error);
      return false;
    }
  }

  async updateItems(query, object) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }

      const result = await snapshot.get();
      const docs = Array.from(result.docs);

      for (var doc of docs) {
        await this.collectionRef.doc(doc.id).update(object);
      }

      return true;
    } catch (error) {
      console.log("error:", error);
      return false;
    }
  }

  async softDeleteItem(id) {
    try {
      const deletedDoc = await this.collectionRef
        .doc(id)
        .update({ isDeleted: true });
      if (deletedDoc && deletedDoc.writeTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error:", error);
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
      console.log("error:", error);
      return false;
    }
  }

  async softDeleteItems(ids) {
    try {
      for (var id of ids) {
        await this.collectionRef.doc(id).update({ isDeleted: true });
      }
      return true;
    } catch (error) {
      console.log("error:", error);
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
      console.log("error:", error);
      return false;
    }
  }
}

module.exports = FirestoreModel;
