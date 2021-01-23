const Job = require("../../models/job");
const Application = require("../../models/application");

export default async (req, res) => {
  await Job.find({})
    .lean()
    .then(async (jobs) => {
      console.log("Length", jobs.length);

      for (var i = 0; i < jobs.length; i++) {
        console.log({ Job: jobs[i]._id, User: req.user._id });
        await Application.findOne({ Job: jobs[i]._id, User: req.user._id })
          .then((application) => {
            jobs[i].isApplied = application ? true : false;
          })
          .catch((err) => {
            jobs[i].isApplied = false;
          });
      }
      return res.status(200).json(jobs);
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({
          message: "Error in getting Jobs list",
        });
      }
    });
  return;
};
