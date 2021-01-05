import connectToDatabase from "../controllers/connecttoDb";
import { chain } from "@amaurymartiny/now-middleware";
import cors from "cors";
import morgan from "morgan";
import isLoggedIn from "../controllers/middlewares/isLoggedIn";

const jobs = async (req, res) => {
  await connectToDatabase(process.env.MONGODB_URI);
  switch (req.method) {
    case "POST":
      switch (req.body.method) {
        case "ALL":
          const getJobsList = (await import("../controllers/jobs/GetJobsList"))
            .default;
          return getJobsList(req, res);
        case "ID":
          const getJobById = (await import("../controllers/jobs/GetJobById"))
            .default;
          return getJobById(req, res);

        case "ADMIN":
          if (req.user.role !== 1) {
            return res.status(403).json({
              message: "Forbidden",
              user: req.user,
            });
          }
          const createJob = (await import("../controllers/jobs/CreateJob"))
            .default;
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
      const updateJob = (await import("../controllers/jobs/UpdateJob")).default;
      return updateJob(req, res);

    case "DELETE":
      if (req.user.role !== 1) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
      const deleteJob = (await import("../controllers/jobs/DeleteJob")).default;
      return deleteJob(req, res);

    default:
      return res.status(404).json({
        message: "Unknown Method",
      });
  }
};

module.exports = chain(cors(), isLoggedIn)(jobs);
