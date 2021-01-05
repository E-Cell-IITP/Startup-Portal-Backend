const Job = require("../../models/job");

export default (req, res) => {
  Job.find({}, (err, jobs) => {
    if (err) {
      return res.status(500).json({
        message: "Error in getting Jobs list",
      });
    }
    return res.status(200).json(jobs);
  });
  return;
};
