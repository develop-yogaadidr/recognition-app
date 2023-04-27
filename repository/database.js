require('dotenv').config();
const { InitialUserData } = require("../db/seedData");
const { client } = require("../db/conn");
const dbName = process.env.DB_NAME;

exports.Initialize = async () => {
    await client.connect()
    let db = client.db(dbName)

    let collections = await db.collections();
    let isAlreadyExists = collections.filter(c => c.collectionName == "pasien").length > 0;

    if (!isAlreadyExists) {
        db.createCollection("pasien", function (err, res) {
            if (err) throw err;
            console.log("pasien created!");
        });

        db.createCollection("server", function (err, res) {
            if (err) throw err;
            console.log("server created!");
        });

        let dbo = db.collection("pasien");
        let documents = InitialUserData

        dbo.createIndex()
        await dbo.insertMany(documents)
    }

    return true;
};
