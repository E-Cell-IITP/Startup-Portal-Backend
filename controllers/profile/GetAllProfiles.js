import Profile from "../../models/profile";

export default (req, res) => {
  Profile.find({}, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error in getting list of profiles. Please try again later",
      });
    }
    return res.status(200).json(result);
  });
  return;
};
