import Job from "../../models/job";

export default (req, res) => {
  const id = req.params.jobId;
  Job.findByIdAndRemove(id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Not Found" });
    }
    return res.json({
      message: "Job is deleted boom!",
    });
  });
};
