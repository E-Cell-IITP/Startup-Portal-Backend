import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurym/now-middleware";
import cors from "cors";
import isLoggedIn from "../controllers/middlewares/isLoggedIn";
import getJobsList from "../controllers/jobs/GetJobsList";
import getJobById from "../controllers/jobs/GetJobById";
import createJob from "../controllers/jobs/CreateJob";
import updateJob from "../controllers/jobs/UpdateJob";
import deleteJob from "../controllers/jobs/DeleteJob";

const jobs = async (req, res) => {
  await connectToDatabase(process.env.MONGODB_URI);
  switch (req.method) {
    case "POST":
      switch (req.body.method) {
        case "ALL":
          return await getJobsList(req, res);
        case "ID":
          return getJobById(req, res);

        case "ADMIN":
          if (req.user.role !== 1) {
            return res.status(403).json({
              message: "Forbidden",
              user: req.user,
            });
          }
          return createJob(req, res);

        default:
          return res.status(404).json({
            message: "Unknown Method",
          });
      }

    case "PUT":
      if (req.user.role !== 1) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
      return updateJob(req, res);

    case "DELETE":
      if (req.user.role !== 1) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
      return deleteJob(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors(), isLoggedIn)(jobs);
