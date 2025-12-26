const { Worker } = require("bullmq");
const pool = require("../config/postgres");
const redis = require("../config/redis");

new Worker(
  "jobs",
  async (job) => {
    const { jobId, type, payload } = job.data;

    await pool.query(
      `UPDATE jobs SET status = 'RUNNING', attempts = attempts + 1
       WHERE id = $1`,
      [jobId]
    );

    try {
      // 🔥 Simulate long task
      await new Promise((r) => setTimeout(r, 3000));

      const result = {
        output: `Processed ${type}`,
        payload,
      };

      await pool.query(
        `UPDATE jobs SET status = 'COMPLETED', result = $2
         WHERE id = $1`,
        [jobId, result]
      );

      return result;
    } catch (err) {
      await pool.query(
        `UPDATE jobs SET status = 'FAILED', error = $2
         WHERE id = $1`,
        [jobId, err.message]
      );
      throw err;
    }
  },
  { connection: redis.options }
);
