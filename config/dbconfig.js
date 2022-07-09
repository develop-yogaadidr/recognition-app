require('dotenv').config();

const DbConfig = {
    Database: process.env.DB_NAME,
    User: process.env.DB_USER,
    Password: process.env.DB_PASSWORD,
    Server: process.env.DB_SERVER
}

exports.URI = `mongodb+srv://${DbConfig.User}:${DbConfig.Password}@${DbConfig.Server}/${DbConfig.Database}?retryWrites=true&w=majority`;