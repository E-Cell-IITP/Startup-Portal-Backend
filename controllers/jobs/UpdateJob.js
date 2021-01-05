import Job from "../../models/profile";

export default (req, res) => {
  const {
    companyName,
    description,
    salaryPackage,
    skills,
    jobRole,
    jobType,
    status,
  } = req.body;
  Job.findByIdAndUpdate(
    req.params.jobId,
    {
      companyName: companyName,
      description: description,
      salaryPackage: salaryPackage,
      skills: skills,
      jobRole: jobRole,
      jobType: jobType,
      status: status,
    },
    (err, updatedjob) => {
      if (err || !updatedjob) {
        return res
          .status(500)
          .json({ message: "Can't update job. Please try again later" });
      }
      return res.status(200).json(updatedjob);
    }
  );
  return;
};
