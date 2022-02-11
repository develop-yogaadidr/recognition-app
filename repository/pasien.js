const { client } = require("../db/conn");
const { ObjectId } = require("mongodb");

const collectionName = "pasien";

exports.getAllPasienAsync = async () => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let result = await db.find({}).limit(50).toArray();
  client.close();

  return result;
};

exports.getPasienAsync = async (nik) => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let result = await db.findOne({"nik" : nik});
  client.close();

  return result;
};

exports.updatePasien = async (nik, data) => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let query = {nik: nik};
  let result = await db.updateOne(query, data);
  client.close();

  return result;
}
