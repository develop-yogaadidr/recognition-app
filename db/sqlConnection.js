const mysql = require('mysql2')
const { Config } = require("../config/dbconfig.js");
const fs = require('fs');

exports.sql = {
    getClient: () => {
        return mysql.createConnection({
            host: Config.Uri,
            port: Config.Port,
            user: Config.Username,
            password: Config.Password,
            database: Config.Database,
            ssl: {
                ca: fs.readFileSync(__dirname + '/../certs/ca-certificate.crt'),
            }
        });
    }
};