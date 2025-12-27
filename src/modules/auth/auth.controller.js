const { registerUser, loginUser } = require("./auth.service");
const { validationResult } = require("express-validator");
const { logEvent } = require("../../logs/logger");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation error log
    await logEvent({
      level: "WARN",
      source: "auth",
      message: "User registration validation failed",
      metadata: errors.array(),
    });

    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const user = await registerUser(req.body);

    // Successful registration log
    await logEvent({
      source: "auth",
      message: "User registered successfully",
      userId: user.id,
      metadata: {
        email: user.email,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    // Registration failure log
    await logEvent({
      level: "ERROR",
      source: "auth",
      message: "User registration failed",
      metadata: {
        error: err.message,
        email: req.body.email,
      },
    });

    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation error log
    await logEvent({
      level: "WARN",
      source: "auth",
      message: "User login validation failed",
      metadata: errors.array(),
    });

    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const data = await loginUser(req.body);

    // Successful login log
    await logEvent({
      source: "auth",
      message: "User logged in successfully",
      userId: data.user.id,
      metadata: {
        email: data.user.email,
      },
    });

    res.json(data);
  } catch (err) {
    // Login failure log
    await logEvent({
      level: "WARN",
      source: "auth",
      message: "User login failed",
      metadata: {
        email: req.body.email,
        error: err.message,
      },
    });

    res.status(401).json({ message: err.message });
  }
};
