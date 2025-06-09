const database = require("../../config/database/index");

class FirestoreModel {
  constructor(collectionName, modelClass) {
    this.collectionName = collectionName;
    this.collectionRef = database.collection(collectionName);
    this.model = new modelClass();
    this.modelClass = modelClass;
  }

  async getAllItems(useStatic) {
    try {
      const result = await this.collectionRef.where("isDeleted", "==", false).get();
      const allDocs = Array.from(result.docs);
      if (useStatic) {
        return allDocs.map((doc) => this.modelClass.fromFirestore(doc));
      } else {
        return allDocs.map((doc) => this.model.fromFirestore(doc));
      }
    } catch (error) {
      console.log("error:", error);
      return [];
    }
  }

  async getItemById(id, useStatic) {
    try {
      const doc = await this.collectionRef.doc(id).get();
      if (doc.data().isDeleted === false) {
        if (useStatic) {
          return this.modelClass.fromFirestore(doc);
        } else {
          return this.model.fromFirestore(doc);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  }

  async getItemByFilter(query, useStatic) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }
      snapshot = snapshot.where("isDeleted", "==", false);

      const result = await snapshot.get();
      let docs;
      if (useStatic) {
        docs = Array.from(result.docs).map((doc) => this.modelClass.fromFirestore(doc));
      } else {
        docs = Array.from(result.docs).map((doc) => this.model.fromFirestore(doc));
      }
      return docs[0];
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  }

  async getItemsByFilter(query, onlyDeletedDocs = false) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }

      if (onlyDeletedDocs == true) {
        snapshot = snapshot.where("isDeleted", "==", true);
      } else {
        snapshot = snapshot.where("isDeleted", "==", false);
      }

      const result = await snapshot.get();
      const docs = Array.from(result.docs).map((doc) => this.model.fromFirestore(doc));
      return docs;
    } catch (error) {
      console.log("error:", error);
      return [];
    }
  }

  async addItem(modelObject) {
    try {
      const data = modelObject.toFirestore();
      const addedDoc = await this.collectionRef.add(data);
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

  async addItems(modelObjects) {
    try {
      for (var modelObject of modelObjects) {
        const data = modelObject.toFirestore();
        await this.collectionRef.add(data);
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
      const deletedDoc = await this.collectionRef.doc(id).update({ isDeleted: true });
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
