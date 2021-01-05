import Application from "../../models/application";

export default (req, res) => {
  const userId = req.user._id;
  Application.find({ User: userId }, (err, application) => {
    if (err) {
      return res.status(500).json({
        message: "Error finding application. Please try again later",
      });
    }
    return res.status(200).json(application);
  });
};
