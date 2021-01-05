import Application from "../../models/application";

export default (req, res) => {
  const userId = req.user._id;
  const { jobId } = req.body;
  Application.findOne({ Job: jobId, User: userId }, (err, application) => {
    if (err) {
      return res
        .status(404)
        .json({ message: "Error in finding application. Please try again." });
    }
    if (application) {
      return res.status(400).json({ message: "Already Applied" });
    }
    if (!application) {
      Application.create(
        {
          User: userId,
          Job: jobId,
          Status: {
            Pending: 1,
            Shortlisted: 0,
            Rejected: 0,
          },
        },
        (err, obj) => {
          if (err) {
            return res.status(500).json({
              message: "Error creating application. Please try again later",
            });
          }
          return res.status(200).json(obj);
        }
      );
    }
  });
};
