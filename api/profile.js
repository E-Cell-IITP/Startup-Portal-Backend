import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurymartiny/now-middleware";
import cors from "cors";
import isLoggedIn from "../controllers/middlewares/isLoggedIn";
import getProfile from "../controllers/profile/GetProfile";
import getAllProfiles from "../controllers/profile/GetAllProfiles";
import updateProfile from "../controllers/profile/UpdateProfile";

const profile = async (req, res) => {
  if (req.method != "POST") {
    return res.status(404).json({
      message: `Unknown method ${req.method}.Only POST request allowed`,
    });
  }
  console.log("POST request to /api/profile ...");
  await connectToDatabase(process.env.MONGODB_URI);
  switch (req.body.method) {
    case "GET_MY_PROFILE":
      return getProfile(req, res);

    case "GET_ALL_PROFILES":
      return getAllProfiles(req, res);

    case "UPDATE_PROFILE":
      return updateProfile(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors(), isLoggedIn)(profile);
