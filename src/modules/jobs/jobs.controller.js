const service = require("./jobs.service");

exports.createJob = async (req, res) => {
  const job = await service.createJob(req.body);
  res.status(202).json(job);
};

exports.getJobStatus = async (req, res) => {
  const job = await service.getJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(job);
};
