import Profile from "../../models/profile";

export default (req, res) => {
  Profile.findOne({ user: req.user._id }, (err, profile) => {
    if (err) {
      return res.status(500).json({
        message: "Please try again later.",
      });
    }
    const { about, firstName, lastName, contact, branch, number } = req.body;
    console.log("RequestBody: ", req.body);
    profile.about = about;
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.contact = contact;
    profile.branch = branch;
    profile.number = number;
    profile.save((err, obj) => {
      if (err) {
        return res.status(500).json({
          message: "Can't save",
        });
      }
      return res.status(200).json(obj);
    });
  });
  return;
};
