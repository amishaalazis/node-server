const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error("FATAL ERROR: Database user or password not defined in .env file.");
    process.exit(1);
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


module.exports = pool;
