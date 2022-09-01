require("dotenv").config();
const mongo = require("mongodb").MongoClient;


// deleting histories collections
deleteCollections("histories");
deleteCollections("menus");
deleteCollections("ordernums");
deleteCollections("orders");

function deleteCollections(collectionName){
mongo.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, db){
    if (err) {
      console.error(err);
      return;
    }
    let dbo = db.db("tab-trackerDB");
    dbo.collection(`${collectionName}`).deleteMany({})
    console.log(`Collection ${collectionName} deleted`);
  })}

