const { MongoClient } = require("mongodb");

const uri =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connect = async (dbName) => {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error("Error occurred: controllers.db.connect");
    throw error;
  }
};

module.exports = connect;
