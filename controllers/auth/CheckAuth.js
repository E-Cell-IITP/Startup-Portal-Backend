const jwt = require("jsonwebtoken");

export default (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Request" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Login Session Expired",
      });
    } else {
      return res.status(200).json({
        username: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
      });
    }
  });
  return;
};
