const service = require("./jobs.service");
const { logEvent } = require("../../logs/logger");

exports.createJob = async (req, res) => {
  try {
    const job = await service.createJob(req.body);

    // Job created log
    await logEvent({
      source: "job",
      message: "Job created and queued",
      metadata: {
        jobId: job.id,
        type: job.type,
        status: job.status,
      },
      userId: req.user?.id,
    });

    res.status(202).json(job);
  } catch (err) {
    //  Job creation failed log
    await logEvent({
      level: "ERROR",
      source: "job",
      message: "Job creation failed",
      metadata: {
        error: err.message,
        payload: req.body,
      },
      userId: req.user?.id,
    });

    res.status(500).json({ message: "Failed to create job" });
  }
};

exports.getJobStatus = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await service.getJob(jobId);

    if (!job) {
      //  Job not found log
      await logEvent({
        level: "WARN",
        source: "job",
        message: "Job not found",
        metadata: { jobId },
        userId: req.user?.id,
      });

      return res.status(404).json({ message: "Job not found" });
    }

    //  Job status fetch log
    await logEvent({
      source: "job",
      message: "Job status fetched",
      metadata: {
        jobId,
        status: job.status,
      },
      userId: req.user?.id,
    });

    res.json(job);
  } catch (err) {
    // Job fetch failed log
    await logEvent({
      level: "ERROR",
      source: "job",
      message: "Failed to fetch job status",
      metadata: {
        jobId,
        error: err.message,
      },
      userId: req.user?.id,
    });

    res.status(500).json({ message: "Failed to fetch job status" });
  }
};
