const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("✅ HEALTH ROUTE HIT");
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
