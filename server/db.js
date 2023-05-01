const Pool = require('pg').Pool
require('dotenv').config()

const devConfig = {
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
}

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
}

const pool = new Pool(
    process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

module.exports = pool
