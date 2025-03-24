const admin = require('firebase-admin')
const db = admin.firestore();

async function addData(doc, collection) {
    const docRef = await db.collection('text').add(doc);
    console.log(docRef)
}

async function addData(doc, collection) {
    const docRef = await db.collection('text').add(doc);
}