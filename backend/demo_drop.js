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
    dbo.collection(`${collectionName}`).drop(function (err, delOK){
        if (err) throw err;
        if(delOK) console.log(`Collection ${collectionName} deleted`);
        db.close();
    })
  }
)
}
