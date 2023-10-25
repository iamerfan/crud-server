require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongo_url =
  process.env.MONGO_URL ||
  "mongodb+srv://vsCode:erfan123@mongocluster.htzk2.mongodb.net/?retryWrites=true&w=majority";

async function ConnectToDatabase() {
  const client = new MongoClient(mongo_url);
  return {
    client,
    connect: async () => await client.connect(),
    close: async () => await client.close(),
    db: client.db("test"),
  };
}

module.exports = { ConnectToDatabase };
