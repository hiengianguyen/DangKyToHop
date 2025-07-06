const database = require("../../config/database/index");

class FirestoreModel {
  constructor(collectionName, modelClass) {
    this.collectionName = collectionName;
    this.collectionRef = database.collection(collectionName);
    this.model = new modelClass();
  }

  async getAllItems(orderBy) {
    try {
      let snapshot = this.collectionRef.where("isDeleted", "==", false);

      if (orderBy) {
        // orderBy.type: "asc" | "desc"
        snapshot = snapshot.orderBy(orderBy.fieldName, orderBy.type);
      }

      const result = await snapshot.get();
      const docs = Array.from(result.docs).map((doc) => this.model.fromFirestore(doc));
      return docs;
    } catch (error) {
      console.log("error:", error);
      return [];
    }
  }

  async getItemById(id) {
    try {
      const doc = await this.collectionRef.doc(id).get();
      if (doc.data().isDeleted === false) {
        return this.model.fromFirestore(doc);
      } else {
        return null;
      }
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  }

  async getItemByFilter(query, includeDeletedDoc = false) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }

      if (includeDeletedDoc == false) {
        snapshot = snapshot.where("isDeleted", "==", false);
      }

      const result = await snapshot.get();
      const docs = Array.from(result.docs).map((doc) => this.model.fromFirestore(doc));
      return docs[0];
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  }

  async getItemsByFilter(query, includeDeletedDocs = false, orderBy) {
    try {
      let snapshot = this.collectionRef;
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query);

      for (var i = 0; i < queryKeys.length; i++) {
        snapshot = snapshot.where(queryKeys[i], "==", queryValues[i]);
      }

      if (includeDeletedDocs == false) {
        snapshot = snapshot.where("isDeleted", "==", false);
      }

      if (orderBy) {
        // orderBy.type: "asc" | "desc"
        snapshot = snapshot.orderBy(orderBy.fieldName, orderBy.type);
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
