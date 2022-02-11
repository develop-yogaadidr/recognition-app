const dbconfig = require("../config/dbconfig.json");

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${dbconfig.db.user}:${dbconfig.db.password}@cluster0.5hrpm.mongodb.net/${dbconfig.db.database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect((err, data) => {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = data.db(dbconfig.db.database);
      return callback();
    });
    // client.connect(function (err, db) {
    //     console.log(err)
    //   if (err || !db) {
    //     return callback(err);
    //   }

    //   dbConnection = db.db(dbconfig.db.database);
    //   console.log("Successfully connected to MongoDB.");

    //   return callback();
    // });
  },

  getDb: function () {
    return dbConnection;
  },
};
