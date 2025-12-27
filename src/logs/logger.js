const Log = require("./log.model");

async function logEvent({ level = "INFO", source, message, metadata, userId }) {
  try {
    await Log.create({
      level,
      source,
      message,
      metadata,
      userId,
    });
  } catch (err) {
    console.error("Failed to write log", err.message);
  }
}

module.exports = { logEvent };
