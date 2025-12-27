const { logEvent } = require("../logs/logger");

module.exports = async (req, res, next) => {
  res.on("finish", () => {
    logEvent({
      source: "api",
      message: `${req.method} ${req.originalUrl}`,
      metadata: {
        statusCode: res.statusCode,
      },
      userId: req.user?.id,
    });
  });
  next();
};
