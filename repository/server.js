const { ObjectId } = require("mongodb");
const { client } = require("../db/conn");
const collectionName = "server";

exports.getAllServers = async () => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let result = await db.find({}).limit(50).toArray();
  client.close();

  return result;
};

exports.updateServer = async (id, data) => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let query = {_id: ObjectId(id)};
  let result = await db.updateOne(query, data);
  client.close();

  return result;
}

exports.createServer = async (data) => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let result = await db.insertOne(data);
  client.close();

  return result;
}
