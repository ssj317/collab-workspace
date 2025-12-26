const router = require("express").Router();
const controller = require("./projects.controller");
const auth = require("../../middlewares/auth.middleware");
const rbac = require("../../middlewares/rbac.middleware");

router.post("/", auth, controller.createProject);

router.get("/", auth, controller.listProjects);

router.post(
  "/:projectId/invite",
  auth,
  rbac(["OWNER"]),
  controller.inviteMember
);

module.exports = router;
