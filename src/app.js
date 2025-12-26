const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./modules/auth/auth.routes");
const projectRoutes = require("./modules/projects/projects.routes");
const jobRoutes = require("./modules/jobs/jobs.routes");

const app = express();


app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);




console.log("Health routes loaded");

app.get("/test", (req, res) => {
  res.send("TEST OK");
});



app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;


