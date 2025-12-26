const router = require("express").Router();
const controller = require("./auth.controller");
const rateLimiter = require("../../middlewares/rateLimiter");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  rateLimiter,
  controller.register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  rateLimiter,
  controller.login
);

module.exports = router;
