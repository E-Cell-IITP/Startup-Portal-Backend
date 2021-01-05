import Profile from "../../models/profile";

export default (req, res) => {
  const userId = req.user._id;
  Profile.findOne({ user: userId }, (err, profile) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error in finding profile. Please try again later" });
    }
    if (!profile) {
      Profile.create(
        {
          user: userId,
          username: req.user.username,
        },
        (err, obj) => {
          if (err) {
            return res.status(500).json({
              message: "Error creating profile. Please try again later",
            });
          }
          res.status(200).json(obj);
        }
      );
    } else {
      res.status(200).json(profile);
    }
  });
  return;
};
