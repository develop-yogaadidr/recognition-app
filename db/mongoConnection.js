const {Config} = require("../config/dbconfig.js");

const { MongoClient } = require("mongodb");
const uri = Config.Uri;

exports.mongo = {
  getClient: () => {
    return new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};