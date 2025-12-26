const { Queue } = require("bullmq");
const { v4: uuidv4 } = require("uuid");
const pool = require("../../config/postgres");
const redis = require("../../config/redis");

const jobQueue = new Queue("jobs", {
  connection: redis.options,
});

async function createJob({ type, payload }) {
  const jobId = uuidv4();

  await pool.query(
    `INSERT INTO jobs (id, type, status, payload)
     VALUES ($1, $2, 'PENDING', $3)`,
    [jobId, type, payload]
  );

  await jobQueue.add(
    "job",
    { jobId, type, payload },
    { attempts: 3, backoff: 5000 }
  );

  return { jobId, status: "PENDING" };
}

async function getJob(jobId) {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE id = $1`,
    [jobId]
  );
  return result.rows[0];
}

module.exports = { createJob, getJob };
