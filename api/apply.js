import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurymartiny/now-middleware";
import cors from "cors";
import morgan from "morgan";
import isLoggedIn from "../controllers/middlewares/isLoggedIn";

const jobs = async (req, res) => {
  await connectToDatabase(process.env.MONGODB_URI);
  if (req.method !== "POST") {
    return res.status(404).json({
      message: `Unknown method ${req.method}. Only POST request supported`,
    });
  }
  switch (req.body.method) {
    case "APPLY_BY_ID":
      const applyById = (await import("../controllers/application/ApplyWithId"))
        .default;
      return applyById(req, res);

    case "GET_BY_JOB_ID":
      const getApplicationByJobId = (
        await import("../controllers/application/GetByJobId")
      ).default;
      return getApplicationByJobId(req, res);

    case "GET_BY_USER_ID":
      if (req.user.role !== 1) {
        return res.status(403).json({
          message: "Forbidden",
          user: req.user,
        });
      }
      const getApplictionsByUserId = (
        await import("../controllers/application/GetByUserId")
      ).default;
      return getApplictionsByUserId(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors(), isLoggedIn)(jobs);
