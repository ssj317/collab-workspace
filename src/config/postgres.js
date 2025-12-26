const { Pool } = require("pg");
const { PG } = require("./env");

const pool = new Pool({
  host: PG.host,
  port: PG.port,
  user: PG.user,
  password: PG.password,
  database: PG.database,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

module.exports = pool;
