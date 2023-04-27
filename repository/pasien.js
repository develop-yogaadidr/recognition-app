require('dotenv').config();
const { DbEngine } = require('../commons/dbEngine');
const conn = require("../db/conn");
const ServerRepository = require("./server");

const collectionName = "pasien";
const dbName = process.env.DB_NAME;

exports.getAllPasienAsync = async () => {
  return query().getAllPasienAsync();
};

exports.getPasienAsync = async (nik) => {
  return query().getPasienAsync(nik);
};

exports.updatePasien = async (nik, foto) => {
  return query().updatePasien(nik, foto);
}

exports.getFromOtherServers = async (nik) => {
  let servers = await ServerRepository.getAllServers();
  let pasien = null;

  for (const element of servers) {
    let response = await fetch(`${element.url}/pasien/${nik}/self`);
    if (response.status == 200) {
      let result = await response.json()
      if (result.data != null) {
        pasien = result.data
        break;
      }
    }
  }

  return pasien;
};

function query() {
  switch (conn.DB().engine) {
    case DbEngine.MongoDb:
      return new MongoDb(conn.DB().connection);
    case DbEngine.MySql:
    case DbEngine.PostgreSql:
      return new Sql(conn.DB().connection);
    default:
      throw 400
  }
}

//SQL
class Sql {
  connection;
  constructor(connection) {
    this.connection = connection;
  }

  getAllPasienAsync = async () => {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * from ??", [collectionName], (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  }

  getPasienAsync = async (nik) => {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * from ?? where nik = ?", [collectionName, nik], (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements[0]);
      });
    });
  }

  updatePasien = async (nik, foto) => {
    return new Promise((resolve, reject) => {
      this.connection.query("UPDATE ?? SET foto = ? WHERE nik = ?", [collectionName, JSON.stringify(foto), nik], (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements[0]);
      });
    });
  }
}

class MongoDb {
  connection;
  constructor(connection) {
    this.connection = connection;
  }

  getAllPasienAsync = async () => {
    let result = await this.repo().find({}).limit(50).toArray();
    return result;
  }

  getPasienAsync = async (nik) => {
    let result = await this.repo().findOne({ "nik": nik });
    return result;
  }

  updatePasien = async (nik, foto) => {
    let data = {
      $set: {
        foto: foto,
      },
    };

    let query = { nik: nik };
    let result = await this.repo().updateOne(query, data);

    return result;
  }

  repo = () => {
    this.connection.connect();
    return this.connection.db(dbName).collection(collectionName);
  }
}