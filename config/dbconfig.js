require('dotenv').config();

const TunnelConfig = {
    UseTunnel: process.env.USE_TUNNEL,
    Username: process.env.DB_SSH_USER,
    Password: process.env.DB_SSH_PASSWORD,
    Port: process.env.DB_SSH_PORT,
    Host: process.env.DB_SSH_HOST
}

exports.Config = {
    Uri: process.env.DB_URL,
    Username: process.env.DB_USER,
    Password: process.env.DB_PASSWORD,
    Database: process.env.DB_NAME,
    Port: process.env.DB_PORT,
    Engine: process.env.DB_ENGINE,
    Tunnel: TunnelConfig
}