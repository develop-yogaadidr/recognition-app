const dbconfig = require("../config/dbconfig.json");

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${dbconfig.db.user}:${dbconfig.db.password}@cluster0.5hrpm.mongodb.net/${dbconfig.db.database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.client = client;