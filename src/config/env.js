require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  PG: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
  REDIS: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
   MONGO: {
    uri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB || "collab_logs",
  },
};
