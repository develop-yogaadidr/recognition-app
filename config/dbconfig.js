require('dotenv').config();

exports.URI = process.env.DB_URL;
// exports.URI = `mongodb+srv://${DbConfig.User}:${DbConfig.Password}@${DbConfig.Server}/${DbConfig.Database}?retryWrites=true&w=majority`;