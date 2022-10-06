const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "SamoHajduk1950st#",
    host: "localhost",
    port: 5432,
    database: "yacht_data"
})

module.exports = pool
