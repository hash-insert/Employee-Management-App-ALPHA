const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
      // required: true,
      unique: true,
    },
    employee_name: {
      type: String,
      required: true,
    },
    // last_name: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    hire_date: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    teams: {
      type: [],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("employee", employeeSchema);
