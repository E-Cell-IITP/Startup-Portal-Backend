const User = require("../../models/user");
const jwt = require("jsonwebtoken");

export default (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "User not logged in",
      });
    }
    User.findById(user._id, (err, user) => {
      user.accessToken = null;
      user.save();
    });
    return res.status(200).json({
      message: "Logged Out Successfully.",
      user: user,
    });
  });
  return;
};
