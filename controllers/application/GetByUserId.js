import Application from "../../models/application";
import Job from "../../models/job";

export default async (req, res) => {
  await Application.find({ User: req.user._id })
    .lean()
    .then(async (applications) => {
      // return res.status(200).json(applications);
      for (var i = 0; i < applications.length; i++) {
        await Job.findById(applications[i].Job).then((job) => {
          applications[i].Job = job;
        });
      }
      console.log(applications);
      return res.status(200).json(applications);
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({
          message: "Error finding application. Please try again later",
        });
      }
    });
  return;
};
