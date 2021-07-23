import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurym/now-middleware";
import cors from "cors";
import signOut from "../controllers/auth/SignOut";
import signIn from "../controllers/auth/SignIn";
import signUp from "../controllers/auth/SignUp";
import checkAuth from "../controllers/auth/CheckAuth";
import verify from "../controllers/auth/Verify";

const auth = async (req, res) => {
  if (req.method === "GET") {
    return signOut(req, res);
  }
  if (req.method != "POST") {
    return res.status(404).json({
      message: `Unknown method ${req.method}.Only POST request allowed`,
    });
  }
  console.log("POST request to /api/auth ...");
  await connectToDatabase(process.env.MONGODB_URI);
  switch (req.body.method) {
    case "SIGNIN":
      return await signIn(req, res);

    case "SIGNUP":
      return await signUp(req, res);

    case "CHECKAUTH":
      return checkAuth(req, res);

    case "VERIFY":
      return verify(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors())(auth);
