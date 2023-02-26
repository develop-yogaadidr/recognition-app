require('dotenv').config();
const { ObjectId } = require("mongodb");
const { client } = require("../db/conn");
const collectionName = "server";
const dbName = process.env.DB_NAME;

exports.getAllServers = async () => {
  await client.connect()
  let db = repo();
  let result = await db.find({}).limit(50).toArray();
  client.close();

  return result;
};

exports.updateServer = async (id, data) => {
  await client.connect()
  let db = repo();
  let query = {_id: ObjectId(id)};
  let result = await db.updateOne(query, data);
  client.close();

  return result;
}

exports.createServer = async (data) => {
  await client.connect()
  let db = repo();
  let result = await db.insertOne(data);
  client.close();

  return result;
}

exports.deleteServer = async (id) => {
  await client.connect()
  let db = repo();
  let query = {_id: ObjectId(id)};
  let result = await db.deleteOne(query);
  client.close();

  return result;
}

let repo = () => {
  return client.db(dbName).collection(collectionName);
}
