const dbconfig = require("../config/dbconfig.js");

const { MongoClient } = require("mongodb");
const uri = dbconfig.URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.client = client;