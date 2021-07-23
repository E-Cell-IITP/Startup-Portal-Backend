import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurym/now-middleware";
import cors from "cors";
import isLoggedIn from "../controllers/middlewares/isLoggedIn";
import applyById from "../controllers/application/ApplyWithId";
import getApplicationByJobId from "../controllers/application/GetByJobId";
import getApplictionsByUserId from "../controllers/application/GetByUserId";

const jobs = async (req, res) => {
  await connectToDatabase(process.env.MONGODB_URI);
  if (req.method !== "POST") {
    return res.status(404).json({
      message: `Unknown method ${req.method}. Only POST request supported`,
    });
  }
  switch (req.body.method) {
    case "APPLY_BY_ID":
      return applyById(req, res);

    case "GET_BY_JOB_ID":
      return getApplicationByJobId(req, res);

    case "GET_BY_USER_ID":
      return await getApplictionsByUserId(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors(), isLoggedIn)(jobs);
