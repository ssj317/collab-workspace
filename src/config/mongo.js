const mongoose = require("mongoose");
const { MONGO } = require("./env");

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO.uri, {
      dbName: MONGO.dbName,
    });

    console.log("MongoDB connected (logs)");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectMongo;
