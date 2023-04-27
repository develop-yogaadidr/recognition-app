const mysql = require('mysql2')
const { Config } = require("../config/dbconfig.js");
const fs = require('fs');
require('dotenv').config();

exports.sql = {
    getClient: () => {
        let connection = {
            host: Config.Uri,
            port: Config.Port,
            user: Config.Username,
            password: Config.Password,
            database: Config.Database,
            connectionLimit: 10
        }

        let needSsl = process.env.DB_SSLMODE == "REQUIRED";
        if(needSsl){
            connection.ssl = {
                ca: fs.readFileSync(__dirname + '/../certs/ca-certificate.crt'),
            }
        }

        return mysql.createPool(connection);
    }
};