require('dotenv').config();
const { DbEngine } = require('../commons/dbEngine');
const { mongo } = require("../db/mongoConnection");
const { sql } = require("../db/sqlConnection");

exports.DB = () => {
    let engine = process.env.DB_ENGINE
    switch (engine) {
        case DbEngine.MongoDb:
            return {
                connection: mongo.getClient(),
                engine: engine
            }
        case DbEngine.MySql:
        case DbEngine.PostgreSql:
            return {
                connection: sql.getClient(),
                engine: engine
            }
        default:
            return null;
    }
}