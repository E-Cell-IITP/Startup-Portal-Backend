const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  salaryPackage: {
    type: Number,
    default: "",
  },
  skills: {
    type: Array,
  },
  jobRole: {
    type: String,
    default: "",
  },
  jobType: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "active",
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
