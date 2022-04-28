//configure database
require("dotenv").config({ path: "../.env" });

const { Pool } = require("pg");

//boolean var checks if project is in production mode
const isProduction = process.env.NODE_ENV === "production";

//connect postgres database
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
  max: 20,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
});

module.exports = { pool, connectionString };
