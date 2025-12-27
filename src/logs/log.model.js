const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ["INFO", "WARN", "ERROR"],
      default: "INFO",
    },
    source: {
      type: String, // api | auth | project | job | socket
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
