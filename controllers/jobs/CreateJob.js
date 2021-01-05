const Job = require("../../models/job");

const getNotNullData = (req) => {
  let data = {};
  if (req.body.companyName) data.companyName = req.body.companyName;
  if (req.body.description) data.description = req.body.description;
  if (req.body.salaryPackage) data.salaryPackage = req.body.salaryPackage;
  if (req.body.skills) data.skills = req.body.skills;
  if (req.body.jobRole) data.jobRole = req.body.jobRole;
  if (req.body.jobType) data.jobType = req.body.jobType;
  if (req.body.status) data.status = req.body.status;
  return data;
};

export default (req, res) => {
  const data = getNotNullData(req);

  Job.create(data, (err, job) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error in creating new job",
      });
    }
    return res
      .status(200)
      .json({ message: "New Job Added successfully.", job: job });
  });
};
