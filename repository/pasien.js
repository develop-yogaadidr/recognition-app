const dbo = require("../db/conn");

const collectionName = "pasien";

exports.getAllPasienAsync = async () => {
  const dbConnect = dbo.getDb();
  let result = await dbConnect
    .collection(collectionName)
    .find({})
    .limit(50)
    .toArray();

  return result;
};

exports.getPasienAsync = async (id) => {
  const dbConnect = dbo.getDb();
  let result = await dbConnect
    .collection(collectionName)
    .find({"_id" : ObjectId(id)})
    .toArray();

  return result;
};
