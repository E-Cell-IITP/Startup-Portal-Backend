import Job from "../../models/job";

export default (req, res) => {
  const jobId = req.body.jobId;
  Job.findById(jobId, (err, job) => {
    if (err) {
      return res.status(500).json({ message: "Error in getting Job" });
    }
    return res.status(200).json(job);
  });
};
