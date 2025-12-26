const router = require("express").Router();
const controller = require("./jobs.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/", auth, controller.createJob);
router.get("/:jobId", auth, controller.getJobStatus);

module.exports = router;
