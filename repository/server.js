require('dotenv').config();
const { ObjectId } = require("mongodb");

const { DbEngine } = require('../commons/dbEngine');
const conn = require("../db/conn");

const collectionName = "server";
const dbName = process.env.DB_NAME;

exports.getAllServers = async () => {
  return query().getAllServers();
};

exports.updateServer = async (id, data) => {
  return query().updateServer(id, data);
}

exports.createServer = async (data) => {
  return query().createServer(data);
}

exports.deleteServer = async (id) => {
  return query().deleteServer(id);
}

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

class Sql {
  connection;
  constructor(connection) {
    this.connection = connection;
  }

  getAllServers = async () => {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * from ??", [collectionName], (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  }

  updateServer = async (id, data) => {
    return new Promise((resolve, reject) => {
      this.connection.query("UPDATE ?? SET ? WHERE id = ?", [collectionName, data, id], (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements[0]);
      });
    });
  }

  createServer = async (data) => {
    return new Promise((resolve, reject) => {
      this.connection.query("INSERT ?? SET ?", [collectionName, data], (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements[0]);
      });
    });
  }

  deleteServer = async (id) => {
    return new Promise((resolve, reject) => {
      this.connection.query("DELETE FROM ?? WHERE id = ?", [collectionName, id], (error, elements) => {
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

  getAllServers = async () => {
    return await this.repo().find({}).limit(50).toArray();
  };

  updateServer = async (id, data) => {
    let queryData = {
      $set: data,
    };
    let query = { _id: ObjectId(id) };
    return await this.repo().updateOne(query, queryData);
  }

  createServer = async (data) => {
    data._id = new ObjectId();
    return await this.repo().insertOne(data);
  }

  deleteServer = async (id) => {
    let query = { _id: ObjectId(id) };
    return await this.repo().deleteOne(query);
  }

  repo = () => {
    return client.db(dbName).collection(collectionName);
  }
}