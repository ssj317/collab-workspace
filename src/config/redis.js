const Redis = require("ioredis");
const { REDIS } = require("./env");

const redis = new Redis({
  host: REDIS.host,
  port: REDIS.port,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

module.exports = redis;
