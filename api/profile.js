import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurymartiny/now-middleware";
import cors from "cors";
import morgan from "morgan";
import isLoggedIn from "../controllers/middlewares/isLoggedIn";

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
      const getProfile = (await import("../controllers/profile/GetProfile"))
        .default;
      return getProfile(req, res);

    case "GET_ALL_PROFILES":
      const getAllProfiles = (
        await import("../controllers/profile/GetAllProfiles")
      ).default;
      return getAllProfiles(req, res);

    case "UPDATE_PROFILE":
      const updateProfile = (
        await import("../controllers/profile/UpdateProfile")
      ).default;
      return updateProfile(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors(), isLoggedIn)(profile);
