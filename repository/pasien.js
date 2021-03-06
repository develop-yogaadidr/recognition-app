const { client } = require("../db/conn");
const ServerRepository = require("./server");
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

exports.getFromOtherServers = async (nik) => {
  let servers = await ServerRepository.getAllServers();
  let pasien = null;

  for (const element of servers) {
    let response = await fetch(`${element.url}/pasien/${nik}/self`);
    if(response.status == 200){
      let result = await response.json()
      if(result.data != null){
        pasien = result.data 
        break;
      }
    }
  }

  return pasien;
};

exports.updatePasien = async (nik, data) => {
  await client.connect()
  let db = client.db().collection(collectionName);
  let query = {nik: nik};
  let result = await db.updateOne(query, data);
  client.close();

  return result;
}
